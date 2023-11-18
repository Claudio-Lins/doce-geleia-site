import { SidebarAdmin } from "@/components/admin/SidebarAdmin";
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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cn(montserrat.variable, oldStandardTT.variable)} lang="pt">
      <body className={"antialiased"}>
        <AuthProvider>
          <ToastProvider />
        <div className="min-h-screen grid grid-cols-app">
         <SidebarAdmin />
        <main className=''>{children}</main>
          </div>
          </AuthProvider>
      </body>
    </html>
  );
}
