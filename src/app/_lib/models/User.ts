"use server";
import mongoose from "mongoose";

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

    // References (one-to-many)
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Anime" }],

    watchlist: [
      {
        animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime" },
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
        animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime" },
        progress: { type: Number, default: 0 }, // percentage watched
        lastWatched: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
