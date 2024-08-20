"use client";

import { colorPalette } from "@/assets/constants";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Slider from "../Slider";

const Categories: React.FC = () => {
  const [show, setShow] = useState(false);

  const breakpoints = {
    base: "100vw",
    md: "750px",
    lg: "970px",
    xl: "1170px",
  };
  const styles = {
    container: {
      background: colorPalette.nav,
      color: "#000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginTop: "5px",
    },

    spans: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#000",
      background: colorPalette.nav,
      borderRadius: "5px",
      padding: "5px",
      margin: "5px",
      fontSize: "xl",
    },
    sliderContainer: {
      color: "#000",
      width: breakpoints,
      overflowX: "visible",
    },
  };
  return (
    <>
      <Box sx={styles.container}>
        <Box
          as="button"
          sx={styles.spans}
          width={240}
          onClick={() => {
            setShow(!show);
          }}
        >
          <Text as="h2">همه دسته‌بندیها در یک نگاه</Text>
          {show ? (
            <ChevronUpIcon color="#000" />
          ) : (
            <ChevronDownIcon color="#000" />
          )}
        </Box>
        <Box sx={styles.sliderContainer}>{show && <Slider />}</Box>
      </Box>
    </>
  );
};

export default Categories;
