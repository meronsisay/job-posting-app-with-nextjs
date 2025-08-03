// components/Header.tsx
"use client";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center px-12 pt-4">
      <h1 className="text-lg font-bold text-gray-600">
        {session ? `Welcome, ${session?.user?.name}` : "Welcome"}
      </h1>
      {session ? (
        <button
          onClick={() => signOut()}
          className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 font-bold text-gray-700"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 font-bold text-gray-700"
        >
          Log In
        </button>
      )}
    </div>
  );
};

export default Header;
