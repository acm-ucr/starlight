import "./globals.css";
import { League_Spartan, Lexend } from "next/font/google";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "600"],
  variable: "--font-lexend",
  preload: true,
});
const league = League_Spartan({
  subsets: ["latin"],
  display: "swap",
  weight: "600",
  variable: "--font-league",
  preload: true,
});

export const metadata = {
  title: "ACM Starlight",
  description: "ACM@UCR's Official Program Application & Management Portal",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`${league.variable} ${lexend.variable}`}>
        {children}
      </body>
    </html>
  );
}
