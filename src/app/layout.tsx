import "./globals.css";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "ACM Starlight",
  description: "ACM's Official Program Application & Management Portal",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={lexend.className}>{children}</body>
    </html>
  );
}
