import { EmailOrderPrepering } from "@/components/email-template/EmailOrderPrepering";

export default function page() {
  return (
    <div>
      <EmailOrderPrepering
        fullName="teste"
        email=""
        orderNumber={"DC-004563 234"}
      />
    </div>
  );
}
