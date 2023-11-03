import Image from "next/image";
import Logo from "../../public/logo/logo-pos.svg";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950">
      <div className="mb-6 flex items-center justify-center">
        <Image src={Logo} width={200} height={200} alt={""} />
      </div>
      <Image src="/LoadingBar.svg" width={70} height={70} alt={""} />
    </div>
  );
}
