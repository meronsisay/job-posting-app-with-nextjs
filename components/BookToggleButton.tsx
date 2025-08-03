"use client";
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useGetBookmarksQuery,
} from "@/app/service/bookmarkApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoginPromptModal from "./LoginPrompt";

interface BookmarkToggleProps {
  jobId: string;
}

const BookmarkToggle: React.FC<BookmarkToggleProps> = ({ jobId }) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken || null;
  const router = useRouter();

  const {
    data: bookmarks,
    isLoading: isBookmarksLoading,
    refetch,
  } = useGetBookmarksQuery({ token }, { skip: !token });

  const [showModal, setShowModal] = useState(false);
  const [addBookmark, { isLoading: isAdding }] = useAddBookmarkMutation();
  const [removeBookmark, { isLoading: isRemoving }] =
    useRemoveBookmarkMutation();

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (bookmarks) {
      const found = bookmarks.find((b: any) => b.eventID === jobId);
      setBookmarked(!!found);
    }
  }, [bookmarks, jobId]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
     setShowModal(true);
      return;
    }

    try {
      if (bookmarked) {
        await removeBookmark({ eventID: jobId, token }).unwrap();
        toast.success("Bookmark removed");
      } else {
        await addBookmark({ eventID: jobId, token }).unwrap();
        toast.success("Bookmark added");
      }

      setBookmarked(!bookmarked);
      refetch(); 
    } catch (err) {
      console.error("Bookmark error", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  const isLoading = isAdding || isRemoving || isBookmarksLoading;

  return (
    <div className="mt-2">
      <button
        data-testid={`bookmark-button-${jobId}`}
        onClick={handleToggle}
        disabled={isLoading}
        className="text-xl hover:text-blue-500 disabled:opacity-50"
        title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
      >
        {isLoading ? (
          <FaSpinner className="animate-spin" data-testid="spinner" />
        ) : bookmarked ? (
          <BsBookmarkCheckFill size={16} data-testid="bookmark-icon-filled" />
        ) : (
          <BsBookmark size={16} data-testid="bookmark-icon-outline" />
        )}
      </button>
      {showModal && (
        <LoginPromptModal
          data-testid="login-prompt"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default BookmarkToggle;
