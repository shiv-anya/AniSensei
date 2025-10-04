"use server";
import bcrypt from "bcryptjs";
import { connectDB } from "../_lib/db";
import User from "../_lib/models/User";

export const editUserProfile = async ({ email, name, password, avatar }) => {
  await connectDB();
  const user = await User.findOne({ email: email });
  if (!user) return;
  // Update fields dynamically
  if (name) user.name = name;
  if (avatar) user.avatar = avatar;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  // Save changes
  try {
    await user.save();
  } catch (e) {
    console.log(e);
  }
};
