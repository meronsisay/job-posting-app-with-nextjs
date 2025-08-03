import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookmarkToggle from "../components/BookToggleButton";
import { useSession } from "next-auth/react";

// Mock session
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
  }),
}));

// Mock bookmarkApi hooks
jest.mock("../app/service/bookmarkApi", () => ({
  useGetBookmarksQuery: jest.fn(),
  useAddBookmarkMutation: jest.fn(),
  useRemoveBookmarkMutation: jest.fn(),
}));

describe("BookmarkToggle", () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          email: "test@example.com",
          accessToken: "mock-token",
        },
      },
      status: "authenticated",
    });
  });

  it("shows bookmarked icon if job is already bookmarked", () => {
    const { useGetBookmarksQuery } = require("../app/service/bookmarkApi");
    useGetBookmarksQuery.mockReturnValue({
      data: [{ eventID: "job-123" }],
      isLoading: false,
      refetch: jest.fn(),
    });

    const {
      useAddBookmarkMutation,
      useRemoveBookmarkMutation,
    } = require("../app/service/bookmarkApi");
    useAddBookmarkMutation.mockReturnValue([jest.fn(), { isLoading: false }]);
    useRemoveBookmarkMutation.mockReturnValue([
      jest.fn().mockReturnValue({ unwrap: () => Promise.resolve() }),
      { isLoading: false },
    ]);

    render(<BookmarkToggle jobId="job-123" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls removeBookmark when toggled off", async () => {
    const {
      useGetBookmarksQuery,
      useAddBookmarkMutation,
      useRemoveBookmarkMutation,
    } = require("../app/service/bookmarkApi");

    useGetBookmarksQuery.mockReturnValue({
      data: [{ eventID: "job-123" }],
      isLoading: false,
      refetch: jest.fn(),
    });

    const mockRemove = jest
      .fn()
      .mockReturnValue({ unwrap: () => Promise.resolve() });
    useRemoveBookmarkMutation.mockReturnValue([
      mockRemove,
      { isLoading: false },
    ]);
    useAddBookmarkMutation.mockReturnValue([jest.fn(), { isLoading: false }]);

    render(<BookmarkToggle jobId="job-123" />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockRemove).toHaveBeenCalledWith({
      eventID: "job-123",
      token: "mock-token",
    });
  });

  it("shows and hides login modal when not authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<BookmarkToggle jobId="job-123" />);
    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText(/Login Required/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Cancel/i));
  });

  it("calls addBookmark when toggled on", async () => {
    const {
      useGetBookmarksQuery,
      useAddBookmarkMutation,
      useRemoveBookmarkMutation,
    } = require("../app/service/bookmarkApi");

    useGetBookmarksQuery.mockReturnValue({
      data: [], // No bookmarks yet
      isLoading: false,
      refetch: jest.fn(),
    });

    const mockAdd = jest
      .fn()
      .mockReturnValue({ unwrap: () => Promise.resolve() });

    useAddBookmarkMutation.mockReturnValue([mockAdd, { isLoading: false }]);
    useRemoveBookmarkMutation.mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);

    render(<BookmarkToggle jobId="job-123" />);
    fireEvent.click(screen.getByRole("button"));

    expect(mockAdd).toHaveBeenCalledWith({
      eventID: "job-123",
      token: "mock-token",
    });
  });

  it("shows error toast if bookmark API fails", async () => {
    const {
      useGetBookmarksQuery,
      useAddBookmarkMutation,
      useRemoveBookmarkMutation,
    } = require("../app/service/bookmarkApi");

    useGetBookmarksQuery.mockReturnValue({
      data: [],
      isLoading: false,
      refetch: jest.fn(),
    });

    const mockAdd = jest.fn().mockReturnValue({
      unwrap: () => Promise.reject(new Error("Network Error")),
    });

    useAddBookmarkMutation.mockReturnValue([mockAdd, { isLoading: false }]);
    useRemoveBookmarkMutation.mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);

    render(<BookmarkToggle jobId="job-123" />);
    fireEvent.click(screen.getByRole("button"));
  });

  it("displays spinner when loading", () => {
    const {
      useGetBookmarksQuery,
      useAddBookmarkMutation,
      useRemoveBookmarkMutation,
    } = require("../app/service/bookmarkApi");

    useGetBookmarksQuery.mockReturnValue({
      data: [],
      isLoading: false,
      refetch: jest.fn(),
    });

    useAddBookmarkMutation.mockReturnValue([
      jest.fn(),
      { isLoading: true }, 
    ]);
    useRemoveBookmarkMutation.mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);

    render(<BookmarkToggle jobId="job-123" />);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

});
