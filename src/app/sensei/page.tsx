"use client";
import { useAuth } from "@/app/_context/AuthContext";
import { useChats } from "@/app/_context/ChatContext";
import { createChat } from "@/app/actions/chats";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const placeholders = [
  "Search Naruto...",
  "Find your next Shonen adventure...",
  "Discover hidden gems from 90s anime...",
  "Type your favorite studio — like MAPPA or Ufotable...",
  "Let Sensei recommend your next obsession...",
];

export default function SenseiSearch() {
  const { user } = useAuth();
  const inputRef = useRef();
  const router = useRouter();
  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const { setChats } = useChats();

  const createChatHandler = async () => {
    const userMessage = inputRef.current.value;
    if (user) {
      const res = await createChat(user?.email, userMessage);
      setChats(res);
      router.push(`/sensei/${res._id}`);
    } else {
      const newChat = {
        _id: crypto.randomUUID(),
        title: "New Chat",
        messages: [
          {
            _id: crypto.randomUUID(),
            role: "user",
            content: userMessage,
            loading: false,
            structured: "",
          },
          { _id: crypto.randomUUID(), role: "bot", content: "", loading: true },
        ],
      };
      localStorage.setItem("temporary-chat", JSON.stringify(newChat));
      router.push("/sensei/temporary-chat");
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (index === placeholders.length) setIndex(0);

    if (subIndex === placeholders[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000); // wait before deleting
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % placeholders.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      },
      deleting ? 50 : 100
    );

    setPlaceholder(placeholders[index].substring(0, subIndex));

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <div className="w-full max-lg:h-screen flex justify-center items-center">
      <div className="w-[80%] mx-auto max-w-4xl">
        <div className="bg-white/10 rounded-full px-4 lg:px-8 pr-2 lg:pr-4 w-full shadow-animecard flex justify-between items-center border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <input
            type="text"
            placeholder={placeholder}
            className="w-[95%] py-4 text-base text-white placeholder:text-gray-300 outline-none"
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.code === "Enter") createChatHandler();
            }}
          />
          <button
            className="text-lg border border-gray-600 p-2 rounded-full shadow-search shadow-blue-400/40 bg-gray-900 transition ease-in duration-400 cursor-pointer hover:bg-[rgba(255,255,255,0.3)] hover:border-gray-500"
            onClick={createChatHandler}
          >
            <IoSearch />
          </button>
        </div>
      </div>
    </div>
  );
}
