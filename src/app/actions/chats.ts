//CRUD chats action

"use server";

import { connectDB } from "@/app/_lib/db";
import User from "@/app/_lib/models/User";

export async function createChat(email, firstMessage) {
  if (!email) return;
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const newChat = {
    title: "New Chat",
    messages: [
      { role: "user", content: firstMessage, loading: false },
      { role: "bot", content: "", loading: true },
    ],
  };

  user.chats.unshift(newChat);
  await user.save();

  // return the newly created chat (last one)
  return JSON.parse(JSON.stringify(user.chats[0]));
}

export async function getChats(email) {
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  return JSON.parse(JSON.stringify(user.chats));
}

export async function addMessage(email, chatId, message) {
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const chat = user.chats.find((c) => c._id.toString() === chatId);
  if (!chat) throw new Error("Chat not found");

  chat.messages.push({ role: "user", content: message, loading: false });
  chat.messages.push({ role: "bot", content: "", loading: true });

  await user.save();

  return JSON.parse(JSON.stringify(chat));
}

export async function updateBotResponse(
  email,
  chatId,
  // messageIndex,
  geminiResponse
) {
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const chat = user.chats.find((c) => c._id.toString() === chatId);
  if (!chat) throw new Error("Chat not found");
  const messageIndex = chat.messages.length - 1;
  // Update the last (bot) message
  chat.messages[messageIndex] = {
    ...chat.messages[messageIndex]._doc,
    content: "",
    structured: geminiResponse,
    loading: false,
  };

  // Update chat title only if it’s the first bot response
  if (chat.title === "New Chat" && geminiResponse?.chatTitle) {
    chat.title = geminiResponse.chatTitle;
  }

  await user.save();
  // return chat;
}

export async function deleteChat(email, chatId) {
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  user.chats = user.chats.filter(
    (chat) => chat._id.toString() !== chatId.toString()
  );

  await user.save();

  return JSON.parse(JSON.stringify(user.chats));
}
