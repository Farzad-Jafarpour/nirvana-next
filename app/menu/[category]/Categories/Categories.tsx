"use client";

import { colorPalette } from "@/assets/constants";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Slider from "../Slider";
import { useParams } from "next/navigation";

const Categories: React.FC = () => {
  const [show, setShow] = useState(false);
  const params = useParams(); // Get dynamic params
  const category = params?.category;

  let pageCategory = "نیروانا";
  switch (category) {
    case "breakfast":
      pageCategory = "صبحانه";
      break;
    case "food":
      pageCategory = "غذا";
      break;
    case "cold":
      pageCategory = "بار سرد";
      break;
    case "hot":
      pageCategory = "بار گرم";
      break;
    default:
      pageCategory = "نیروانا";
  }

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
      fontSize: "md",
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
          <Text as="h2">دسته‌بندیهای {pageCategory} در یک نگاه</Text>
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
