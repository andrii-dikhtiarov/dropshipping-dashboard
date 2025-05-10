import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { useMemo } from 'react';
import { Select } from '../select';
import { STATUS_SELECT_OPTIONS } from '@/features/billing/_mocks';

export interface ActionsProps {
  filter: string;
  setFilter: (filter: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
  status: string;
  setStatus: (status: string) => void;
}

// TODO: can be refactored further more
export const Actions = ({
  filter,
  setFilter,
  dateRange,
  setDateRange,
  status,
  setStatus,
}: ActionsProps) => {
  const formattedDateRange = useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, 'LLL dd, y')} - ${format(dateRange.to, 'LLL dd, y')}`;
    }
    if (dateRange?.from && !dateRange?.to) {
      return format(dateRange.from, 'LLL dd, y');
    }
    return <span>Pick a date range</span>;
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      <Input
        placeholder="Search by Invoice Number"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !dateRange && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDateRange}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Select
        placeholder="Filter by Status"
        value={status}
        onValueChange={setStatus}
        options={STATUS_SELECT_OPTIONS}
      />
    </div>
  );
};
