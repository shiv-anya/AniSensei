"use client";
import Link from "next/link";

export default function ErrorPage({ error }) {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-black text-white">
      {/* Masked Text */}
      <h1
        className="text-[14vw] font-extrabold uppercase text-center leading-none 
                   bg-[url('/assets/destruction.webp')] bg-cover bg-center 
                   text-transparent bg-clip-text select-none"
      >
        DESTRUCTION
      </h1>

      {/* Error Message */}
      <div className="mt-6 text-center">
        <p className="text-2xl font-semibold tracking-widest capitalize">
          {error.statusCode && error.statusCode + " |"} {error.message}
        </p>
        <p className="opacity-70 mt-2">
          The page was destroyed in an epic battle ⚔️
        </p>
        <Link
          href="/"
          className="inline-block mt-6 h-12 w-48 rounded-lg flex items-center justify-center bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-500 text-white p-[2px] transition duration-700 hover:bg-gradient-to-l hover:shadow-purple-600/30 animate-rotate"
        >
          <div class="flex h-full w-full items-center justify-center rounded-lg bg-black">
            Return Home
          </div>
        </Link>
      </div>
    </section>
  );
}
