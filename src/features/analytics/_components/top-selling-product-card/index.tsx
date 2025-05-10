import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopProduct } from '@/types/sale';

export interface TopSellingProductCardProps {
  title: string;
  data: TopProduct[];
}

export const TopSellingProductCard = ({ title, data }: TopSellingProductCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {data.map((product) => (
            <li key={product.id} className="flex items-center justify-between">
              <span>{product.name}</span>
              <span>{product.sales} units</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
