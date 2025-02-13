"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Updated mock data for orders
const ordersData = [
  {
    id: "ORD001",
    date: "2023-06-01",
    shippingDetails: {
      receiverName: "John Doe",
      address: "123 Main St",
      city: "Anytown",
      country: "USA",
      postalCode: "12345",
      shippingMethod: "standard",
    },
    items: [
      { sku: "SKU001", name: "T-Shirt", quantity: 2, price: 39.98 },
      { sku: "SKU002", name: "Jeans", quantity: 1, price: 49.99 },
    ],
    status: [
      { status: "Created", date: "2023-06-01T10:00:00Z" },
      { status: "Processing", date: "2023-06-01T14:00:00Z" },
      { status: "Shipped", date: "2023-06-03T09:00:00Z" },
    ],
    trackingNumber: "TRK001",
  },
  {
    id: "ORD002",
    date: "2023-06-02",
    shippingDetails: {
      receiverName: "Jane Smith",
      address: "456 Elm St",
      city: "Other City",
      country: "Canada",
      postalCode: "A1B 2C3",
      shippingMethod: "express",
    },
    items: [{ sku: "SKU003", name: "Sneakers", quantity: 1, price: 79.99 }],
    status: [
      { status: "Created", date: "2023-06-02T11:00:00Z" },
      { status: "Processing", date: "2023-06-02T15:00:00Z" },
    ],
    trackingNumber: "",
  },
  {
    id: "ORD003",
    date: "2023-06-03",
    shippingDetails: {
      receiverName: "Bob Johnson",
      address: "789 Oak St",
      city: "Another Town",
      country: "UK",
      postalCode: "AB12 3CD",
      shippingMethod: "standard",
    },
    items: [
      { sku: "SKU004", name: "Hat", quantity: 3, price: 74.97 },
      { sku: "SKU005", name: "Socks", quantity: 2, price: 19.98 },
    ],
    status: [
      { status: "Created", date: "2023-06-03T09:00:00Z" },
      { status: "Processing", date: "2023-06-03T13:00:00Z" },
      { status: "Shipped", date: "2023-06-04T10:00:00Z" },
      { status: "Delivered", date: "2023-06-08T14:00:00Z" },
    ],
    trackingNumber: "TRK003",
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(ordersData)
  const [filter, setFilter] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [status, setStatus] = useState("all")
  const [country, setCountry] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      order.id.toLowerCase().includes(filter.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(filter.toLowerCase())
    const matchesStatus = status === "all" || order.status[order.status.length - 1].status === status
    const matchesCountry = country === "all" || order.shippingDetails.country === country
    const matchesDateRange =
      !dateRange.from ||
      !dateRange.to ||
      (new Date(order.date) >= dateRange.from && new Date(order.date) <= dateRange.to)
    return matchesFilter && matchesStatus && matchesCountry && matchesDateRange
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders & Shipment Tracking</h1>
        <Link href="/orders/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Order
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search by Order ID or Tracking Number"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[280px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Created">Created</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="USA">USA</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
            <SelectItem value="UK">UK</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Shipping Country</TableHead>
            <TableHead>Tracking Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.status[order.status.length - 1].status}</TableCell>
              <TableCell>{order.shippingDetails.country}</TableCell>
              <TableCell>{order.trackingNumber || "N/A"}</TableCell>
              <TableCell>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Order Details: {order.id}</SheetTitle>
                      <SheetDescription>View detailed information about this order.</SheetDescription>
                    </SheetHeader>
                    <div className="py-4">
                      <h3 className="font-semibold mb-2">Shipping Details:</h3>
                      <p>Receiver: {order.shippingDetails.receiverName}</p>
                      <p>Address: {order.shippingDetails.address}</p>
                      <p>City: {order.shippingDetails.city}</p>
                      <p>Country: {order.shippingDetails.country}</p>
                      <p>Postal Code: {order.shippingDetails.postalCode}</p>
                      <p>Shipping Method: {order.shippingDetails.shippingMethod}</p>

                      <h3 className="font-semibold mt-4 mb-2">Order Items:</h3>
                      <ul className="list-disc pl-5">
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.name} (SKU: {item.sku}) - Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>

                      <h3 className="font-semibold mt-4 mb-2">Order History:</h3>
                      <ul className="list-disc pl-5">
                        {order.status.map((status, index) => (
                          <li key={index}>
                            {status.status}: {new Date(status.date).toLocaleString()}
                          </li>
                        ))}
                      </ul>

                      {order.trackingNumber && (
                        <p className="mt-4">
                          <strong>Tracking Number:</strong> {order.trackingNumber}
                        </p>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

