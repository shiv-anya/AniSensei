import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-screen">
      <div className="w-[80%] h-[100%] mx-auto flex flex-col gap-10 justify-center items-center">
        <div className="relative w-full h-[30%]">
          <Image
            src="/assets/nezuko-sad.png"
            alt="Sad Nezuko"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="text-3xl text-center">
          <p>Nezuko got lost… looks like this page doesn’t exist 🥲</p>
          <p>
            Don’t worry! Let’s take you back{" "}
            <Link href={"/"} className="underline text-blue-500">
              home
            </Link>{" "}
            🏠
          </p>
        </div>
      </div>
    </section>
  );
}
