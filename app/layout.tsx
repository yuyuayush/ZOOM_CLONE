import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
import '@stream-io/video-react-sdk/dist/css/styles.css';

export const metadata: Metadata = {
  title: "ZOOM",
  description: "Video calling App",
  icons:{
    icon:"/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout:{
          socialButtonsVariant:"iconButton",
          logoImageUrl:"/icons/yoom-logo.svg"
        },
        variables: {
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1C1F2E",
          colorInputBackground: "#252A41",
          colorInputText: "#fff",
        },

      }}
    >
    <html lang="en">
      <body className={`${inter.className} bg-dark-2 `}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
