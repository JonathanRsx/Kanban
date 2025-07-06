import type { CardProps } from "./card";

export interface ColumnProps {
  [columnName: string]: CardProps[];
}
