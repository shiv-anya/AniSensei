"use server";
import { connectDB } from "@/app/_lib/db";
import User from "@/app/_lib/models/User";
import { getUserProfileFromToken } from "@/app/actions/auth";

export async function addOrUpdateHistory(animeData, userEmail) {
  await connectDB();
  if (!animeData || !userEmail) return;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  const existingIndex = user.history.findIndex(
    (h) => h.anime.id.toString() === animeData.animeInfo.id.toString()
  );

  if (existingIndex !== -1) {
    // Update existing
    user.history[existingIndex].progress = animeData.progress;
    user.history[existingIndex].lastWatched = animeData.lastWatched;
  } else {
    // Add new
    user.history.push({
      anime: {
        id: animeData.animeInfo.id,
        coverImage: animeData.animeInfo.coverImage,
        format: animeData.animeInfo.format,
        year: animeData.animeInfo.year,
        title: animeData.animeInfo.title || animeData.animeInfo.title,
      },
      progress: animeData.progress,
    });
  }

  await user.save();
  return {
    success: true,
    history: JSON.parse(JSON.stringify(user.history)),
  };
}

export async function getHistoryByAnimeId(userEmail, animeId) {
  if (!animeId || !userEmail) return;
  await connectDB();
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return { success: false, message: "Unauthorized" };
  }
  const history = user.history.find(
    (h) => h.anime.id.toString() === animeId.toString()
  );
  const plainHistory = history ? JSON.parse(JSON.stringify(history)) : null;
  return { success: true, history: plainHistory };
}

export async function getHistory(userEmail) {
  await connectDB();
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  return {
    success: true,
    history: JSON.parse(JSON.stringify(user.history)),
  };
}

export async function removeFromHistory(userEmail, animeId) {
  await connectDB();
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  user.history = user.history.filter(
    (h) => h.anime.id.toString() !== animeId.toString()
  );
  await user.save();

  return {
    success: true,
    history: JSON.parse(JSON.stringify(user.history)),
  };
}
