import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/_context/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://anisensei-z.vercel.app"),
  title: {
    default: "AniSensei | Watch Anime Smarter",
    template: "%s | AniSensei",
  },
  description: "Discover, track, and stream your favorite anime effortlessly.",
  other: {
    "google-site-verification": "8ub3QoKcD7_10ovxSHexbBSgJC-6ZnflrFw8VQuUMxU",
  },
  openGraph: {
    title: "AniSensei | Watch Anime Smarter",
    description:
      "Discover, track, and stream your favorite anime effortlessly.",
    url: "https://anisensei-z.vercel.app/",
    siteName: "AniSensei",
    images: [
      {
        url: "/assets/hero.png",
        width: 1200,
        height: 630,
        alt: "AniSensei preview banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins">
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
