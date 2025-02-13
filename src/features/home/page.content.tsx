'use client';

import { InfoCard } from '@/features/home/_components/info-card';
import { ShipmentsChartCard } from '@/features/home/_components/shipments-chart-card';
import { RecentOrdersTable } from '@/features/home/_components/recent-orders-table';
import { DASHBOARD_CARDS, RECENT_ORDERS, SHIPMENT_DATA } from '@/features/home/_mocks';
import { DashboardAlert } from '@/features/home/_components/dashboard-alert';

export function HomePageContent() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_CARDS.map((card) => (
          <InfoCard {...card} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <ShipmentsChartCard title="Shipments (Last 7 Days)" data={SHIPMENT_DATA} />
        <RecentOrdersTable title="Recent Orders" data={RECENT_ORDERS} />
      </div>

      <DashboardAlert
        title="Holiday Notice"
        description="Our warehouses will be closed on July 4th. Please plan your orders accordingly."
      />
    </div>
  );
}
