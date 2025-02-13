'use client';

import { InfoCard } from '@/features/analytics/_components/info-card';
import { SalesChartCard } from '@/features/analytics/_components/sales-chart-card';
import { TopSellingProductCard } from '@/features/analytics/_components/top-selling-product-card';
import { INFO_CARDS, SALES_DATA, TOP_PRODUCTS } from '@/features/analytics/_mocks';

export default function AnalyticsPageContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics and Reporting</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {INFO_CARDS.map((card) => (
          <InfoCard key={card.id} {...card} />
        ))}
      </div>

      <SalesChartCard title="Sales Over Time" data={SALES_DATA} />

      <TopSellingProductCard title="Top Selling Products" data={TOP_PRODUCTS} />
    </div>
  );
}
