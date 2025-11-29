import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "AtmosTrack",
  description: "Weather Monitoring Dashboard",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="atmos-body min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      </body>
    </html>
  );
}