"use client";
import { ItemRenderer, AnimatedLogo } from "@/app/components/common";
import Navbar from "@/app/components/Navbar";
import { BaseUrl } from "@/assets/constants";
import { Flex } from "@chakra-ui/react";
import React from "react";

const url = BaseUrl + "land.webp";

const styles = {
  container: {
    position: "relative",
    grow: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 74px)",
    bgImage: url,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    background: "#000000",
    opacity: 0.5,
    display: "flex",
    margin: "2px",
    borderRadius: "5px",
    minWidth: "180px",
    minHeight: "200px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(255, 255, 255)",
    textDecoration: "none",
  },
};

const MenuItems = () => {
  return (
    <>
      <Navbar />

      <Flex sx={styles.container}>
        <Flex sx={styles.itemContainer}>
          <ItemRenderer
            item="نوشیدنی های گرم"
            path={`menu/hot`}
            styling={styles.content}
          />
          <ItemRenderer
            item="صبحانه"
            path={`menu/breakfast`}
            styling={styles.content}
          />
        </Flex>

        <Flex sx={styles.itemContainer}>
          <ItemRenderer
            item="بار سرد"
            path={`menu/cold`}
            styling={styles.content}
          />
          <ItemRenderer
            item="غذا و پیش غذا"
            path={`menu/food`}
            styling={styles.content}
          />
        </Flex>

        <AnimatedLogo />
      </Flex>
    </>
  );
};

export default MenuItems;
