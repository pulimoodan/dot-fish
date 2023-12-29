import { Category } from "../Categories/Category";

export interface Product {
  id: string;
  name: string;
  purchase: number;
  sale: string;
  cleaning: boolean;
  category: Category;
}
