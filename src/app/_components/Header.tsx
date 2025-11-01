import Link from "next/link";
import { IoSearch } from "react-icons/io5";

export const Header = () => {
  return (
    <header className="rounded-lg w-[98%] md:w-[95%] text-white flex justify-between items-center bg-[rgba(0,0,0,0.3)] border border-gray-600 p-4 fixed top-4 left-1/2 -translate-x-1/2 z-10 backdrop-blur-sm">
      <Link href={"/"}>
        <h2 className="font-lucky text-xl md:text-3xl">AniSensei</h2>
      </Link>
      <Link
        href={"/search"}
        className="text-lg border border-gray-600 p-2 rounded-full shadow-search shadow-blue-400/40 bg-gray-900 transition ease-in duration-400 hover:bg-[rgba(255,255,255,0.2)] hover:border-gray-500"
      >
        <IoSearch />
      </Link>
    </header>
  );
};
