"use server";

import { connectDB } from "../_lib/db";
import User from "../_lib/models/User";

// ✅ Add to Favorites
export async function addToFavorites(userEmail, anime) {
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
  if (user.favorites) {
    const already = user.favorites.find((f) => f.id === snapshot.id);
    if (already) return { success: false, message: "Already in Favorites" };
  }
  user.favorites.push({ ...snapshot });
  await user.save();
  return {
    success: true,
    favorites: JSON.parse(JSON.stringify(user.favorites)),
  };
}

// ✅ Get Favorites
export async function getFavorites(userEmail) {
  await connectDB();
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new Error("Unauthorized");

  return JSON.parse(JSON.stringify(user.favorites));
}

// ✅ Remove from Favorites
export async function removeFromFavorites(userEmail, animeId) {
  await connectDB();
  const user = await User.findOne({ email: userEmail });

  if (!user) throw new Error("Unauthorized");

  user.favorites = user.favorites.filter(
    (w) => w.id.toString() !== animeId.toString()
  );

  await user.save();

  return {
    success: true,
    favorites: JSON.parse(JSON.stringify(user.favorites)),
  };
}
