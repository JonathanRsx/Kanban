import { create } from "zustand";
import type { ColumnProps } from "./model/column";
import JSONData from "@/data/kanban.json";

type BoardStore = {
  draggingCard: string | null;
  columnsData: ColumnProps


  setDraggingCard: (cardId: string | null) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  draggingCard: null,
  columnsData: JSONData.columns,
  setDraggingCard: (cardId: string | null) => set({ draggingCard: cardId }),
}));