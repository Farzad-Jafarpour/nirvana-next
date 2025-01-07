import { colorPalette } from "@/assets/constants";
import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const pill = definePartsStyle({
  field: {
    background: colorPalette.third,
  },
});

export const fileInputTheme = defineMultiStyleConfig({
  variants: { pill },
});
