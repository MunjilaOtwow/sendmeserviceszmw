"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import TermsAndConditions from "./TermsAndConditions"

interface Item {
  id: number
  name: string
  category: string
  description: string
  estimatedPrice: number
  purchasePreference: {
    exclusive: boolean
    flexible: boolean
    flexible_alternatives: string[]
    priceRange?: {
      min: number
      max: number
    }
    callIfExceeded?: {
      contactMethod: "call" | "text"
      contactNumber: string
    }
  }
  testCriteria?: string
  packaging?: string[]
}

interface UserInfo {
  phoneNumber: string
  name?: string
  email?: string
  isExistingCustomer: boolean
}

interface SubmitOrderProps {
  items: Item[]
  userInfo: UserInfo
  deliveryDate: Date
  orderTime: string
  deliveryMethod: "pickup" | "delivery"
  purchaseLocation: string
  municipality: string
  isExpressDelivery: boolean
}

export default function SubmitOrder({
  items,
  userInfo,
  deliveryDate,
  orderTime,
  deliveryMethod,
  purchaseLocation,
  municipality,
  isExpressDelivery,
}: SubmitOrderProps) {
  const [termsAccepted, setTermsAccepted] = useState(false)

  const generateOrderNumber = () => {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    return `SM${year}${month}${day}${random}`
  }

  const validateItems = (items: Item[]) => {
    return items.every((item) => item.category && item.description.trim() !== "")
  }

  const formatOrder = () => {
    const orderNumber = generateOrderNumber()
    let orderText = `SendMe Orders
Order #${orderNumber}
Date: ${new Date().toLocaleString()}

`

    orderText += `Customer Information:
`
    orderText += `Phone Number: ${userInfo.phoneNumber}
`
    if (!userInfo.isExistingCustomer) {
      orderText += `Name: ${userInfo.name}
`
      orderText += `Email: ${userInfo.email}
`
    }
    orderText += `
`

    items.forEach((item, index) => {
      orderText += `📦 Item ${index + 1}: ${item.name}

`
      orderText += `Category: ${item.category}
`
      orderText += `Description: ${item.description}
`
      orderText += `Estimated Price: K${item.estimatedPrice.toFixed(2)}
`
      orderText += `Purchase Preference:
`
      if (item.purchasePreference.exclusive)
        orderText += `- Exclusive
`
      if (item.purchasePreference.flexible) {
        orderText += `- Flexible
`
        if (item.purchasePreference.flexible_alternatives?.length > 0) {
          orderText += `  Alternatives: ${item.purchasePreference.flexible_alternatives.join(", ")}
`
        }
      }
      if (item.purchasePreference.priceRange) {
        orderText += `- Price Range: K${item.purchasePreference.priceRange.min} - K${item.purchasePreference.priceRange.max}
`
      }
      if (item.purchasePreference.callIfExceeded) {
        orderText += `- Call/Text if Exceeded: ${item.purchasePreference.callIfExceeded.contactMethod} at ${item.purchasePreference.callIfExceeded.contactNumber}
`
      }
      if (item.testCriteria) {
        orderText += `Test Criteria: ${item.testCriteria}
`
      }
      if (item.packaging && item.packaging.length > 0) {
        orderText += `Packaging: ${item.packaging.join(", ")}
`
      }
      orderText += `
`
    })

    orderText += `Order Date: ${deliveryDate.toDateString()}
`
    orderText += `Order Time: ${orderTime}
`
    orderText += `Purchase Location: ${purchaseLocation}
`
    orderText += `Delivery Method: ${deliveryMethod}
`
    if (deliveryMethod === "delivery") {
      orderText += `Delivery Municipality: ${municipality}
`
    }
    orderText += `Express Delivery: ${isExpressDelivery ? "Yes" : "No"}

`

    const shoppingCharge = 25
    const expressCharge = isExpressDelivery ? 50 : 0
    const callTextCharge = items.some((item) => item.purchasePreference.callIfExceeded) ? 2 : 0
    const packagingCharge = items.reduce((total, item) => total + (item.packaging?.length || 0) * 5, 0)
    const totalCharge = shoppingCharge + expressCharge + callTextCharge + packagingCharge

    orderText += `Shopping Charge: K${shoppingCharge.toFixed(2)}
`
    if (isExpressDelivery) {
      orderText += `Express Delivery Charge: K${expressCharge.toFixed(2)}
`
    }
    if (callTextCharge > 0) {
      orderText += `Call/Text Charge: K${callTextCharge.toFixed(2)}
`
    }
    if (packagingCharge > 0) {
      orderText += `Packaging Charge: K${packagingCharge.toFixed(2)}
`
    }
    orderText += `Total Charge: K${totalCharge.toFixed(2)}

`

    orderText += `✅ Final Confirmation: "Ready to place order!"
Reference: #${orderNumber}`

    return encodeURIComponent(orderText)
  }

  const submitOrder = () => {
    if (!termsAccepted) {
      alert("Please accept the Terms & Conditions before submitting your order.")
      return
    }

    if (items.length === 0) {
      alert("Please add at least one item to your order.")
      return
    }

    if (!validateItems(items)) {
      alert("Please ensure all items have a category and description.")
      return
    }

    if (!deliveryDate || !orderTime || !purchaseLocation || (deliveryMethod === "delivery" && !municipality)) {
      if (!deliveryDate) {
        alert("Please select a delivery date for your order.")
      } else if (!orderTime) {
        alert("Please select a time for your order.")
      } else if (!purchaseLocation) {
        alert("Please select a purchase location.")
      } else if (deliveryMethod === "delivery" && !municipality) {
        alert("Please select an area for delivery.")
      }
      return
    }

    const whatsappUrl = `https://wa.me/260979013006?text=${formatOrder()}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="space-y-4">
      <div className="mb-4 p-3 bg-muted rounded-lg">
        <p className="text-sm font-medium">📸 Need to show us what you're looking for?</p>
        <p className="text-sm text-muted-foreground">
          You can send pictures of your required items via WhatsApp after submitting your order.
        </p>
      </div>
      <TermsAndConditions accepted={termsAccepted} onAcceptChange={setTermsAccepted} />
      <Button
        onClick={submitOrder}
        className="w-full bg-primary text-secondary hover:bg-primary/90"
        disabled={items.length === 0 || !termsAccepted}
      >
        Submit Order via WhatsApp
      </Button>
    </div>
  )
}

