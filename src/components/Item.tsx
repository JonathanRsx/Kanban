import { useRef } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import type { CardProps } from "@/model/card";
import { motion } from "motion/react";
import { useBoardStore } from "@/board-store";

export default function Item({ card }: { card: CardProps }) {
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
      className="cursor-grab active:cursor-grabbing active:animate-pulse gap-2 flex flex-col"
    >
      <Card className="gap-0 text-left">
        <CardHeader>{card.title}</CardHeader>
        <CardContent className="text-muted-foreground">
          {card.description}
        </CardContent>
      </Card>
    </motion.div>
  );
}
