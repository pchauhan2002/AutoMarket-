import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

const inter=Inter({subsets:["latin"]});
export const metadata = {
  title: "vehicle",
  description: " find your dream Car",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-blue-50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-600">
                <p> made for car lovers</p>
              </div>
            </footer>
        </body>
      </html>
    </ClerkProvider> 
  );
}
