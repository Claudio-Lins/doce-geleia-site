import * as React from "react"

interface EmailContactProps {
  firstName: string
}

export function Contact({ firstName }: EmailContactProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
    </div>
  )
}
