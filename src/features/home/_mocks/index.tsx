import { RecentOrder } from '@/types/order';
import { InfoCardProps } from '@/features/home/_components/info-card';
import { AlertCircle, DollarSign, Package, TrendingUp } from 'lucide-react';
import { Shipment } from '@/types/shipment';

export const SHIPMENT_DATA: Shipment[] = [
  { id: 1, day: 'Mon', shipments: 12 },
  { id: 2, day: 'Tue', shipments: 19 },
  { id: 3, day: 'Wed', shipments: 15 },
  { id: 4, day: 'Thu', shipments: 22 },
  { id: 5, day: 'Fri', shipments: 25 },
  { id: 6, day: 'Sat', shipments: 18 },
  { id: 7, day: 'Sun', shipments: 10 },
];

export const RECENT_ORDERS: RecentOrder[] = [
  { id: 1, orderId: '1234', date: '2023-06-01', status: 'Delivered' },
  { id: 2, orderId: '1235', date: '2023-06-02', status: 'In Transit' },
  { id: 3, orderId: '1236', date: '2023-06-03', status: 'Shipped' },
  { id: 4, orderId: '1237', date: '2023-06-04', status: 'Delayed' },
  { id: 5, orderId: '1238', date: '2023-06-05', status: 'Delivered' },
];

export const INFO_CARDS: (InfoCardProps & { id: number })[] = [
  {
    id: 1,
    title: 'Total Revenue',
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    mainInfo: '$45,231.89',
    secondaryInfo: '+20.1% from last month',
  },
  {
    id: 2,
    title: 'Orders',
    icon: <Package className="h-4 w-4 text-muted-foreground" />,
    mainInfo: '+2,350',
    secondaryInfo: '+180.1% from last month',
  },
  {
    id: 3,
    title: 'Average Order Value',
    icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    mainInfo: '$59.62',
    secondaryInfo: '+19.2% from last month',
  },
  {
    id: 4,
    title: 'Low-Stock SKUs',
    icon: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    mainInfo: '4 SKUs',
    secondaryInfo: '2 less than last week',
  },
];
