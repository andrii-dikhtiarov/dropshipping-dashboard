import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Inventory } from '@/types/inventory';

export interface ActionsProps {
  item: Inventory;
  reorderItem: Inventory | null;
  setReorderItem: (item: Inventory) => void;
  thresholdItem: Inventory | null;
  setThresholdItem: (thresholdItem: Inventory) => void;
  newThreshold: number | string;
  handleThresholdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleThresholdSubmit: () => void;
}

export const Actions = ({
  item,
  reorderItem,
  thresholdItem,
  newThreshold,
  handleThresholdChange,
  setThresholdItem,
  setReorderItem,
  handleThresholdSubmit,
}: ActionsProps) => {
  return (
    <div className="flex space-x-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" onClick={() => setReorderItem(item)}>
            Reorder
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reorder {reorderItem?.name}</DialogTitle>
            <DialogDescription>
              Enter the quantity you want to reorder for this product.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reorder-quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="reorder-quantity"
                type="number"
                className="col-span-3"
                defaultValue={reorderItem?.threshold}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit Reorder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" onClick={() => setThresholdItem(item)}>
            Set Threshold
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Low Stock Threshold for {thresholdItem?.name}</DialogTitle>
            <DialogDescription>
              Enter the new low stock threshold for this product.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="threshold" className="text-right">
                Threshold
              </Label>
              <Input
                id="threshold"
                type="number"
                className="col-span-3"
                value={newThreshold}
                onChange={handleThresholdChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" onClick={handleThresholdSubmit}>
              Set Threshold
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
