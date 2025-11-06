"use client";
import { IoIosMail } from "react-icons/io";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { loginAction, signUpAction } from "../actions/auth";
import { useState, useTransition } from "react";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/_context/AuthContext";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { setUser } = useAuth();

  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
      let res;
      if (!isLogin) res = await signUpAction(form);
      else {
        res = await loginAction(form);
        setUser(res.user);
      }
      if (res.error) setMessage(res.error);
      else {
        router.push("/profile");
      }
    });
  };
  return (
    <section className="max-md:px-8 h-screen w-full bg-black bg-contain bg-right-top bg-no-repeat bg-[url('/assets/superman.jpg')] flex flex-col items-center">
      {message && <p className="fixed right-5 top-5 text-3xl">{message}</p>}
      <div className="flex flex-col gap-8 justify-center items-center absolute left-0 top-0 h-screen w-full bg-black/30 p-8">
        <Link href={"/"} className="z-30">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold font-lucky">
            Anisensei
          </h2>
        </Link>
        <div className="bg-[#1b1b1b]/50 p-10 backdrop-blur-sm 2xl:w-1/4 h-[85%] max-h-[500px] rounded-xl flex flex-col justify-center gap-4 max-w-96">
          <div>
            <h2 className="text-gray-600 text-2xl font-semibold">
              <span
                className={`cursor-pointer ${
                  isLogin ? "text-white" : "text-gray-600"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>{" "}
              |{" "}
              <span
                className={`cursor-pointer ${
                  !isLogin ? "text-white" : "text-gray-600"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </span>
            </h2>
            <p className="text-sm">
              {isLogin
                ? "Login to access your account"
                : "Sign Up to create an account"}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="w-full bg-[#1b1b1b] flex justify-between pl-2 rounded my-5 ">
                <input
                  type="email"
                  name="email"
                  className="outline-none text-xs h-full py-3"
                  placeholder="email"
                  onChange={handleInputChange}
                />
                <button className="bg-blue-400 flex items-center justify-center text-xl px-2 rounded hover:bg-blue-500 transition duration-700">
                  <IoIosMail />
                </button>
              </div>
              <div className="w-full bg-[#1b1b1b] flex justify-between pl-2 rounded my-5">
                <input
                  type="password"
                  name="password"
                  className="outline-none text-xs py-3"
                  placeholder="password"
                  onChange={handleInputChange}
                />
                <button className="bg-blue-400 flex items-center justify-center text-xl px-2 rounded hover:bg-blue-500 transition duration-700">
                  <IoEyeOffSharp />
                  {/* <IoEyeSharp /> */}
                </button>
              </div>
              <div className="flex flex-col gap-2 items-center mt-8">
                <button className="bg-blue-400 px-8 py-2 rounded-3xl text-sm hover:bg-blue-500 transition duration-700 flex justify-center items-center cursor-pointer">
                  {isPending ? (
                    <BeatLoader size={8} color="white" />
                  ) : isLogin ? (
                    "Login"
                  ) : (
                    "Sign Up"
                  )}
                </button>
                {/* <p className="text-xs text-gray-600 font-semibold cursor-pointer">
                  Forgot Password?
                </p> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
