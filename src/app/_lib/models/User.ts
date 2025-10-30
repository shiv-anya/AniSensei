"use server";
import mongoose from "mongoose";

const AnimeSnapshotSchema = new mongoose.Schema(
  {
    id: { type: Number }, // AniList / internal ID
    coverImage: { type: String }, // extraLarge URL
    format: { type: String }, // TV, MOVIE, OVA etc.
    year: { type: Number }, // startDate.year
    title: { type: String }, // english OR romaji
  },
  { _id: false }
); // no extra _id for subdocs

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "bot"], required: true },
  content: String,
  structured: mongoose.Schema.Types.Mixed,
  loading: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema({
  title: { type: String, default: "New Chat" },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: function () {
        // Example: User-abc12 (last 5 chars of ObjectId)
        return "User-" + this._id.toString().slice(-5);
      },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    avatar: {
      type: String,
      default: "https://picsum.photos/200/300", // you can store path or cloud URL
    },

    favorites: [AnimeSnapshotSchema],

    watchlist: [
      {
        anime: AnimeSnapshotSchema,
        status: {
          type: String,
          enum: ["planned", "watching", "completed"],
          default: "planned",
        },
        addedAt: { type: Date, default: Date.now },
      },
    ],

    history: [
      {
        anime: AnimeSnapshotSchema,
        progress: { type: Number, default: 0 }, // % watched
        lastWatched: { type: Date, default: Date.now },
      },
    ],
    chats: {
      type: [ChatSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
