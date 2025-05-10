import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface InfoCardProps {
  title: string;
  mainInfo: string;
  secondaryInfo: string;
}

export const InfoCard = ({ title, mainInfo, secondaryInfo }: InfoCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{mainInfo}</div>
        <p className="text-xs text-muted-foreground">{secondaryInfo}</p>
      </CardContent>
    </Card>
  );
};
