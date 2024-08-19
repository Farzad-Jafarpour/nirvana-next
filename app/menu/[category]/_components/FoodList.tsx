import React from "react";
import { Box } from "@chakra-ui/react";
import NewFoodRenderer from "./NewFoodRenderer";
import FoodSection from "./FoodSection";
import { SectionType } from "@/types/section";
import Navbar from "@/app/components/Navbar";

const widthBreakpoints = {
  base: "96vw",
  md: "750px",
  lg: "970px",
  xl: "1170px",
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "15px",
  },
};

interface FoodListProps {
  sections: SectionType[];
}

const FoodList: React.FC<FoodListProps> = ({ sections }) => {
  //   const theme = extendTheme({ widthBreakpoints });

  return (
    <>
      <Box sx={styles.container}>
        <NewFoodRenderer />
        {sections.map((section, id) => (
          <FoodSection
            key={id}
            id={`${section.id}`}
            title={section.title}
            foods={section.menuItems}
            category={section.category}
          />
        ))}
      </Box>
    </>
  );
};

export default FoodList;
