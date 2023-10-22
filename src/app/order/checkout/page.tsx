import { FooterCheckout } from "@/components/order/FooterCheckout";
import { HeaderCheckout } from "@/components/order/HeaderCheckout";
import { ResumeOrder } from "@/components/order/ResumeOrder";

export default function Checkout() {
  return (
    <div className="mx-auto mt-24 flex min-h-[calc(100vh_-_120px)] w-full  max-w-6xl flex-col justify-between pb-10 print:mt-0 print:min-h-screen">
      <HeaderCheckout />
      <ResumeOrder />
      <FooterCheckout />
    </div>
  );
}
