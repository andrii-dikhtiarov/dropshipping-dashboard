export interface Inventory {
  id: number;
  sku: string;
  name: string;
  image: string;
  warehouse: string;
  stock: number;
  threshold: number;
  runoutDays: number;
}
