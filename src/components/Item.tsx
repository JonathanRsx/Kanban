import { useRef } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import type { CardProps } from "@/model/card";
import { motion } from "motion/react";
import { useBoardStore } from "@/board-store";
import { AddItem } from "./AddItem";
import { DeleteItem } from "./DeleteItem";

export default function Item({
  column,
  card,
}: {
  column: string;
  card: CardProps;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const setDraggingCard = useBoardStore((state) => state.setDraggingCard);

  const handleDragStart = () => {
    // Définir les données de transfert
    setDraggingCard(card.id.toLocaleString());
  };

  return (
    <motion.div
      ref={cardRef}
      id={card.id.toLocaleString()}
      layout
      layoutId={card.id.toLocaleString()}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={() => setDraggingCard(null)}
      className="cursor-grab active:cursor-grabbing active:animate-pulse gap-2 flex flex-col group relative"
    >
      <Card className="gap-0 text-left text-color">
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out top-2 right-2 text-muted-foreground gap-1">
          <AddItem type="Edit" column={column} {...card} />
          <DeleteItem cardId={card.id} column={column}/>
        </div>
        <CardHeader>{card.title}</CardHeader>
        <CardContent className="text-muted-foreground">
          {card.description}
        </CardContent>
      </Card>
    </motion.div>
  );
}
