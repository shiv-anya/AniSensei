"use client";
import { useAuth } from "@/app/_context/AuthContext";
import { addMessage, getChats } from "@/app/actions/chats";
import { generateGeminiResponse } from "@/app/actions/gemini";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BounceLoader } from "react-spinners";

const BotMessage = ({ loading, chatId, user, userMessage, content }) => {
  const [isLoading, setIsLoading] = useState(loading);
  const [response, setResponse] = useState(content);

  useEffect(() => {
    const generateAIResponse = async () => {
      const AIResponse = await generateGeminiResponse({
        chatId,
        userMessage,
        user,
      });
      setIsLoading(false);
      setResponse(AIResponse);
    };
    if (loading) generateAIResponse();
  }, []);
  return (
    <div className="flex justify-start">
      {isLoading ? (
        <BounceLoader size={16} color="#f3f3f3" />
      ) : (
        <div className="flex flex-col gap-6">
          <p>{response?.note}</p>
          <div className="flex flex-col gap-4">
            <p>{response["suggest note"]}</p>
            <ul className="flex flex-col gap-2">
              {response?.suggestions?.map((s) => (
                <li key={s.title}>
                  <span className="text-blue-400 cursor-pointer">
                    {s.title}
                  </span>
                  {": (" + s.reason + ")"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default function ChatsById() {
  const [input, setInput] = useState("");
  const params = useParams();
  const { user } = useAuth();
  const [chatMessages, setChatMessages] = useState([]);
  const endRef = useRef(null);
  const addUserMessageHandler = async () => {
    const res = await addMessage(user?.email, params.chatId, input);
    setInput("");
    setChatMessages(res.messages);
  };
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);
  useEffect(() => {
    const getChatMessages = async () => {
      if (!user) localStorage.clear();
      else {
        const res = await getChats(user?.email);
        const filterChatById = res?.find(
          (chat) => chat._id.toString() === params.chatId
        );
        setChatMessages(filterChatById?.messages);
      }
    };
    getChatMessages();
  }, [user]);
  return (
    <section className="pt-24 pb-4 lg:py-10 w-full h-screen">
      <div className="w-[90%] lg:w-[80%] mx-auto max-w-3xl h-full flex flex-col justify-between gap-0 lg:gap-8">
        <ul
          className="h-full text-white flex flex-col gap-6 lg:gap-12 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-transparent
  "
        >
          {chatMessages?.map((message, index) => (
            <li key={message._id}>
              {message.role === "user" && (
                <div className="flex justify-end">
                  <div className="bg-gray-900 px-4 py-2 rounded-full">
                    {message.content}
                  </div>
                </div>
              )}
              {message.role === "bot" && (
                <BotMessage
                  chatId={params.chatId}
                  userMessage={chatMessages[index - 1].content}
                  loading={message.loading}
                  user={user}
                  content={message.structured}
                />
              )}
            </li>
          ))}
          <div ref={endRef} />
        </ul>
        <div className="bg-white/10 rounded-full px-8 pr-4 w-full shadow-animecard flex justify-between items-center border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <input
            type="text"
            placeholder="Ask anything..."
            className="w-[95%] py-4 text-base text-white placeholder:text-gray-300 outline-none"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            className="text-lg border border-gray-600 p-2 rounded-full shadow-search shadow-blue-400/40 bg-gray-900 transition ease-in duration-400 cursor-pointer hover:bg-[rgba(255,255,255,0.3)] hover:border-gray-500"
            onClick={addUserMessageHandler}
          >
            <IoSearch />
          </button>
        </div>
      </div>
    </section>
  );
}
