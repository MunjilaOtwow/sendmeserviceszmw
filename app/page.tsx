"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import AddItemForm, { type Item } from "@/components/AddItemForm"
import ItemList from "@/components/ItemList"
import DeliveryOptions from "@/components/DeliveryOptions"
import SubmitOrder from "@/components/SubmitOrder"
import UserInfoForm from "@/components/UserInfoForm"
import DarkModeToggle from "@/components/DarkModeToggle"
import Header from "@/components/Header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface UserInfo {
  phoneNumber: string
  name?: string
  email?: string
  isExistingCustomer: boolean
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null)
  const [orderTime, setOrderTime] = useState<string>("")
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup")
  const [purchaseLocation, setPurchaseLocation] = useState<string>("")
  const [municipality, setMunicipality] = useState<string>("")
  const [isExpressDelivery, setIsExpressDelivery] = useState<boolean>(false)
  const [showAddItem, setShowAddItem] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  // Remove the ref for deliveryOptions since we're not using it anymore
  // Change from:
  // const deliveryOptionsRef = useRef<any>(null)

  // To:
  // (remove this line completely)

  const addItem = (newItem: Item) => {
    if (items.length < 20) {
      setItems([...items, { ...newItem, id: Date.now() }])
    } else {
      alert("You have reached the maximum limit of 20 items.")
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const editItem = (id: number, updatedItem: Item) => {
    setItems(items.map((item) => (item.id === id ? { ...updatedItem, id } : item)))
  }

  const handleDeliveryOptionsComplete = () => {
    if (deliveryDate && orderTime && purchaseLocation && (deliveryMethod === "pickup" || municipality)) {
      setValidationError(null)
      setShowAddItem(true)
    }
  }

  // Update the validateDeliveryOptions function to directly check the state values
  // Replace the validateDeliveryOptions function with:

  const validateDeliveryOptions = () => {
    if (!deliveryDate) {
      setValidationError("Please select a delivery date for your order.")
      return false
    }
    if (!orderTime) {
      setValidationError("Please select a time for your order.")
      return false
    }
    if (!purchaseLocation) {
      setValidationError("Please select a purchase location.")
      return false
    }
    if (deliveryMethod === "delivery" && !municipality) {
      setValidationError("Please select an area for delivery.")
      return false
    }

    setValidationError(null)
    return true
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-md">
        <div className="flex justify-end mb-4">
          <DarkModeToggle />
        </div>
        {!userInfo ? (
          <UserInfoForm setUserInfo={setUserInfo} />
        ) : (
          <>
            {/* Remove the ref from the DeliveryOptions component */}
            {/* Change from: */}
            {/* <DeliveryOptions
              ref={deliveryOptionsRef}
              setDeliveryDate={setDeliveryDate}
              setOrderTime={setOrderTime}
              setPurchaseLocation={setPurchaseLocation}
              setIsExpressDelivery={setIsExpressDelivery}
              setDeliveryMethod={setDeliveryMethod}
              setMunicipality={setMunicipality}
              onComplete={handleDeliveryOptionsComplete}
            /> */}

            {/* To: */}
            <DeliveryOptions
              setDeliveryDate={setDeliveryDate}
              setOrderTime={setOrderTime}
              setPurchaseLocation={setPurchaseLocation}
              setIsExpressDelivery={setIsExpressDelivery}
              setDeliveryMethod={setDeliveryMethod}
              setMunicipality={setMunicipality}
              onComplete={handleDeliveryOptionsComplete}
            />

            {validationError && (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            {!showAddItem && (
              <div className="mt-4">
                <button
                  className="w-full bg-primary text-secondary hover:bg-primary/90 py-2 px-4 rounded"
                  onClick={() => {
                    if (validateDeliveryOptions()) {
                      setShowAddItem(true)
                    }
                  }}
                >
                  Continue to Add Items
                </button>
              </div>
            )}

            {showAddItem && (
              <>
                <Badge variant="secondary" className="mb-4">
                  {items.length}/20 items added
                </Badge>
                <AddItemForm addItem={addItem} />
                <ItemList items={items} removeItem={removeItem} editItem={editItem} />
                <SubmitOrder
                  items={items}
                  userInfo={userInfo}
                  deliveryDate={deliveryDate!}
                  orderTime={orderTime}
                  deliveryMethod={deliveryMethod}
                  purchaseLocation={purchaseLocation}
                  municipality={municipality}
                  isExpressDelivery={isExpressDelivery}
                />
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}

