"use client";

import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { status, data } = useSession();

  const handleLogin = async () => {
    await signIn();
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm header">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto navbar">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300 title">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button className="group animate-spin">
            <div
              className="p-1 border-2 
              border-transparent 
              group-hover:border-gray-600 
              group-hover:rounded-lg 
              transition 
              duration-200 
              group-hover:scale-125"
            >
              <FiLoader size={26} color="var(--primary-color)" />
            </div>
          </button>
        )}

        {status === "unauthenticated" && (
          <button className="group btn-login" onClick={handleLogin}>
            <div
              className="p-1 border-2 
                border-transparent 
                group-hover:border-gray-600 
                group-hover:rounded-lg 
                transition 
                duration-200  group-hover:scale-125"
            >
              <FiLock size={26} color="var(--primary-color)" />
            </div>
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-baseline gap-4">
            <Link href="/dashboard" className="btn-login group">
              <div
                className="p-1 border-2 
                  border-transparent 
                  group-hover:border-gray-600 
                  group-hover:rounded-lg 
                  transition 
                  duration-200 
                  group-hover:scale-125"
              >
                <FiUser size={26} color="var(--primary-color)" />
              </div>
            </Link>

            <button onClick={handleLogout} className="btn-logOut group">
              <div
                className="p-1 border-2 
                  border-transparent 
                  group-hover:border-gray-600 
                  group-hover:rounded-lg 
                  transition 
                  duration-200 
                  group-hover:scale-125"
              >
                <FiLogOut size={26} color="var(--primary-color)" />
              </div>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
