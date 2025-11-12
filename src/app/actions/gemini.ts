"use server";

import { updateBotResponse } from "@/app/actions/chats";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateGeminiResponse({ chatId, userMessage, user }) {
  // Parse structured JSON safely
  let structured;
  try {
    // structured = JSON.parse(text);
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `
        You are an anime recommendation assistant for AniSensei. And you answer user queries only related to anime.
        You know about anime listed in the AniList database (Japanese anime only).
        You give personalized recommendations based on user's history, favorites, and watchlist.
        Your only job is to return valid JSON.
        Do NOT include any markdown formatting (like \`\`\`json or \`\`\`).
        Do NOT include any commentary or explanations outside JSON.

        When the user asks something: (only when asked for suggestions else simply answer their query)
        - Recommend exactly 10 anime when number not provided, if provided go with that number and don't exceed more than 10, no matter what user enters.
        - For each anime, include a short 1-line reason why it matches the user's taste.
        - Always reply in pure JSON format (no markdown, no extra text).
        - The JSON must have this structure:

        {
        "chatTitle": "string (summarize what type of anime was requested)",
        "suggestions": [
            { "title": "string", "reason": "string" },
            ...
        ],
        "note": "something you say at start of conversation keep it interesting and relatable to userMessage and to their watch history, favorites and watchlist",
        "suggest note": "while suggesting anime what you would like to say"
        }

        If the user is NOT logged in (which is true or false in Logged In), add this note:
        "Log in to AniSensei to get smarter recommendations using your watchlist, history and favorites." (you can add this on note but keep changing words)

        Ensure your reply is valid JSON only, nothing else.
`;

    // Build user-specific context and question
    const userContext = `
User Info:
Logged In: ${user ? true : false}
Favorites: ${user?.favorites}
Watch History: ${user?.history}
Watchlist: ${user?.watchlist}
`;

    const finalPrompt = `
${systemPrompt}

${userContext}

User asked: ${userMessage}
`;

    // const userPrompt = `${systemPrompt}\nUser: ${input}`;

    const result = await model.generateContent(finalPrompt);
    const text = await result.response.text();
    structured = JSON.parse(text);
  } catch {
    structured = {
      suggestions: [],
      note: "Failed to get a response. Try again after sometime.",
    };
  }

  // Optionally, you can update DB directly here:
  if (user && chatId !== "temporary-chat") {
    await updateBotResponse(user?.email, chatId, structured);
  }

  return structured;
}
