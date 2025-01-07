import React from "react";
import { Box } from "@chakra-ui/react";
import Food from "./food/Food";
import { MenuItemType } from "@/types/menu";

interface FoodSectionProps {
  id: string;
  title?: string;
  foods: MenuItemType[];
  category: string;
}
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

const FoodSection: React.FC<FoodSectionProps> = ({
  id,
  title = "پیش غذا",
  foods,
  category,
}) => {
  if (foods.length === 0) return null;
  return (
    <Box id={id} sx={styles.container}>
      <Box sx={styles.sectionTitle}>
        <Box sx={styles.separator}></Box>
        <Box as="h2" sx={styles.titleBox}>
          <Box as="span" sx={styles.titleText}>
            |
          </Box>
          {title}
          <Box as="span" sx={styles.titleText}>
            |
          </Box>
        </Box>
      </Box>

      {foods?.map((item: MenuItemType, index: number) => (
        <Food
          key={index}
          title={item?.title}
          price={item?.price}
          src={item?.src}
          details={item?.details || ""}
          hasExtra={item?.hasExtra}
          category={category}
          id={item?.id}
          isNew={item?.isNew}
          isLarge={item?.isLarge}
          isAvailable={item?.isAvailable}
          isTax={item?.isTax}
        />
      ))}
    </Box>
  );
};

export default FoodSection;
