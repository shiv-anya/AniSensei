"use client";
import { useAuth } from "@/app/_context/AuthContext";
import { getChats } from "@/app/actions/chats";
import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

  return (
    <ChatContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export function useChats() {
  return useContext(ChatContext);
}
