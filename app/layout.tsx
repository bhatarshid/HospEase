import type { Metadata } from "next";
import { Inter } from "@next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "HospEase",
  description: "A health care managemet system",
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
          className={`${inter.className} antialiased bg-gradient-to-b from-dashboard-light to-dashboard-dark`}
          >
          <ReduxProvider>
            <AuthProvider>
              {children}
              <ToastContainer />
            </AuthProvider>
          </ReduxProvider>
        </body>
    </html>
  );
}
