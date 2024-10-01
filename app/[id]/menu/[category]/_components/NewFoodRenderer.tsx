import { useMenuItems } from "@/hooks/useSections";
import FoodSection from "./FoodSection";
import Loading from "@/app/components/Loading";

const NewFoodRenderer = () => {
  const { data, error, isLoading } = useMenuItems();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  // Flatten the list of food items and filter for those with isNew: true
  const newFoods = data.flatMap((category) =>
    category.menuItems?.filter((food) => food.isNew)
  );

  return (
    <FoodSection
      id="0"
      title="غذاهای جدید"
      foods={newFoods}
      category="غذاهای جدید"
    />
  );
};

export default NewFoodRenderer;
