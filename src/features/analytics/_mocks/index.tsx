import { Sale, TopProduct } from '@/types/sale';
import { InfoCardProps } from '@/features/analytics/_components/info-card';

export const SALES_DATA: Sale[] = [
  { id: 1, date: '2023-01', sales: 4000 },
  { id: 2, date: '2023-02', sales: 3000 },
  { id: 3, date: '2023-03', sales: 5000 },
  { id: 4, date: '2023-04', sales: 4500 },
  { id: 5, date: '2023-05', sales: 6000 },
  { id: 6, date: '2023-06', sales: 5500 },
];

export const TOP_PRODUCTS: TopProduct[] = [
  { id: 1, name: 'T-Shirt', sales: 1200 },
  { id: 2, name: 'Jeans', sales: 950 },
  { id: 3, name: 'Sneakers', sales: 850 },
  { id: 4, name: 'Hat', sales: 600 },
  { id: 5, name: 'Socks', sales: 500 },
];

export const INFO_CARDS: (InfoCardProps & { id: number })[] = [
  {
    id: 1,
    title: 'Total Revenue',
    mainInfo: '$45,231.89',
    secondaryInfo: '+20.1% from last month',
  },
  {
    id: 2,
    title: 'Orders',
    mainInfo: '+2350',
    secondaryInfo: '+180.1% from last month',
  },
  {
    id: 3,
    title: 'Average Order Value',
    mainInfo: '$59.62',
    secondaryInfo: '+19.2% from last month',
  },
  {
    id: 4,
    title: 'Conversion Rate',
    mainInfo: '3.2%',
    secondaryInfo: '+0.5% from last month',
  },
];
