"use client";
import { EditProfile } from "@/app/_components/EditProfile";
import { Favorites } from "@/app/_components/Favorites";
import { WatchList } from "@/app/_components/WatchList";
import { useAuth } from "@/app/_context/AuthContext";
import { logoutAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { TbHistory } from "react-icons/tb";
import { HashLoader } from "react-spinners";

export default function ProfilePage() {
  const [currentNav, setCurrentNav] = useState("Edit Profile");
  const { user, loading } = useAuth();
  const router = useRouter();
  const list = [
    { name: "Edit Profile", icon: <FaRegUserCircle /> },
    { name: "WatchList", icon: <MdOutlineBookmarkBorder /> },
    { name: "Favorites", icon: <FaRegStar /> },
    { name: "History", icon: <TbHistory /> },
    { name: "Logout", icon: <IoMdLogOut /> },
  ];

  const navigationHandler = (name) => {
    setCurrentNav(name);
    if (name === "Logout") {
      logoutAction();
      router.push("/auth");
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user, router]);

  if (loading)
    return (
      <section className="h-screen flex justify-center items-center">
        <HashLoader size={30} className="#60A5FA" />
      </section>
    );
  if (!user) return null;

  return (
    <section className="min-h-screen flex justify-center items-center py-32 w-[80%] mx-auto max-w-screen-xl">
      <div className="h-[550px] w-[80%] bg-gray-900/80 rounded-xl max-h-[600px] backdrop-blur-sm flex shadow-banner">
        <aside className="w-1/4 h-full bg-black/50 rounded-xl">
          <div className="w-full">
            <div
              className={`h-48 w-full rounded-t-xl bg-cover bg-no-repeat relative`}
              style={{ backgroundImage: `url(${user.avatar})` }}
            >
              <div className="bg-linear-to-b from-transparent via-black/20 to-black absolute top-0 left-0 w-full h-full"></div>
            </div>
            <div className="bg-black pt-2 px-4 pb-4 text-sm">
              <div>
                <p>{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          <ul className="rounded-b-xl flex flex-col gap-7 p-4 py-8">
            {list.map((el) => (
              <li
                key={el.name}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => navigationHandler(el.name)}
              >
                <div className="text-blue-500">
                  {el.name === currentNav && el.icon}
                </div>
                <p>{el.name}</p>
              </li>
            ))}
          </ul>
        </aside>
        <div className="w-3/4 p-16">
          {currentNav === "Edit Profile" && <EditProfile user={user} />}
          {currentNav === "WatchList" && <WatchList />}
          {currentNav === "Favorites" && <Favorites />}
        </div>
      </div>
    </section>
  );
}
