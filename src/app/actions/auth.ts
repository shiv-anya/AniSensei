"use server";
import { cookies } from "next/headers";
import { connectDB } from "../_lib/db";
import User from "../_lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function getUserProfileFromToken() {
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).lean();
    return JSON.parse(JSON.stringify(user));
  } catch (e) {
    return null;
  }
}

export async function signUpAction({ email, password }) {
  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { success: false, error: "Email already registered" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    success: true,
    message: "Signup successful, logged in",
    user: { id: user._id, name: user.name, email: user.email },
  };
}

export const checkPasswordIsRight = async (passwordEntered, UserPassword) => {
  const isMatch = await bcrypt.compare(passwordEntered, UserPassword);
  return isMatch;
};

export const loginAction = async ({ email, password }) => {
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) return { error: "User doesn't exist." };

  const isMatch = checkPasswordIsRight(password, user.password);
  if (!isMatch) return { error: "Invalid password, try again." };

  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true, message: "Login successful" };
};

export const logoutAction = async () => {
  (await cookies()).set("token", "", { maxAge: 0, path: "/" });
  return { success: true, message: "Logged out" };
};

export async function getUserFromCookie() {
  const cookieStore = await cookies(); // sync, but function must be async
  const token = (await cookieStore.get("token")?.value) || null;
  return token;
}
