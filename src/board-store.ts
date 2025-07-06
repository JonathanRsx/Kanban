import { create } from "zustand";
import type { ColumnProps } from "./model/column";
import JSONData from "@/data/kanban.json";
import type { CardProps } from "./model/card";

type BoardStore = {
  draggingCard: string | null;
  setDraggingCard: (cardId: string | null) => void;
  columnsData: ColumnProps;
  addTask: (column: string, card: CardProps) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  draggingCard: null,
  columnsData: JSONData.columns,
  setDraggingCard: (cardId: string | null) => set({ draggingCard: cardId }),

  addTask: (columnId, card) =>
    set((state) => {
      // Vérifier que la colonne existe
      if (!state.columnsData[columnId]) {
        return state; // Retourner l'état inchangé si la colonne n'existe pas
      }

      // Créer une copie du tableau de cartes de la colonne et ajouter la nouvelle carte
      const updatedColumnCards = [...state.columnsData[columnId], card];

      // Retourner un nouvel état avec la colonne mise à jour
      const newState = {
        columnsData: {
          ...state.columnsData,
          [columnId]: updatedColumnCards,
        },
      };

      console.log(
        "Nouvel état:",
        JSON.stringify(newState.columnsData, null, 2)
      );
      return newState;
    }),
}));
