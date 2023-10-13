import { FooterCheckout } from "@/components/order/FooterCheckout";
import { HeaderCheckout } from "@/components/order/HeaderCheckout";
import { ResumeOrder } from "@/components/order/ResumeOrder";

export default function Checkout() {
  return (
    <div className="w-full max-w-6xl min-h-[calc(100vh_-_120px)] mx-auto mt-24 flex flex-col justify-between pb-10">
      <HeaderCheckout />
      <ResumeOrder />
      <FooterCheckout />
    </div>
  );
}
