import "./globals.css";
import { Inter } from "next/font/google";
import { ReactQueryClientProvider } from "@/utils/react-query";
import Session from "@/components/session";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ACM Starlight",
  description: "ACM's project application portal",
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Session>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </Session>
      </body>
    </html>
  );
}
