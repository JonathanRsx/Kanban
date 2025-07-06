import { cn } from "@/lib/utils";
import { useState } from "react";

type DropAreaProps = {
  onDrop: () => void;
};

export default function DropIndicator({ onDrop }: DropAreaProps) {
  const [isVisible, setIsVisible] = useState(false);

  const showArea = () => {
    setIsVisible(true);
  };

  const hideArea = () => {
    setIsVisible(false);
  };

  return (
    <div
      onDragEnter={showArea}
      onDragLeave={hideArea}
      onDrop={() => {
        onDrop();
        hideArea()
      }}
      onDragOver={(e)=>{
        e.preventDefault();

      }}
      className={cn(
         "relative min-h-2 transition-[padding,opacity] before:absolute before:inset-2 before:rounded-xl before:border-2 before:border-dashed before:border-violet-500 before:bg-violet-200 only:h-32",
        isVisible ? "py-8 opacity-100" : "opacity-0"
      )}
    />
  );
}
