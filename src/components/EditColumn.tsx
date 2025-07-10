import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";
import { DeleteItem } from "./DeleteItem";
import { AddColumn } from "./AddColumn";

export function EditColumn({column}:{column: string}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0 w-8">
          <Ellipsis />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 flex flex-col gap-1 p-2">
        <AddColumn type="edit" current={column}/>
        <DeleteItem column={column} type="column"/>
      </PopoverContent>
    </Popover>
  );
}
