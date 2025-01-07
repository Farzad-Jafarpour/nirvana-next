"use client";
import { useMenuItems } from "@/hooks/useMenuItems";
import FoodList from "./_components/FoodList";
import { SectionType } from "@/types/section";
import useMenuStore from "../../stores/menuStore";
import Loading from "@/app/components/Loading";
import { useSearchParams } from "next/navigation";

const Menu = ({ params }: { params: { category: string } }) => {
  const searchParams = useSearchParams(); // Access query parameters
  const category = searchParams.get("food");
  const { data = [], error, isLoading } = useMenuItems(); // Ensure `data` has a default value

  const getFilteredItems = (category: string | null, data: SectionType[]) => {
    if (!data || data.length === 0) return [];
    if (!category || category === "منوی کلی") return data; // Return all items for "منوی کلی" or no category
    return data.filter((section) => section.category === category);
  };

  // Get filtered items
  const foodItems = getFilteredItems(category, data);

  if (isLoading) {
    return <Loading />; // Display loading state
  }

  if (error) {
    return <p>Error loading items.</p>; // Display error state
  }
  return <FoodList sections={foodItems} />;
};

export default Menu;
