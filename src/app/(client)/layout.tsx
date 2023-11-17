import { CookieConsentPolicy } from "@/components/CookieConcernPolicy";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/auth";
import ToastProvider from "@/providers/toast-provider";
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
  description: "Geleias artesanais feitas com carinho",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cn(montserrat.variable, oldStandardTT.variable)} lang="pt">
      <body className={"min-h-screen w-full antialiased"}>
        <AuthProvider>
          <Navbar />
          <ToastProvider />
          <main className="grow">{children}</main>
          <Footer />
          <CookieConsentPolicy />
        </AuthProvider>
      </body>
    </html>
  );
}
