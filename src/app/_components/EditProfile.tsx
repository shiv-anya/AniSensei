"use client";
import { useState } from "react";
import { checkPasswordIsRight, logoutAction } from "../actions/auth";
import { editUserProfile } from "../actions/editUser";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const MAX_AVATAR_SIZE_MB = 2;

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export const EditProfile = ({ user }) => {
  const [userName, setUserName] = useState(user.name);
  const [newPassword, setNewPassword] = useState("");
  const [isOldValid, setIsOldValid] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const avatarToStore = newAvatar || user.avatar; // fallback
  const router = useRouter();

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_AVATAR_SIZE_MB * 1024 * 1024) {
      alert(`Avatar too large. Max size is ${MAX_AVATAR_SIZE_MB} MB.`);
      e.target.value = "";
      return;
    }

    fileToBase64(file).then((base64) => setNewAvatar(base64));
  };

  const handleCheckOld = async (e) => {
    const valid = await checkPasswordIsRight(e.target.value, user.password);
    if (valid) {
      setIsOldValid(true);
      // setMsg("Old password correct. You can set a new one.");
    } else {
      setIsOldValid(false);
      // setMsg("Old password is incorrect.");
    }
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const res = await editUserProfile({
      email: user.email,
      name: userName,
      password: newPassword,
      avatar: avatarToStore,
    });
    logoutAction();
    router.push("/auth");
    setIsPending(false);
  };
  return (
    <div className="w-full flex flex-col">
      <div className="mb-8 w-full">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold">
          Edit Profile
        </h2>
        <div className="w-[30%] rounded-full bg-gradient-to-r from-blue-500 to-transparent h-2 mt-3"></div>
      </div>
      <form className="flex flex-col gap-5 text-sm">
        <input
          className="bg-black/50 py-3 px-5 outline-none rounded-lg w-full lg:w-3/4 focus:border-2 focus:border-blue-400 focus:border-offset-2"
          name="name"
          type="text"
          placeholder="Enter name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="bg-black/50 py-3 px-5 outline-none rounded-lg w-full lg:w-3/4 focus:border-2 focus:border-blue-400 focus:border-offset-2"
          type="password"
          // value={oldPassword}
          onChange={handleCheckOld}
          placeholder="Enter old password"
        />
        <input
          className="bg-black/50 py-3 px-5 outline-none rounded-lg w-full lg:w-3/4 focus:border-2 focus:border-blue-400 focus:border-offset-2 disabled:bg-gray-900 disabled:cursor-not-allowed
             disabled:text-gray-400"
          type="password"
          title="Enter correct old password to enable this field"
          placeholder="Enter new password"
          disabled={!isOldValid}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          className="bg-black/50  outline-none rounded-lg w-full lg:w-3/4 cursor-pointer file:bg-blue-400 file:text-white file:py-2 file:px-4 file:mr-4
    file:cursor-pointer"
          type="file"
          placeholder="Enter photo of choice"
          onChange={handleAvatarChange}
        />
        <button
          className="bg-blue-400 hover:bg-blue-500 transition duration-700 w-fit rounded-3xl px-5 py-2 mt-8 cursor-pointer"
          onClick={updateUserProfile}
        >
          {isPending ? <BeatLoader size={8} color="white" /> : "Update"}
        </button>
      </form>
    </div>
  );
};
