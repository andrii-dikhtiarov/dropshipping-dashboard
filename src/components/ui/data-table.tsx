'use client';

import { ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface TDataBase {
  id: string | number;
}

export interface Column<TData> {
  header: () => ReactNode | string;
  cell: (data: TData) => ReactNode | string;
  width?: number | string;
  truncate?: boolean;
  hidden?: boolean;
}

interface Props<TData extends TDataBase> {
  data: TData[];
  columns: Column<TData>[];
  rowHeight?: number;
  isLoading?: boolean;
  className?: string;
}

const defaultColumnWidth = 160;

export function DataTable<TData extends TDataBase>({
  columns,
  data,
  isLoading,
  rowHeight,
  className,
}: Props<TData>) {
  const visibleColumns = columns.filter(({ hidden }) => !hidden);

  return (
    <>
      <Table className={cn('table-fixed', className)}>
        {/* –––––––––––––––––––––– table header ––––––––––––––––––––––––*/}
        <TableHeader>
          <TableRow>
            {visibleColumns.map(({ header, truncate = true, width = defaultColumnWidth }, idx) => (
              <TableHead className={cn(truncate && 'truncate')} style={{ width }} key={idx}>
                header()
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {/* –––––––––––––––––––––– table body ––––––––––––––––––––––––*/}
        <TableBody>
          {isLoading && <TableSkeleton columns={visibleColumns} rowHeight={rowHeight} />}
          {!!data.length &&
            !isLoading &&
            data.map((rowData) => (
              <TableRow style={{ height: rowHeight }} key={rowData.id}>
                {visibleColumns.map(
                  ({ cell, truncate = true, width = defaultColumnWidth }, idx) => (
                    <TableCell
                      className={cn(truncate && 'truncate')}
                      style={{ width }}
                      key={`${rowData.id}-${idx}`}
                    >
                      {cell(rowData)}
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

function TableSkeleton<TData>({
  columns,
  rowHeight,
}: {
  columns: Column<TData>[];
  rowHeight?: number;
}) {
  return Array.from({ length: 10 }).map((_, idx) => (
    <TableRow style={{ height: rowHeight }} key={idx}>
      {columns.map(({ width = defaultColumnWidth }, idx) => {
        return (
          <TableCell key={idx} style={{ width }}>
            <div className="flex h-10 items-center">
              <Skeleton className="h-6 w-full rounded-md" />
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  ));
}
