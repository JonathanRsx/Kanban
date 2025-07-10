import Item from "./Item";
import React, { useState } from "react";
import DropIndicator from "./DropIndicator";
import type { CardProps } from "@/model/card";
import { cn } from "@/lib/utils";
import { AddItem } from "./AddItem";
import { EditColumn } from "./EditColumn";
export default function Column({
  column,
  cards,
  onDrop,
}: {
  column: string;
  cards: CardProps[];
  onDrop: (column: string, index: number) => void;
}) {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
  };

  return (
    <div
      className={cn(
        "shrink-0 bg-secondary w-80 rounded-2xl flex flex-col",
        active && "bg-violet-100"
      )}
    >
      <div className="flex p-4 pb-2 items-center gap-2">
        <h3 className="flex-1 text-left font-medium">{column}</h3>
        <span>{cards.length}</span>
        <EditColumn column={column}/>
      </div>
      <div
        className="flex flex-col gap-0.5 overflow-y-auto p-4 pt-0 flex-auto transition-colors overflow-x-hidden w-full"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
      >
        <DropIndicator onDrop={() => onDrop(column, 0)} />
        {cards.map((card, index) => (
          <React.Fragment key={card.id}>
            <Item card={card} column={column} />
            <DropIndicator onDrop={() => onDrop(column, index + 1)} />
          </React.Fragment>
        ))}
        <AddItem type="Add" column={column} />
      </div>
    </div>
  );
}
