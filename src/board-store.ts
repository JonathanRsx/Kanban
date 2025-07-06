import { create } from "zustand";
import type { ColumnProps } from "./model/column";
import JSONData from "@/data/kanban.json";
import type { CardProps } from "./model/card";
import { moveCardToColumn } from "./lib/utils";

type BoardStore = {
  draggingCard: string | null;
  setDraggingCard: (cardId: string | null) => void;
  columnsData: ColumnProps;
  addTask: (column: string, card: CardProps) => void;
  moveCard: (
    cards: ColumnProps,
    cardId: string,
    column: string,
    index: number
  ) => void;
};

const defaultData: ColumnProps = {
  "To Do": [],
  "In Progress": [],
  "Done": []
};

const getInitialData =  (): ColumnProps => {
  try {
    // Tenter de récupérer les données du localStorage
    const storedData = localStorage.getItem('kanban');
    
    // Si des données existent, les retourner, sinon utiliser les données par défaut
    return storedData ? JSON.parse(storedData) : defaultData;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return defaultData;
  }
};

export const useBoardStore = create<BoardStore>((set) => ({
  draggingCard: null,
  columnsData: getInitialData(),
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

      localStorage.setItem('board', JSON.stringify(newState))
      return newState;
    }),

  moveCard: (
    cards: ColumnProps,
    cardId: string,
    column: string,
    index: number
  ) =>
    set(() => {
      const newState = {
        columnsData: moveCardToColumn({
          cards,
          cardId,
          column,
          index,
        }),
      };
      localStorage.setItem('board', JSON.stringify(newState))
      return newState;
    }),
}));
