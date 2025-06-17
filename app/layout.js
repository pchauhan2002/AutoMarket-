import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";

const inter=Inter({subsets:["latin"]});
export const metadata = {
  title: "vehicle",
  description: " find your dream Car",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} `}>
          <Header/>
          {children}
        </body>
      </html>
    </ClerkProvider> 
  );
}
