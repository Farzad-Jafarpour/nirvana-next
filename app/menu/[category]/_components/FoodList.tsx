import { SectionType } from "@/types/section";
import { Box, Text } from "@chakra-ui/react"; // Import Text from Chakra UI
import React from "react";
import FoodSection from "./FoodSection";
import NewFoodRenderer from "./NewFoodRenderer";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "15px",
  },
  messageContainer: { height: "100vh" },
  message: {
    color: "teal", // Set the text color to match your theme
    textAlign: "center", // Center the text
    fontSize: "xl", // Set the font size
    marginTop: "20px", // Add some margin
  },
};

interface FoodListProps {
  sections: SectionType[];
}

const FoodList: React.FC<FoodListProps> = ({ sections }) => {
  // Check if any FoodSection has foods
  const hasFoodSections = sections.some(
    (section) => section.menuItems.length > 0
  );

  return (
    <Box sx={styles.container}>
      <NewFoodRenderer />
      {!hasFoodSections ? (
        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="90vh" // Full height to center content
          textAlign="center"
        >
          <Text sx={styles.message}>
            نیروانایی عزیز در حال به روز رسانی منو هستیم. به زودی غذاهای خوشمزه
            نیروانا به منو اضافه میشن
          </Text>
        </Box>
      ) : (
        sections.map((section, id) => (
          <FoodSection
            key={id}
            id={`${section.id}`}
            title={section.title}
            foods={section.menuItems}
            category={section.category}
          />
        ))
      )}
    </Box>
  );
};

export default FoodList;
