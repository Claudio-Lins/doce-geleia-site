import { CookieConsentPolicy } from "@/components/CookieConcernPolicy";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/ui/Navbar";

import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Montserrat, Old_Standard_TT } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-oldStandardTT",
});


export const metadata: Metadata = {
  title: "Doce Geleia",
  description: "Login",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cn(montserrat.variable, oldStandardTT.variable)} lang="pt">
      <body className={"min-h-screen w-full antialiased"}>
          <Navbar />
          <main className="pt-4">{children}</main>
          <Footer />
          <CookieConsentPolicy />
      </body>
    </html>
  );
}
