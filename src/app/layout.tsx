import type { Metadata } from "next";
import { Audiowide, Inter } from "next/font/google";
import "./globals.css";


import { Toaster } from "@/components/ui/sonner";


const archivo = Audiowide({
  weight:["400"],
  subsets: ["latin"],

});




export const metadata: Metadata = {
  title: "open-contribuion",
  description: "to find opens-source projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
        <body
          className={
            archivo.className
          }
        >
          {children}
          <Toaster richColors duration={5000} />
        </body>
   
    </html>
  );
}
