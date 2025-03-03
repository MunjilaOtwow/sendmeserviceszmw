"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export interface Item {
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

interface AddItemFormProps {
  addItem: (item: Item) => void
  editingItem?: Item | null
}

export default function AddItemForm({ addItem, editingItem }: AddItemFormProps) {
  const [item, setItem] = useState<Item>(() => {
    if (editingItem) {
      return {
        ...editingItem,
        purchasePreference: {
          exclusive: editingItem.purchasePreference.exclusive,
          flexible: editingItem.purchasePreference.flexible,
          flexible_alternatives: [...editingItem.purchasePreference.flexible_alternatives],
          priceRange: editingItem.purchasePreference.priceRange
            ? { ...editingItem.purchasePreference.priceRange }
            : { min: 0, max: 0 },
          callIfExceeded: editingItem.purchasePreference.callIfExceeded
            ? { ...editingItem.purchasePreference.callIfExceeded }
            : { contactMethod: "call", contactNumber: "" },
        },
        testCriteria: editingItem.testCriteria || "",
        packaging: editingItem.packaging ? [...editingItem.packaging] : [],
      }
    }
    return {
      id: Date.now(),
      name: "",
      category: "",
      description: "",
      estimatedPrice: 0,
      purchasePreference: {
        exclusive: false,
        flexible: false,
        flexible_alternatives: [],
        priceRange: { min: 0, max: 0 },
        callIfExceeded: { contactMethod: "call", contactNumber: "" },
      },
      testCriteria: "",
      packaging: [],
    }
  })

  const [alternativesText, setAlternativesText] = useState(() => {
    return editingItem?.purchasePreference.flexible_alternatives.join(", ") || ""
  })

  const [showPrescriptionNote, setShowPrescriptionNote] = useState(false)
  const [showTestCriteria, setShowTestCriteria] = useState(false)
  const [showPackaging, setShowPackaging] = useState(false)

  const [purchasePreference, setPurchasePreference] = useState({
    exclusive: editingItem?.purchasePreference.exclusive || false,
    flexible: editingItem?.purchasePreference.flexible || false,
    priceRange: !!editingItem?.purchasePreference.priceRange || false,
    callIfExceeded: !!editingItem?.purchasePreference.callIfExceeded || false,
  })

  const categories = [
    "Food & Drinks",
    "Beverages",
    "Laundry",
    "Quotations",
    "Groceries",
    "Medicine",
    "Gifts & Parcels",
    "Electronics",
    "Documents",
    "Other",
  ]

  useEffect(() => {
    if (editingItem) {
      setItem(editingItem)
      setAlternativesText(editingItem.purchasePreference.flexible_alternatives.join(", "))
      setPurchasePreference({
        exclusive: editingItem.purchasePreference.exclusive,
        flexible: editingItem.purchasePreference.flexible,
        priceRange: !!editingItem.purchasePreference.priceRange,
        callIfExceeded: !!editingItem.purchasePreference.callIfExceeded,
      })
    }
  }, [editingItem])

  useEffect(() => {
    const isElectronicsOrGifts = item.category === "Electronics" || item.category === "Gifts & Parcels"
    setShowTestCriteria(isElectronicsOrGifts)
    setShowPackaging(isElectronicsOrGifts)
    setShowPrescriptionNote(item.category === "Medicine")
  }, [item.category])

  const updatePurchasePreference = (key: string, value: boolean) => {
    setPurchasePreference((prev) => {
      const newPreference = { ...prev, [key]: value }
      if (key === "exclusive" && value) {
        newPreference.flexible = false
      } else if (key === "flexible" && value) {
        newPreference.exclusive = false
      }
      return newPreference
    })

    setItem((prevItem) => {
      const updatedPreference = { ...prevItem.purchasePreference, [key]: value }
      if (key === "exclusive" && value) {
        updatedPreference.flexible = false
        updatedPreference.flexible_alternatives = []
      } else if (key === "flexible" && value) {
        updatedPreference.exclusive = false
      }

      // Handle priceRange and callIfExceeded
      if (key === "priceRange") {
        updatedPreference.priceRange = value ? { min: 0, max: 0 } : undefined
      } else if (key === "callIfExceeded") {
        updatedPreference.callIfExceeded = value ? { contactMethod: "call", contactNumber: "" } : undefined
      }

      return {
        ...prevItem,
        purchasePreference: updatedPreference,
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const processedAlternatives = alternativesText
      .split(",")
      .map((alt) => alt.trim())
      .filter((alt) => alt !== "")

    const submittedItem = {
      ...item,
      description: item.description.trim() || "No description provided",
      category: item.category || "Uncategorized",
      purchasePreference: {
        ...item.purchasePreference,
        flexible_alternatives: processedAlternatives,
      },
    }

    addItem(submittedItem)
  }

  const packagingOptions = ["Gift wrap", "Bubble wrap", "Box", "Plastic bag", "Paper bag"]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Item Name"
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        required
      />
      <Select value={item.category} onValueChange={(value) => setItem({ ...item, category: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showPrescriptionNote && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please note: For prescription medicines, you will need to send a valid prescription via WhatsApp after
            submitting your order.
          </AlertDescription>
        </Alert>
      )}

      <Textarea
        placeholder="Description"
        value={item.description}
        onChange={(e) => setItem({ ...item, description: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Estimated Price"
        value={item.estimatedPrice.toString()}
        onChange={(e) => setItem({ ...item, estimatedPrice: Number.parseFloat(e.target.value) || 0 })}
        required
      />
      <div className="space-y-2">
        <Label>Purchase Preference (Select at least one)</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="exclusive"
            checked={purchasePreference.exclusive}
            onCheckedChange={(checked) => {
              const isChecked = checked as boolean
              updatePurchasePreference("exclusive", isChecked)
            }}
          />
          <Label htmlFor="exclusive">Exclusive (exact item only)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="flexible"
            checked={purchasePreference.flexible}
            onCheckedChange={(checked) => {
              const isChecked = checked as boolean
              updatePurchasePreference("flexible", isChecked)
            }}
          />
          <Label htmlFor="flexible">Flexible (alternatives allowed)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="priceRange"
            checked={purchasePreference.priceRange}
            onCheckedChange={(checked) => updatePurchasePreference("priceRange", checked as boolean)}
          />
          <Label htmlFor="priceRange">Price Range</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="callIfExceeded"
            checked={purchasePreference.callIfExceeded}
            onCheckedChange={(checked) => updatePurchasePreference("callIfExceeded", checked as boolean)}
          />
          <Label htmlFor="callIfExceeded">Call/text if price exceeded</Label>
        </div>
      </div>
      {purchasePreference.flexible && (
        <div className="space-y-2">
          <Label>Alternatives (comma-separated)</Label>
          <Textarea
            placeholder="e.g. Red and yellow, Blue with stripes, Green polka dot"
            value={alternativesText}
            onChange={(e) => {
              setAlternativesText(e.target.value)
              const alternatives = e.target.value
                .split(",")
                .map((alt) => alt.trim())
                .filter((alt) => alt !== "")
              setItem({
                ...item,
                purchasePreference: {
                  ...item.purchasePreference,
                  flexible_alternatives: alternatives,
                },
              })
            }}
            className="min-h-[80px]"
          />
          <p className="text-xs text-muted-foreground">
            Type each alternative and separate them with commas. Multi-word alternatives like "Red and yellow" are
            supported.
          </p>
        </div>
      )}
      {purchasePreference.priceRange && (
        <div className="space-y-2">
          <Label>Price Range (in Kwacha)</Label>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={item.purchasePreference.priceRange?.min?.toString() || "0"}
              onChange={(e) =>
                setItem({
                  ...item,
                  purchasePreference: {
                    ...item.purchasePreference,
                    priceRange: {
                      min: Number.parseFloat(e.target.value) || 0,
                      max: item.purchasePreference.priceRange?.max || 0,
                    },
                  },
                })
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={item.purchasePreference.priceRange?.max?.toString() || "0"}
              onChange={(e) =>
                setItem({
                  ...item,
                  purchasePreference: {
                    ...item.purchasePreference,
                    priceRange: {
                      min: item.purchasePreference.priceRange?.min || 0,
                      max: Number.parseFloat(e.target.value) || 0,
                    },
                  },
                })
              }
            />
          </div>
        </div>
      )}
      {purchasePreference.callIfExceeded && (
        <div className="space-y-2">
          <Label>Contact Method</Label>
          <Select
            value={item.purchasePreference.callIfExceeded?.contactMethod || "call"}
            onValueChange={(value: "call" | "text") =>
              setItem({
                ...item,
                purchasePreference: {
                  ...item.purchasePreference,
                  callIfExceeded: {
                    ...item.purchasePreference.callIfExceeded!,
                    contactMethod: value,
                  },
                },
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select contact method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="call">Call</SelectItem>
              <SelectItem value="text">Text</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="tel"
            placeholder="Contact Number"
            value={item.purchasePreference.callIfExceeded?.contactNumber || ""}
            onChange={(e) =>
              setItem({
                ...item,
                purchasePreference: {
                  ...item.purchasePreference,
                  callIfExceeded: {
                    ...item.purchasePreference.callIfExceeded!,
                    contactNumber: e.target.value,
                  },
                },
              })
            }
          />
        </div>
      )}
      {showTestCriteria && (
        <div className="space-y-2">
          <Label>Test Criteria</Label>
          <Textarea
            placeholder="Enter test criteria"
            value={item.testCriteria || ""}
            onChange={(e) => setItem({ ...item, testCriteria: e.target.value })}
          />
        </div>
      )}
      {showPackaging && (
        <div className="space-y-2">
          <Label>Packaging (additional cost applies)</Label>
          {packagingOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={item.packaging?.includes(option)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setItem({ ...item, packaging: [...(item.packaging || []), option] })
                  } else {
                    setItem({ ...item, packaging: item.packaging?.filter((p) => p !== option) })
                  }
                }}
              />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </div>
      )}
      <Button type="submit" className="w-full bg-primary text-secondary hover:bg-primary/90">
        <PlusCircle className="mr-2 h-4 w-4" /> {editingItem ? "Update" : "Add"} Item
      </Button>
    </form>
  )
}

