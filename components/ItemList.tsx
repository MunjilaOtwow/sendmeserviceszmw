"use client"

import { useState } from "react"
import { Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AddItemForm, { type Item } from "./AddItemForm"

interface ItemListProps {
  items: Item[]
  removeItem: (id: number) => void
  editItem: (id: number, item: Item) => void
}

export default function ItemList({ items, removeItem, editItem }: ItemListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const handleEdit = (item: Item) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  const handleEditComplete = (updatedItem: Item) => {
    if (selectedItem) {
      editItem(selectedItem.id, updatedItem)
      setIsDialogOpen(false)
      setSelectedItem(null)
    }
  }

  return (
    <div className="space-y-4 mb-4">
      {items.map((item) => (
        <div key={item.id} className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
          <h3 className="font-semibold">{item.name}</h3>
          <p>Category: {item.category}</p>
          <p>Description: {item.description}</p>
          <p>Estimated Price: K{item.estimatedPrice.toFixed(2)}</p>
          <p>Purchase Preference:</p>
          <ul className="list-disc list-inside">
            {item.purchasePreference.exclusive && <li>Exclusive</li>}
            {item.purchasePreference.flexible && (
              <li>
                Flexible
                {item.purchasePreference.flexible_alternatives.length > 0 && (
                  <span> (Alternatives: {item.purchasePreference.flexible_alternatives.join(", ")})</span>
                )}
              </li>
            )}
            {item.purchasePreference.priceRange && (
              <li>
                Price Range: K{item.purchasePreference.priceRange.min} - K{item.purchasePreference.priceRange.max}
              </li>
            )}
            {item.purchasePreference.callIfExceeded && (
              <li>
                Call/Text if Exceeded: {item.purchasePreference.callIfExceeded.contactMethod} at{" "}
                {item.purchasePreference.callIfExceeded.contactNumber}
              </li>
            )}
          </ul>
          <div className="mt-2 space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>
              <Trash2 className="mr-2 h-4 w-4" /> Remove
            </Button>
          </div>
        </div>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          {selectedItem && <AddItemForm addItem={handleEditComplete} editingItem={selectedItem} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

