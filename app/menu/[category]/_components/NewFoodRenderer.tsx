import Loading from "@/app/components/Loading";
import { useMenuItems } from "@/hooks/useSections";
import { MenuItemType } from "@/types/menu";
import { Box } from "@chakra-ui/react";
import Food from "./food/Food";

const NewFoodRenderer = () => {
  const { data, error, isLoading } = useMenuItems();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  // Flatten the list of food items and filter for those with isNew: true
  const newFoods = data.flatMap((category) =>
    category.menuItems
      ?.filter((food) => food.isNew)
      .map((food) => ({
        ...food,
        category: category.category,
      }))
  );

  if (newFoods.length === 0) return null;

  const styles = {
    container: {
      width: "100vw",
      padding: "5px",
      direction: "rtl",
      backgroundColor: "teal",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      flexWrap: "wrap",
    },
    sectionTitle: {
      width: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "10px",
    },
    separator: {
      backgroundColor: "black",
      width: "100%",
      height: "2px",
      marginY: "20px",
      zIndex: "0",
    },
    titleBox: {
      position: "absolute",
      zIndex: "1",
      backgroundColor: "teal",
      fontSize: "4xl",
      color: "white",
    },
    titleText: {
      display: "inline-block",
      marginX: "5px",
      fontSize: "4xl",
    },
  };

  return (
    <Box id={"newFood"} sx={styles.container}>
      <Box sx={styles.sectionTitle}>
        <Box sx={styles.separator}></Box>
        <Box as="h2" sx={styles.titleBox}>
          <Box as="span" sx={styles.titleText}>
            |
          </Box>
          {"محصولات جدید"}
          <Box as="span" sx={styles.titleText}>
            |
          </Box>
        </Box>
      </Box>

      {newFoods?.map(
        (item: MenuItemType & { category: string }, index: number) => (
          <Food
            key={index}
            title={item?.title}
            price={item?.price}
            src={item?.src}
            details={item?.details || ""}
            hasExtra={item?.hasExtra}
            category={item.category}
            id={item?.id}
            isNew={item?.isNew}
            isLarge={item?.isLarge}
            isAvailable={item.isAvailable}
            isTax={item.isTax}
          />
        )
      )}
    </Box>
  );
};

export default NewFoodRenderer;
