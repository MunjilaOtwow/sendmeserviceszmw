"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface UserInfoFormProps {
  setUserInfo: (info: UserInfo) => void
}

interface UserInfo {
  phoneNumber: string
  name?: string
  email?: string
  isExistingCustomer: boolean
}

export default function UserInfoForm({ setUserInfo }: UserInfoFormProps) {
  const [isExistingCustomer, setIsExistingCustomer] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUserInfo({
      phoneNumber,
      name: isExistingCustomer ? undefined : name,
      email: isExistingCustomer ? undefined : email,
      isExistingCustomer,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RadioGroup defaultValue="new" onValueChange={(value) => setIsExistingCustomer(value === "existing")}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="new" id="new" />
          <Label htmlFor="new">New Customer</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="existing" id="existing" />
          <Label htmlFor="existing">Existing Customer</Label>
        </div>
      </RadioGroup>

      <Input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />

      {!isExistingCustomer && (
        <>
          <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </>
      )}

      <Button type="submit">Submit</Button>
    </form>
  )
}

