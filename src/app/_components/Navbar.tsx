"use client";

import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { MdExplore } from "react-icons/md";
import { LiaTheaterMasksSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";
import { useState } from "react";

const navLinks = [
  { name: "Home", icon: <IoHomeOutline />, href: "/" },
  { name: "Genres", icon: <TbCategory />, href: "/genres" },
  { name: "Browse", icon: <MdExplore />, href: "/browse" },
  { name: "Ask Sensei", icon: <LiaTheaterMasksSolid />, href: "/sensei" },
  { name: "Profile", icon: <FaRegUser />, href: "/profile" },
];

export const Navbar = () => {
  const [isHoverElement, setIsHoverElement] = useState("");
  return (
    <nav className="rounded-lg w-[95%] h-[14vh] left-[32px] text-white flex justify-between items-center bg-[rgba(0,0,0,0.8)] border border-gray-600 mt-4 fixed bottom-4 z-10 backdrop-blur-sm">
      <ul className="w-full list-none flex justify-between items-center">
        {navLinks.map((item) => (
          <li
            className="w-full h-full"
            key={item.name}
            onMouseEnter={() => setIsHoverElement(item.name)}
            onMouseLeave={() => setIsHoverElement("")}
          >
            <Link href={item.href} className="h-full">
              <div className="h-full flex flex-col items-center gap-1">
                <div
                  className={`${
                    item.name === "Profile" ? "text-sm" : "text-lg"
                  } 
                  p-2 rounded-xl
                  ${
                    isHoverElement === item.name &&
                    "transition duration-400 ease-in bg-[rgba(255,255,255,0.1)]"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="text-xs">{item.name}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
