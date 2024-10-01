import useFoodStore from "@/app/stores/foodStore";
import { colorPalette } from "@/assets/constants";
import { ExtraType } from "@/types/extra";
import { Box, Button, Center, Spacer, Text } from "@chakra-ui/react";

const styles = {
  container: {
    py: "5px",
    width: "100%",
  },
  content: {
    items: "center",
    justify: "center",
    flexDirection: "row",
    width: "100%",
    height: "120px",
    marginY: "5px",
    borderRadius: "5px",
    bg: colorPalette.third,
  },

  items: {
    items: "center",
    justify: "center",
    padding: "5px",
  },
  btn: {
    margin: "10px",
    background: colorPalette.nav,
    color: "#000000",
    colorScheme: colorPalette.third,
    borderRadius: "5px",
  },
};

const ExtraItemRenderer: React.FC<ExtraType> = ({
  id,
  title,
  category,
  price,
  foodId = 0,
}) => {
  const foods = useFoodStore((state) => state.foods);
  const addExtraItem = useFoodStore((state) => state.addExtraItem);
  const removeExtraItem = useFoodStore((state) => state.removeExtraItem);

  const existingFoodIndex = foods.findIndex((f) => f.id === foodId);
  const existingExtraItemIndex =
    existingFoodIndex !== -1 && foods[existingFoodIndex].extraItems
      ? foods[existingFoodIndex].extraItems!.findIndex((eI) => eI.id === id)
      : -1;

  const handleAddFood = () => {
    const food = {
      id,
      title,
      price,
      category,
      count: 1,
      foodId,
    };
    addExtraItem(food, foodId);
  };

  const handleRemove = (id: number, foodId: number | null) => {
    removeExtraItem(id, foodId);
  };

  const extraItemCount =
    existingFoodIndex !== -1 && existingExtraItemIndex !== -1
      ? foods[existingFoodIndex].extraItems![existingExtraItemIndex].count
      : 0;

  return (
    <Box sx={styles.container} key={id} dir="rtl">
      <Center sx={styles.content}>
        <Center sx={styles.items}>{title}</Center>
        <Center sx={styles.items}>:</Center>
        <Center sx={styles.items}>
          {price}
          <Text fontSize="sm">هزار تومان</Text>
        </Center>
        <Spacer />
        <Center>
          {existingFoodIndex !== -1 && existingExtraItemIndex !== -1 && (
            <Center>
              <Button size="xs" sx={styles.btn} onClick={handleAddFood}>
                <Text fontSize="3xl" lineHeight="1">
                  +
                </Text>
              </Button>
              <Text fontSize="3xl" lineHeight="1">
                {extraItemCount}
              </Text>
              <Button
                size="xs"
                sx={styles.btn}
                onClick={() => handleRemove(id, foodId!)}
              >
                <Text fontSize="3xl" lineHeight="1">
                  -
                </Text>
              </Button>
            </Center>
          )}
          {existingExtraItemIndex === -1 && (
            <Button size="xs" sx={styles.btn} onClick={handleAddFood}>
              <Text fontSize="3xl" lineHeight="1">
                +
              </Text>
            </Button>
          )}
        </Center>
      </Center>
    </Box>
  );
};

export default ExtraItemRenderer;
