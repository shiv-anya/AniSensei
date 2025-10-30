import { HashLoader } from "react-spinners";

export default function Loading() {
  return (
    <section className="h-screen w-full flex justify-center items-center">
      <HashLoader size={24} color="#60A5FA" />
    </section>
  );
}
