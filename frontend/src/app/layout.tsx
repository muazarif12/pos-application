import type { Metadata } from "next";
import "@/globals.css";
import { Inter } from "next/font/google";


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) 

{
  return (
    <html lang="en">
      <body className={""}>
        {children}
      </body>
    </html>
  );
}
