import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-screen">
      <div className="h-full w-full bg-black bg-[url('/assets/yourname-bg.jpg')] bg-contain bg-center bg-no-repeat relative">
        <div className="h-full w-full absolute top-0 left-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_5%,black_65%)] flex flex-col justify-center items-center">
          <div className="flex flex-col text-white font-bold text-2xl">
            <p>タ</p>
            <p>イ</p>
            <p>ム</p>
            <p>ラ</p>
            <p>イ</p>
            <p>ン</p>
            <p>の</p>
            <p>間</p>
            <p>違</p>
            <p>い</p>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <p className="text-2xl font-semibold tracking-widest">
              404 | Page Not Found
            </p>
            <p className="opacity-70 mt-2">
              The path you seek has vanished into the void 🌌
            </p>
            <Link
              href="/"
              className="inline-block mt-6 px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
