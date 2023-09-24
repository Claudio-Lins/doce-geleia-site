import Image from "next/image"
import Logo from "../../public/logo/lg-site-neg.svg"

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-zinc-950 fixed inset-0">
      <div className="bg-transparent p-4 border-2 border-zinc-50 flex items-center justify-center mb-6">
        <Image src={Logo} width={400} height={400} alt={""} />
      </div>
      <Image src="/LoadingBar.svg" width={100} height={100} alt={""} />
    </div>
  )
}
