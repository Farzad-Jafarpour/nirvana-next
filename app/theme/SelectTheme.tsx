import { colorPalette } from "@/assets/constants";
import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    background: colorPalette.third,
  },
  icon: {
    left: "10px",
    right: "auto",
  },
});

export const selectTheme = defineMultiStyleConfig({ baseStyle });
