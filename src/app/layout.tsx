import type { Metadata } from "next";
import { Dancing_Script, Pacifico, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import ScrollToTop from "@/components/ui/scroll-to-top";
import Chatbot from "@/components/ui/chatbot";
import { Toaster } from "react-hot-toast";

// Custom fonts
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'] 
})

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400']
})

const montserrat = Montserrat({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Touristeat",
  description: "Cuisinez des recettes provenant des 4 coins du monde",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${dancingScript.className}
          ${pacifico.className}
          ${montserrat.className}
          antialiased
        `}
      >
        <Toaster position="top-center" />
        <header>
          <Navbar />
        </header>
          
        {children}

        {/* Scroll-to-top */}
        <ScrollToTop />

        {/* Chatbot */}
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}
