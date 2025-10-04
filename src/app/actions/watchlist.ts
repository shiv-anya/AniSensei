"use server";

import { connectDB } from "../_lib/db";
import User from "../_lib/models/User";
import { getUserProfileFromToken } from "./auth";

// ✅ Add to Watchlist
export async function addToWatchlist(userEmail, anime) {
  await connectDB();
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("Unauthorized");

  const snapshot = {
    id: anime.id,
    coverImage: anime.coverImage.extraLarge,
    format: anime.format,
    year: anime.startDate.year,
    title: anime.title.english || anime.title.romaji,
  };
  if (user.watchlist) {
    const already = user.watchlist.find((w) => w.anime.id === snapshot.id);
    if (already) return { success: false, message: "Already in watchlist" };
    user.watchlist.push({ anime: snapshot, status: "planned" });
    await user.save();
  }
  return {
    success: true,
    watchlist: JSON.parse(JSON.stringify(user.watchlist)),
  };
}

// ✅ Get Watchlist
export async function getWatchlist(userEmail) {
  await connectDB();
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("Unauthorized");

  return JSON.parse(JSON.stringify(user.watchlist));
}

// ✅ Remove from Watchlist
export async function removeFromWatchlist(userEmail, animeId) {
  await connectDB();
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("Unauthorized");

  user.watchlist = user.watchlist.filter(
    (w) => w.anime.id.toString() !== animeId.toString()
  );
  await user.save();

  return {
    success: true,
    watchlist: JSON.parse(JSON.stringify(user.watchlist)),
  };
}
