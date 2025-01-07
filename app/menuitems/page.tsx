"use client";
import { Box, Flex } from "@chakra-ui/react";
import { AnimatedLogo, ItemRenderer } from "../components/common";
import { BaseUrl } from "@/assets/constants";
import Navbar from "@/app/components/Navbar";

import React from "react";

const url = BaseUrl + "land.webp";

const styles = {
  container: {
    grow: 1,
    flexDirection: "column",
    alignItems: "center",
    height: "calc(100vh - 74px)",
    bgImage: url,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
  },
  itemContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  content: {
    background: "#000000",
    opacity: 0.65,
    display: "flex",
    flexDirection: "row",
    flexGrow: 1, // Allows the div to grow inside the parent
    margin: "2px",
    borderRadius: "5px",
    width: "100%", // Stretches to the parent's width
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(255, 255, 255)",
    textDecoration: "none",
  },
};

const MenuItems: React.FC = () => {
  return (
    <>
      <Navbar />

      <Flex sx={styles.container}>
        <Flex sx={styles.itemContainer}>
          <Box sx={styles.content}>
            <ItemRenderer
              item="تمام آیتم ها"
              path="menu/menuitems"
              styling={styles.content}
            />
          </Box>
          <Box sx={styles.content}>
            <ItemRenderer
              item="نوشیدنی های گرم"
              path="/menu/hot"
              styling={styles.content}
            />
          </Box>
          <Box sx={styles.content}>
            <ItemRenderer
              item="صبحانه"
              path="/menu/breakfast"
              styling={styles.content}
            />
          </Box>
          <Box sx={styles.content}>
            <ItemRenderer
              item="بار سرد"
              path="/menu/cold"
              styling={styles.content}
            />
          </Box>
          <Box sx={styles.content}>
            <ItemRenderer
              item="غذا و پیش غذا"
              path="/menu/food"
              styling={styles.content}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default MenuItems;
