import { EmailOrderPrepering } from '@/components/email-template/EmailOrderPrepering'

export default function Email() {
  return (
    <div>
      <EmailOrderPrepering fullName="João" orderNumber="123456"  />
    </div>
  )
}
