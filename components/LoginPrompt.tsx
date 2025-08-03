"use client";
import Link from "next/link"; 

interface LoginPromptModalProps {
  onClose: () => void;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ onClose }) => {
  return (
    <div
      data-testid="login-prompt"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg max-w-md w-full text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Login Required</h2>
        <p className="text-gray-600 mb-6">
          You must be logged in to bookmark a job.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-50 transition"
          >
            Sign Up
          </Link>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginPromptModal;
