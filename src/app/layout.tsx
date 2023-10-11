import ToastProvider from "@/providers/toast-provider"
import "./globals.css"
import type { Metadata } from "next"
import { Montserrat, Old_Standard_TT } from "next/font/google"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/Footer"

const montserrat = Montserrat({ subsets: ["latin"] })
const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "Doce Geleia",
  description: "Geleias artesanais feitas com carinho",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`
      min-h-screen w-full antialiased
      ${montserrat.className}
      `}
      >
        <Navbar />
        <ToastProvider />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
