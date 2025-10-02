import { Header } from "../_components/Header";
import { Navbar } from "../_components/Navbar";
import { AuthProvider } from "../_context/AuthContext";

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Navbar />
      <AuthProvider>
        <main>{children}</main>
      </AuthProvider>
    </>
  );
}
