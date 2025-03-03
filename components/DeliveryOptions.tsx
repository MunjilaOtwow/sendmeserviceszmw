"use client"

import type React from "react"

import { useEffect } from "react"
import { isTuesday, isThursday } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DeliveryOptionsProps {
  setDeliveryDate: (date: Date) => void
  setOrderTime: (time: string) => void
  setPurchaseLocation: (location: string) => void
  setIsExpressDelivery: (isExpress: boolean) => void
  setDeliveryMethod: (method: "pickup" | "delivery") => void
  setMunicipality: (municipality: string) => void
  onComplete: () => void
}

export default function DeliveryOptions({
  setDeliveryDate,
  setOrderTime,
  setPurchaseLocation,
  setIsExpressDelivery,
  setDeliveryMethod,
  setMunicipality,
  onComplete,
}: DeliveryOptionsProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [isExpress, setIsExpress] = useState(false)
  const [selectedOrderTime, setSelectedOrderTime] = useState("")
  const [deliveryMethod, setDeliveryMethodState] = useState<"pickup" | "delivery">("pickup")
  const [selectedMunicipality, setSelectedMunicipality] = useState("")
  const [otherMunicipality, setOtherMunicipality] = useState("")
  const [selectedPurchaseLocation, setSelectedPurchaseLocation] = useState("")
  const [customPurchaseLocation, setCustomPurchaseLocation] = useState("")
  const [areaDetails, setAreaDetails] = useState("")
  const [showOtherPurchaseLocation, setShowOtherPurchaseLocation] = useState(false)

  const orderTimes = [
    "07:00 – 07:30",
    "09:00 – 09:30",
    "11:00 – 11:30",
    "13:00 – 13:30",
    "14:00 – 14:30",
    "16:00 – 16:30",
    "18:00 – 18:30",
    "Instant Order",
  ]

  const purchaseLocations = {
    "Grocery Stores": [
      "Young Phiroz General Dealers - City Market Soweto",
      "Young Phiroz Burma Road",
      "Young Phiroz General Dealers - Simoson Mega Store",
      "Young Phiroz Kalinga Linga (Alick Nkhata Road)",
      "Young Phiroz Garden (Katima Mulilo Road)",
    ],
    Pharmacies: [
      "Lusaka Chemist Ltd - Main branch (Freedom Way)",
      "LUSAKA CHEMIST LTD (Katunjila Rd)",
      "Lusaka chemist Ltd (Carousell mall, Kafue and Lumumba Road)",
      "Lusaka Pharmacy (Freedom Way)",
      "Lusaka Pharmacy (Katunjila Road)",
      "Lusaka Pharmacy",
    ],
    Other: [],
  }

  const municipalities = [
    "Avondale",
    "Bauleni",
    "Barlaston Park",
    "Bedrock",
    "Chaisa",
    "Chalala",
    "Chazanga",
    "Chainama",
    "Chilenje",
    "Chilenje South",
    "Chipata",
    "Chunga",
    "Civic Centre",
    "Central Business District",
    "Chelston",
    "Frank",
    "Foxdale",
    "Garden",
    "Garden Compound",
    "Garden Park",
    "George",
    "Heavy Industrial Area",
    "Helen Kaunda",
    "Ibex Hill",
    "John Howard",
    "John Laing",
    "Kamama",
    "Kamwala",
    "Kamwala South",
    "Kabulonga",
    "Kabanana",
    "Kalikiliki",
    "Kalundu",
    "Kanyama",
    "Kafue Estates",
    "Kuomboka",
    "Kuku",
    "Leona",
    "Libala Stage 1",
    "Libala Stage 2",
    "Libala Stage 3",
    "Libala Stage 4A",
    "Libala Stage 4B",
    "Lilanda",
    "Lilayi",
    "Lilayi Gondwe",
    "Longacres",
    "Lusaka North Forest",
    "Lusaka West",
    "Madras",
    "Makeni",
    "Makeni Industrial Zone",
    "Matero",
    "Matero East",
    "Matero North",
    "Meanwood Avondale",
    "Meanwood Chamba Valley",
    "Meanwood Ibex",
    "Meanwood Kwamwena",
    "Meanwood Mutumbi",
    "Meanwood Ndeke",
    "Mandevu/Marapodi",
    "Misisi",
    "Mtendere",
    "Mtendere East",
    "Munali",
    "New Kasama",
    "Ngombe",
    "Northmead",
    "Nyumba Yanga",
    "NRDC",
    "Olympia",
    "Paradise",
    "PHI (Presidential Housing Initiative)",
    "Prospect Hill",
    "Rockfield",
    "Rhodes Park",
    "Show Grounds",
    "Shimabala",
    "Silverest Estate",
    "Sunningdale",
    "Thornpark",
    "Zanimuone",
    "Chawama",
    "Chudleigh",
    "Civic Centre",
    "Other",
  ]

  useEffect(() => {
    if (
      selectedDate &&
      selectedOrderTime &&
      (selectedPurchaseLocation || customPurchaseLocation) &&
      (deliveryMethod === "pickup" || selectedMunicipality)
    ) {
      onComplete()
    }
  }, [
    selectedDate,
    selectedOrderTime,
    selectedPurchaseLocation,
    customPurchaseLocation,
    deliveryMethod,
    selectedMunicipality,
    onComplete,
  ])

  // Add validation functions for the date and time fields
  const validateDateSelection = () => {
    if (!selectedDate) {
      alert("Please select a delivery date for your order.")
      return false
    }
    return true
  }

  const validateTimeSelection = () => {
    if (!selectedOrderTime) {
      alert("Please select a time for your order.")
      return false
    }
    return true
  }

  const validatePurchaseLocation = () => {
    if (!selectedPurchaseLocation && !customPurchaseLocation) {
      alert("Please select or enter a purchase location.")
      return false
    }
    return true
  }

  const validateMunicipality = () => {
    if (deliveryMethod === "delivery" && !selectedMunicipality) {
      alert("Please select an area for delivery.")
      return false
    }
    return true
  }

  // Add a validation function that can be called from outside
  const validateAll = () => {
    return validateDateSelection() && validateTimeSelection() && validatePurchaseLocation() && validateMunicipality()
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setDeliveryDate(date)
      const isExpressDay = isTuesday(date) || isThursday(date)
      setIsExpress(isExpressDay)
      setIsExpressDelivery(isExpressDay)
    }
  }

  const handleOrderTimeChange = (value: string) => {
    const currentTime = new Date()
    const [hours, minutes] = value.split(":").map(Number)
    const selectedTime = new Date(currentTime.setHours(hours, minutes))

    if (selectedDate && selectedDate.toDateString() === currentTime.toDateString() && selectedTime < currentTime) {
      alert("You cannot select a time in the past. Please choose a future time.")
      return
    }

    setSelectedOrderTime(value)
    setOrderTime(value)
  }

  const handleDeliveryMethodChange = (value: "pickup" | "delivery") => {
    setDeliveryMethodState(value)
    setDeliveryMethod(value)
  }

  const handleMunicipalityChange = (value: string) => {
    setSelectedMunicipality(value)
    if (value !== "Other") {
      setMunicipality(value)
    }
  }

  const handleOtherMunicipalityChange = (value: string) => {
    setOtherMunicipality(value)
    setMunicipality(value)
  }

  const handlePurchaseLocationChange = (value: string) => {
    setSelectedPurchaseLocation(value)
    if (value === "Other") {
      setShowOtherPurchaseLocation(true)
      setPurchaseLocation(customPurchaseLocation || "")
    } else {
      setShowOtherPurchaseLocation(false)
      setPurchaseLocation(value)
    }
  }

  const handleCustomPurchaseLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomPurchaseLocation(value)
    setPurchaseLocation(value)
  }

  const handleAreaDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAreaDetails(e.target.value)
    // Update the municipality with the additional details
    if (selectedMunicipality === "Other") {
      setMunicipality(`${otherMunicipality} - ${e.target.value}`)
    } else {
      setMunicipality(`${selectedMunicipality} - ${e.target.value}`)
    }
  }

  const SearchableDropdown = ({ options, value, onChange, placeholder }) => {
    const [search, setSearch] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const filteredOptions = options.filter((option) => option.toLowerCase().includes(search.toLowerCase()))

    const handleOptionSelect = (option) => {
      onChange(option)
      setIsOpen(false)
    }

    return (
      <div className="relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {value || placeholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 focus:ring-0"
            />
            <ScrollArea className="h-72">
              {filteredOptions.map((option) => (
                <Button
                  key={option}
                  variant="ghost"
                  onClick={() => handleOptionSelect(option)}
                  className="w-full justify-start font-normal"
                >
                  {option}
                </Button>
              ))}
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  return (
    <div className="space-y-6 mb-8 bg-secondary text-ancient p-4 rounded-lg border border-primary">
      <div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          initialFocus
          className="rounded-md border w-full"
          fromDate={new Date()}
        />
        {isExpress && (
          <Badge variant="secondary" className="mt-2">
            Express Delivery (Extra Charge Applies)
          </Badge>
        )}
      </div>

      <Select value={selectedOrderTime} onValueChange={handleOrderTimeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Order Time" />
        </SelectTrigger>
        <SelectContent>
          {orderTimes.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <RadioGroup value={deliveryMethod} onValueChange={handleDeliveryMethodChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pickup" id="pickup" />
          <Label htmlFor="pickup">Self Pickup</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="delivery" id="delivery" />
          <Label htmlFor="delivery">Delivery</Label>
        </div>
      </RadioGroup>

      <div className="space-y-2">
        <Label>Purchase Location (Where you want your product bought)</Label>
        <SearchableDropdown
          options={[...new Set([...Object.values(purchaseLocations).flat(), "Other"])]}
          value={selectedPurchaseLocation}
          onChange={handlePurchaseLocationChange}
          placeholder="Select Purchase Location"
        />
        {showOtherPurchaseLocation && (
          <Input
            type="text"
            placeholder="Enter custom purchase location"
            value={customPurchaseLocation}
            onChange={handleCustomPurchaseLocationChange}
            className="mt-2"
          />
        )}
      </div>

      {deliveryMethod === "delivery" && (
        <div className="space-y-2">
          <Label>Select Area</Label>
          <SearchableDropdown
            options={municipalities}
            value={selectedMunicipality}
            onChange={handleMunicipalityChange}
            placeholder="Select Area"
          />
          {selectedMunicipality === "Other" && (
            <Input
              type="text"
              placeholder="Specify Area"
              value={otherMunicipality}
              onChange={(e) => handleOtherMunicipalityChange(e.target.value)}
            />
          )}
          <Input
            type="text"
            placeholder="Additional area details (landmarks, street name, etc.)"
            value={areaDetails}
            onChange={handleAreaDetailsChange}
          />
        </div>
      )}
    </div>
  )
}

