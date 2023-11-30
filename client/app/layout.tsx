import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import NextProgress from "./components/NextProgress";
import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Label Makers",
  description: "Label Makers Productions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextProgress />
        <AuthContextProvider>
          <Navbar />
          <ToastContainer />
          {children}
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
