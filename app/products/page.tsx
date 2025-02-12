"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

const productsData = [
  { id: 1, name: "T-Shirt", sku: "TS001", price: 19.99, cost: 5.0, supplier: "Supplier A" },
  { id: 2, name: "Jeans", sku: "JN001", price: 49.99, cost: 15.0, supplier: "Supplier B" },
  { id: 3, name: "Sneakers", sku: "SN001", price: 79.99, cost: 25.0, supplier: "Supplier C" },
  { id: 4, name: "Hat", sku: "HT001", price: 24.99, cost: 8.0, supplier: "Supplier A" },
  { id: 5, name: "Socks", sku: "SK001", price: 9.99, cost: 2.0, supplier: "Supplier B" },
]

export default function ProductsPage() {
  const [filter, setFilter] = useState("")
  const [newProduct, setNewProduct] = useState({ name: "", sku: "", price: "", cost: "", supplier: "" })

  const filteredProducts = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.sku.toLowerCase().includes(filter.toLowerCase()),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddProduct = () => {
    // Here you would typically send this data to your backend
    console.log("New product:", newProduct)
    // Reset the form
    setNewProduct({ name: "", sku: "", price: "", cost: "", supplier: "" })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Product Management</h1>

      <div className="flex justify-between items-center">
        <Input
          placeholder="Search by Product Name or SKU"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Enter the details of the new product here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sku" className="text-right">
                  SKU
                </Label>
                <Input id="sku" name="sku" value={newProduct.sku} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cost" className="text-right">
                  Cost
                </Label>
                <Input
                  id="cost"
                  name="cost"
                  type="number"
                  value={newProduct.cost}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supplier" className="text-right">
                  Supplier
                </Label>
                <Input
                  id="supplier"
                  name="supplier"
                  value={newProduct.supplier}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddProduct}>
                Save Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>${product.cost.toFixed(2)}</TableCell>
              <TableCell>{product.supplier}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

