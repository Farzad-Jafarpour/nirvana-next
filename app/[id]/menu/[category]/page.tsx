"use client";
import { useMenuItems } from "@/hooks/useMenuItems";
import FoodList from "./_components/FoodList";
import { SectionType } from "@/types/section";
import Loading from "@/app/components/Loading";

const Menu = ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const { data, error, isLoading } = useMenuItems();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  let foodItems: SectionType[] = [];
  switch (category) {
    case "breakfast":
      foodItems = data!.filter((section) => section.category === "breakfast");
      break;
    case "food":
      foodItems = data!.filter((section) => section.category === "food");
      break;
    case "cold":
      foodItems = data!.filter((section) => section.category === "cold");
      break;
    case "hot":
      foodItems = data!.filter((section) => section.category === "hot");
      break;
    default:
      foodItems = data!;
  }

  return <FoodList sections={foodItems} />;
};

export default Menu;
