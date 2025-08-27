import { Header } from "../_components/Header";
import { Navbar } from "../_components/Navbar";

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
