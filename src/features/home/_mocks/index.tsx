import { RecentOrder } from '@/types/order';
import { DashboardCardProps } from '@/features/home/_components/info-card';
import { AlertCircle, DollarSign, Package, TrendingUp } from 'lucide-react';

export const SHIPMENT_DATA = [
  { day: 'Mon', shipments: 12 },
  { day: 'Tue', shipments: 19 },
  { day: 'Wed', shipments: 15 },
  { day: 'Thu', shipments: 22 },
  { day: 'Fri', shipments: 25 },
  { day: 'Sat', shipments: 18 },
  { day: 'Sun', shipments: 10 },
];

export const RECENT_ORDERS: RecentOrder[] = [
  { id: '1234', date: '2023-06-01', status: 'Delivered' },
  { id: '1235', date: '2023-06-02', status: 'In Transit' },
  { id: '1236', date: '2023-06-03', status: 'Shipped' },
  { id: '1237', date: '2023-06-04', status: 'Delayed' },
  { id: '1238', date: '2023-06-05', status: 'Delivered' },
];

export const DASHBOARD_CARDS: DashboardCardProps[] = [
  {
    title: 'Total Revenue',
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    mainInfo: '$45,231.89',
    secondaryInfo: '+20.1% from last month',
  },
  {
    title: 'Orders',
    icon: <Package className="h-4 w-4 text-muted-foreground" />,
    mainInfo: '+2,350',
    secondaryInfo: '+180.1% from last month',
  },
  {
    title: 'Average Order Value',
    icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    mainInfo: '$59.62',
    secondaryInfo: '+19.2% from last month',
  },
  {
    title: 'Low-Stock SKUs',
    icon: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
    mainInfo: '4 SKUs',
    secondaryInfo: '2 less than last week',
  },
];
