import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface InfoCardProps {
  id: number;
  title: string;
  icon: React.ReactElement;
  mainInfo: string;
  secondaryInfo: string;
}

export const InfoCard = ({ title, icon, mainInfo, secondaryInfo }: InfoCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{mainInfo}</div>
        <p className="text-xs text-muted-foreground">{secondaryInfo}</p>
      </CardContent>
    </Card>
  );
};
