"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

// Mock inventory data
const inventoryData = [
  { id: 1, sku: "SKU001", name: "T-Shirt", price: 19.99, stock: 100 },
  { id: 2, sku: "SKU002", name: "Jeans", price: 49.99, stock: 50 },
  { id: 3, sku: "SKU003", name: "Sneakers", price: 79.99, stock: 75 },
  { id: 4, sku: "SKU004", name: "Hat", price: 24.99, stock: 200 },
  { id: 5, sku: "SKU005", name: "Socks", price: 9.99, stock: 150 },
]

export default function CreateOrderPage() {
  const router = useRouter()
  const [shippingDetails, setShippingDetails] = useState({
    receiverName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    shippingMethod: "",
  })
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

  const handleShippingDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShippingDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingMethodChange = (value: string) => {
    setShippingDetails((prev) => ({ ...prev, shippingMethod: value }))
  }

  const handleItemSelection = (itemId: number) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
    if (!quantities[itemId]) {
      setQuantities((prev) => ({ ...prev, [itemId]: 1 }))
    }
  }

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [itemId]: quantity }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    const orderData = {
      shippingDetails,
      items: selectedItems.map((id) => ({
        ...inventoryData.find((item) => item.id === id),
        quantity: quantities[id],
      })),
      status: [{ status: "Created", date: new Date().toISOString() }],
    }
    console.log("New order:", orderData)
    toast({
      title: "Order Created",
      description: "Your order has been successfully created.",
    })
    router.push("/orders")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Order</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Shipping Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="receiverName">Receiver Name</Label>
              <Input
                id="receiverName"
                name="receiverName"
                value={shippingDetails.receiverName}
                onChange={handleShippingDetailsChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={shippingDetails.address}
                onChange={handleShippingDetailsChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={shippingDetails.city}
                onChange={handleShippingDetailsChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={shippingDetails.country}
                onChange={handleShippingDetailsChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleShippingDetailsChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shippingMethod">Shipping Method</Label>
              <Select onValueChange={handleShippingMethodChange} value={shippingDetails.shippingMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shipping method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Shipping</SelectItem>
                  <SelectItem value="express">Express Shipping</SelectItem>
                  <SelectItem value="overnight">Overnight Shipping</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Select Items</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Select</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Available Stock</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleItemSelection(item.id)}
                    />
                  </TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={quantities[item.id] || ""}
                      onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value))}
                      disabled={!selectedItems.includes(item.id)}
                      className="w-20"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button type="submit">Create Order</Button>
      </form>
    </div>
  )
}

