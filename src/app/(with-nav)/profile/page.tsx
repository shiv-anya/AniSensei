"use client";
import { EditProfile } from "@/app/_components/EditProfile";
import { Favorites } from "@/app/_components/Favorites";
import { History } from "@/app/_components/History";
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
  const [width] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const list = [
    { name: "Edit Profile", icon: <FaRegUserCircle /> },
    { name: "WatchList", icon: <MdOutlineBookmarkBorder /> },
    { name: "Favorites", icon: <FaRegStar /> },
    { name: "History", icon: <TbHistory /> },
    { name: "Logout", icon: <IoMdLogOut /> },
  ];

  const navigationHandler = (name) => {
    if (width < 768 && currentNav === name && currentNav.length !== 0) {
      setCurrentNav("");
    } else setCurrentNav(name);
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
        <HashLoader size={24} color="#60A5FA" />
      </section>
    );
  if (!user) return null;
  console.log(currentNav);
  return (
    <section className="min-h-screen flex justify-center items-center py-32 w-[90%] lg:w-[80%] mx-auto max-w-5xl">
      <div className="h-[100%] w-full bg-gray-900/80 rounded-xl md:max-h-[600px] backdrop-blur-sm flex shadow-banner">
        <aside className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-full bg-black/50 rounded-xl">
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
              <li key={el.name} className="flex flex-col gap-4">
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => navigationHandler(el.name)}
                >
                  <div className="text-blue-500">
                    {el.name === currentNav && el.icon}
                  </div>
                  <p>{el.name}</p>
                </div>
                {currentNav === "Edit Profile" && el.name === currentNav && (
                  <div className="hidden max-md:block px-8 py-4 max-h-72 overflow-y-auto">
                    <EditProfile user={user} />
                  </div>
                )}
                {currentNav === "WatchList" && el.name === currentNav && (
                  <div className="hidden max-md:block px-8 py-4 max-h-72 overflow-y-auto">
                    <WatchList />
                  </div>
                )}
                {currentNav === "Favorites" && el.name === currentNav && (
                  <div className="hidden max-md:block px-8 py-4 max-h-72 overflow-y-auto">
                    <Favorites />
                  </div>
                )}
                {currentNav === "History" && el.name === currentNav && (
                  <div className="hidden max-md:block py-4 max-h-72 overflow-y-auto">
                    <History />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </aside>
        <div className="w-full p-16 hidden md:block">
          {currentNav === "Edit Profile" && <EditProfile user={user} />}
          {currentNav === "WatchList" && <WatchList />}
          {currentNav === "Favorites" && <Favorites />}
          {currentNav === "History" && <History />}
        </div>
      </div>
    </section>
  );
}
