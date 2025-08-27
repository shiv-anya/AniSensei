import { HashLoader } from "react-spinners";

export default function Loading() {
  return (
    <section className="h-screen w-full flex justify-center items-center text-blue-400">
      <HashLoader />
    </section>
  );
}
