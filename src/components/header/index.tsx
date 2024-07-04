import Link from "next/link";
import { FiUser, FiLogOut } from "react-icons/fi";

export const Header = () => {
  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm header">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto navbar">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300 title">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        <div className="flex items-baseline gap-4">
          <Link href="/dashboard" className="btn-login group">
            <div className="p-1 border-2 border-transparent group-hover:border-gray-600 group-hover:rounded-lg transition duration-200 group-hover:scale-125">
              <FiUser size={26} className="text-gray-600" />
            </div>
          </Link>

          <Link href="/dashboard" className="btn-logOut group">
            <div className="p-1 border-2 border-transparent group-hover:border-gray-600 group-hover:rounded-lg transition duration-200 group-hover:scale-125">
              <FiLogOut size={26} className="text-gray-600" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
