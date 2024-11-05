import { ExtraItemType } from "./extra";

export interface Food {
  id: number;
  title: string;
  price: number;
  details?: string;
  src: string;
  hasExtra: boolean;
  isNew: boolean;
  isLarge: boolean;
}

export interface FoodProps {
  id: number;
  title: string;
  price: number;
  details?: string;
  src: string;
  hasExtra: boolean;
  category: string;
  isNew?: boolean;
  isLarge?: boolean;
  isAvailable: boolean;
  isTax: boolean;
  extraItems?: ExtraItemType[];
}

export interface DataListProps {
  sections: {
    id: number;
    title: string;
    icon?: string;
    list: Food[];
    category: string;
  }[];
}

export interface FoodListData {
  id: number;
  title: string;
  icon?: string;
  list: Food[];
  category: string;
}
export interface CartItem {
  id: number;
  title: string;
  price: number;
  count: number;
  isTax: boolean;
  extraItems?: ExtraItemsList[];
}
export interface FoodStore {
  foods: CartItem[];
  addFood: (food: CartItem) => void;
  removeFood: (id: number) => void;
  clearCart: () => void;
  foodCartPrice: (foods: CartItem[]) => number;
  addExtraItem: (extraItem: ExtraItemsList, foodId: number | null) => void;
  removeExtraItem: (id: number, foodId: number | null) => void;
}

export interface FoodListStore {
  foodData: {
    id: string;
    title: string;
    icon?: string;
    list: any[];
    category: string;
  }[];

  exraItems: {
    id: string;
    title: string;
    price: number;
    category: string;
    foodId: string;
  }[];

  faq: {
    question: string;
    content: string;
  }[];

  reserveData: {
    question: string;
    content: string;
  }[];
}
export interface ExtraItemsProps {
  categoryTitle: string;
  foodId: number | null;
  extraItems?: ExtraItemType[];
}

export interface ExtraItemsList {
  id: number;
  title: string;
  price: number;
  category: string;
  count?: number;
  foodId: number | null;
}

export interface ExtraItemsData {
  data: ExtraItemsList[];
}

export interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  CustomComponent: React.ComponentType<any>;
  details?: string;
}
