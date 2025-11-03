"use client";
import { useAuth } from "@/app/_context/AuthContext";
import { useChats } from "@/app/_context/ChatContext";
import { deleteChat, getChats } from "@/app/actions/chats";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GoSidebarExpand } from "react-icons/go";
import { LiaTimesCircleSolid } from "react-icons/lia";

const ListItems = ({ chat, params, user, setChats, setOpenMenu }) => {
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const [width] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  return (
    <Link
      href={`/sensei/${chat._id}`}
      key={chat._id}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      onClick={() => {
        if (width <= 768) setOpenMenu(false);
      }}
    >
      <li
        className={`hover:bg-white/10 rounded-lg px-4 py-2 transition duration-400 ${
          params.chatId === chat._id ? "bg-gray-600" : "bg-transparent"
        }`}
        title={chat.title}
      >
        <p className="flex justify-between lg:items-center max-lg:gap-2">
          {chat.title.split(" ").splice(0, 4).join(" ")}{" "}
          {
            <span
              className={`text-lg ${showDelete ? "block" : "lg:hidden"}`}
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const res = await deleteChat(user?.email, chat._id);
                setChats(res);
                router.push("/sensei");
              }}
            >
              <LiaTimesCircleSolid />
            </span>
          }
        </p>
      </li>
    </Link>
  );
};

export default function AsideMenu() {
  const asideRef = useRef(null);
  const router = useRouter();
  const [width] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [openMenu, setOpenMenu] = useState(false); //width >= 1024 ? true : false
  const params = useParams();
  const { user } = useAuth();
  const { chats, setChats } = useChats();

  useEffect(() => {
    // Only runs on client
    if (window.innerWidth >= 1024) {
      setOpenMenu(true);
    }
    const handleClickOutside = (event) => {
      if (asideRef.current && !asideRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const getChatMessages = async () => {
      const res = await getChats(user?.email);
      setChats(res);
    };
    if (user) getChatMessages();
  }, [user]);
  return (
    <>
      {openMenu ? (
        <aside
          ref={asideRef}
          className="max-lg:fixed h-screen w-full lg:w-[25%] xl:w-[20%] max-w-64 bg-gray-900/50 backdrop-blur-sm p-4 flex flex-col gap-5 overflow-y-auto
                scrollbar-none
                [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-500
  [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <div className="flex justify-between pt-5 text-2xl">
            <Link href={"/"} className="font-lucky">
              AniSensei
            </Link>
            <GoSidebarExpand
              className="cursor-pointer"
              title={openMenu ? "close menu" : "open menu"}
              onClick={() => setOpenMenu(false)}
            />
          </div>
          <div className="flex justify-center">
            <Link href={"/sensei"} className="w-full">
              <button className="font-semibold bg-[linear-gradient(159deg,rgba(137,207,240,1)_0%,rgba(65,105,225,1)_100%)] rounded-3xl w-full py-2 cursor-pointer">
                New Chat
              </button>
            </Link>
          </div>
          <div>
            <h2 className="text-sm text-gray-400 mb-3">Chats</h2>
            {user ? (
              chats?.length > 0 ? (
                <ul className="flex flex-col gap-1 text-sm">
                  {chats?.map((chat) => (
                    <ListItems
                      key={chat._id}
                      chat={chat}
                      params={params}
                      user={user}
                      setChats={setChats}
                      setOpenMenu={setOpenMenu}
                    />
                  ))}
                </ul>
              ) : (
                <p>No chats yet.</p>
              )
            ) : (
              <p>Login to track chat history.</p>
            )}
          </div>
        </aside>
      ) : (
        <aside className="max-lg:fixed h-18 lg:h-screen w-full lg:w-18 text-2xl flex justify-between lg:justify-center max-lg:items-center bg-gray-900/50 backdrop-blur-sm p-4 border-b lg:border-r border-gray-700 shadow-r-lg shadow-black">
          <GoSidebarExpand
            className="cursor-pointer"
            title={openMenu ? "close menu" : "open menu"}
            onClick={() => setOpenMenu(true)}
          />
          <Link href={"/"} className="block lg:hidden">
            <Image
              src={"/favicon.png"}
              width={40}
              height={40}
              alt="logo"
              priority
            />
          </Link>
        </aside>
      )}
    </>
  );
}
