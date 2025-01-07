import { CartItem, ExtraItemsList, FoodStore } from "@/types/types";
import { create } from "zustand";

const useFoodStore = create<FoodStore>((set) => ({
  foods: [],
  addFood: (food: CartItem) =>
    set((state: FoodStore) => {
      const existingFoodIndex = state.foods.findIndex((f) => f.id === food.id);
      if (existingFoodIndex !== -1) {
        const updatedFoods = [...state.foods];
        updatedFoods[existingFoodIndex].count += 1;
        return {
          foods: updatedFoods,
        };
      } else {
        return { foods: [...state.foods, { ...food, count: 1 }] };
      }
    }),
  removeFood: (id: number) =>
    set((state: FoodStore) => ({
      foods: state.foods
        .map((food) =>
          food.id === id && food.count >= 1
            ? { ...food, count: food.count - 1 }
            : food
        )
        .filter((food) => food.id !== id || food.count > 0),
    })),
  clearCart: () =>
    set(() => ({
      foods: [],
    })),

  foodCartPrice: (foods: CartItem[]) => {
    return foods.reduce((total, food) => {
      let foodTotal = food.price * food.count;
      let extraItemsTotal = food.extraItems
        ? food.extraItems.reduce(
            (extraTotal, extraItem) =>
              extraTotal + extraItem.price * (extraItem.count || 1),
            0
          )
        : 0;
      if (food.isTax) {
        return total + foodTotal * 1.1 + extraItemsTotal * 1.1;
      } else {
        return total + foodTotal + extraItemsTotal;
      }
    }, 0);
  },

  addExtraItem: (extraItem: ExtraItemsList, foodId: number | null) =>
    set((state: FoodStore) => {
      if (foodId === null) return state;

      const updatedFoods = state.foods.map((food) => {
        if (food.id === foodId) {
          const existingExtraIndex = food.extraItems?.findIndex(
            (item) => item.id === extraItem.id
          );

          if (existingExtraIndex !== undefined && existingExtraIndex !== -1) {
            const updatedExtraItems = [...food.extraItems!];
            updatedExtraItems[existingExtraIndex].count =
              (updatedExtraItems[existingExtraIndex].count || 0) + 1;

            return {
              ...food,
              extraItems: updatedExtraItems,
            };
          } else {
            const updatedExtraItems = food.extraItems
              ? [...food.extraItems, { ...extraItem, count: 1 }]
              : [{ ...extraItem, count: 1 }];

            return {
              ...food,
              extraItems: updatedExtraItems,
            };
          }
        }
        return food;
      });

      return {
        foods: updatedFoods,
      };
    }),

  removeExtraItem: (id: number, foodId: number | null) =>
    set((state: FoodStore) => {
      if (foodId === null) return state;

      const updatedFoods = state.foods.map((food) => {
        if (food.id === foodId) {
          const existingExtraIndex = food.extraItems?.findIndex(
            (item) => item.id === id
          );

          if (existingExtraIndex !== undefined && existingExtraIndex !== -1) {
            const updatedExtraItems = [...food.extraItems!];
            const currentCount =
              updatedExtraItems[existingExtraIndex].count || 0;

            if (currentCount > 1) {
              updatedExtraItems[existingExtraIndex].count = currentCount - 1;
            } else {
              updatedExtraItems.splice(existingExtraIndex, 1);
            }

            return {
              ...food,
              extraItems: updatedExtraItems,
            };
          }
        }
        return food;
      });

      return {
        foods: updatedFoods,
      };
    }),
}));

export default useFoodStore;
