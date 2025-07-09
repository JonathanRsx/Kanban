import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useBoardStore } from "@/board-store";
import { useState } from "react";

export function ShareLink() {
  const [open, setIsOpen] = useState(false);

  const data = useBoardStore.getState().columnsData;
  const link = `${window.location.protocol}//${window.location.host}?d=`+ encodeURI(JSON.stringify(data));

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Share link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Copy and share your link with anyone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 max-w-full overflow-hidden">
          <Label htmlFor="title">Title</Label>
          <div className="overflow-x-auto pb-1">
            <p className="whitespace-nowrap">{link}</p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(link);
            }}
          >
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
