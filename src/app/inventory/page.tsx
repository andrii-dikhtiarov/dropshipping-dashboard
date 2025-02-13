"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

// Mock data for inventory
const inventoryData = [
  {
    id: 1,
    sku: "SKU001",
    name: "T-Shirt",
    image: "/placeholder.svg",
    warehouse: "China",
    stock: 100,
    threshold: 20,
    runoutDays: 30,
  },
  {
    id: 2,
    sku: "SKU002",
    name: "Jeans",
    image: "/placeholder.svg",
    warehouse: "EU",
    stock: 50,
    threshold: 10,
    runoutDays: 15,
  },
  {
    id: 3,
    sku: "SKU003",
    name: "Sneakers",
    image: "/placeholder.svg",
    warehouse: "US",
    stock: 75,
    threshold: 15,
    runoutDays: 45,
  },
  {
    id: 4,
    sku: "SKU004",
    name: "Hat",
    image: "/placeholder.svg",
    warehouse: "China",
    stock: 200,
    threshold: 30,
    runoutDays: 60,
  },
  {
    id: 5,
    sku: "SKU005",
    name: "Socks",
    image: "/placeholder.svg",
    warehouse: "EU",
    stock: 150,
    threshold: 25,
    runoutDays: 90,
  },
]

export default function InventoryPage() {
  const [filter, setFilter] = useState("")
  const [warehouse, setWarehouse] = useState("All")
  const [category, setCategory] = useState("All")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [reorderItem, setReorderItem] = useState<(typeof inventoryData)[0] | null>(null)
  const [thresholdItem, setThresholdItem] = useState<(typeof inventoryData)[0] | null>(null)
  const [newThreshold, setNewThreshold] = useState<number | "">("")
  const [inventory, setInventory] = useState(inventoryData)

  const filteredInventory = inventory.filter(
    (item) =>
      (item.sku.toLowerCase().includes(filter.toLowerCase()) ||
        item.name.toLowerCase().includes(filter.toLowerCase())) &&
      (warehouse === "All" || item.warehouse === warehouse) &&
      (category === "All" || item.sku.startsWith(category)),
  )

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleBulkReorder = () => {
    console.log("Bulk reorder for items:", selectedItems)
    // Here you would typically send this data to your backend
    toast({
      title: "Bulk Reorder Initiated",
      description: `Reorder request sent for ${selectedItems.length} items.`,
    })
  }

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNewThreshold(value === "" ? "" : Number(value))
  }

  const handleThresholdSubmit = () => {
    if (thresholdItem && newThreshold !== "") {
      setInventory((prev) =>
        prev.map((item) => (item.id === thresholdItem.id ? { ...item, threshold: Number(newThreshold) } : item)),
      )
      toast({
        title: "Threshold Updated",
        description: `Low stock threshold for ${thresholdItem.name} updated to ${newThreshold}.`,
      })
      setThresholdItem(null)
      setNewThreshold("")
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inventory Management</h1>

      <div className="flex space-x-4">
        <Input
          placeholder="Search by SKU or Product Name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Select value={warehouse} onValueChange={setWarehouse}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Warehouse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Warehouses</SelectItem>
            <SelectItem value="China">China</SelectItem>
            <SelectItem value="EU">EU</SelectItem>
            <SelectItem value="US">US</SelectItem>
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="SKU0">Category 1</SelectItem>
            <SelectItem value="SKU1">Category 2</SelectItem>
            <SelectItem value="SKU2">Category 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedItems.length === filteredInventory.length}
                onCheckedChange={() =>
                  setSelectedItems(
                    selectedItems.length === filteredInventory.length ? [] : filteredInventory.map((item) => item.id),
                  )
                }
              />
            </TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Warehouse</TableHead>
            <TableHead>Available Stock</TableHead>
            <TableHead>Low Stock Threshold</TableHead>
            <TableHead>Estimated Runout</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInventory.map((item) => (
            <TableRow key={item.id} className={item.stock < item.threshold ? "bg-red-100" : ""}>
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleCheckboxChange(item.id)}
                />
              </TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Image src={item.image || "/placeholder.svg"} alt={item.name} width={50} height={50} />
              </TableCell>
              <TableCell>{item.warehouse}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.threshold}</TableCell>
              <TableCell>{item.runoutDays} days</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setReorderItem(item)}>
                        Reorder
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Reorder {reorderItem?.name}</DialogTitle>
                        <DialogDescription>Enter the quantity you want to reorder for this product.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="reorder-quantity" className="text-right">
                            Quantity
                          </Label>
                          <Input
                            id="reorder-quantity"
                            type="number"
                            className="col-span-3"
                            defaultValue={reorderItem?.threshold}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Submit Reorder</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setThresholdItem(item)}>
                        Set Threshold
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Set Low Stock Threshold for {thresholdItem?.name}</DialogTitle>
                        <DialogDescription>Enter the new low stock threshold for this product.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="threshold" className="text-right">
                            Threshold
                          </Label>
                          <Input
                            id="threshold"
                            type="number"
                            className="col-span-3"
                            value={newThreshold}
                            onChange={handleThresholdChange}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleThresholdSubmit}>
                          Set Threshold
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedItems.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={handleBulkReorder}>Reorder Selected ({selectedItems.length})</Button>
        </div>
      )}
    </div>
  )
}

