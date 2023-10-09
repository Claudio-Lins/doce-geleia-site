import * as React from "react"

interface EmailContactProps {
  name: string
  email: string
  phone: string
  message: string
}

export function EmailContact({
  name,
  email,
  phone,
  message,
}: EmailContactProps) {
  return (
    <div>
      <h1>Name: {name}</h1>
      <h1>Email: {email}</h1>
      <h1>Phone: {phone}</h1>
      <h1>Message: {message}</h1>
    </div>
  )
}
