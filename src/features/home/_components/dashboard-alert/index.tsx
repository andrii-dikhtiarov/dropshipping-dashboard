import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export interface DashboardAlertProps {
  title: string;
  description: string;
}

export const DashboardAlert = ({ title, description }: DashboardAlertProps) => {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
