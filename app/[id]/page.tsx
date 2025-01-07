"use client";
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  ItemRenderer,
  AnimatedLogo,
  ToastRenderer,
} from "../components/common";
import Navbar from "../components/Navbar";
import { BaseUrl } from "@/assets/constants";

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
    minWidth: "200px",
    minHeight: "200px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(255, 255, 255)",
    textDecoration: "none",
  },
};

const Table = ({ params }: { params: { id: string } }) => {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2000); // Show toast for 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <>
      <Navbar />

      <Flex sx={styles.container}>
        <Flex sx={styles.itemContainer}>
          <ItemRenderer
            item="رزرو و شرایط رزرو"
            path="/reservation"
            styling={styles.content}
          />
          <ItemRenderer
            item="منو"
            path={`${params.id}/menuitems`}
            styling={styles.content}
          />
        </Flex>

        {/* Flex Container for Main and Aside */}
        <Flex sx={styles.itemContainer}>
          <ItemRenderer
            item="سوالات پر تکرار"
            path="/faq"
            styling={styles.content}
          />
          <ItemRenderer
            item="تماس با ما"
            path="/contact"
            styling={styles.content}
          />
        </Flex>

        <AnimatedLogo />

        {showToast && <ToastRenderer content="به نیروانا خوش آمدید" />}
      </Flex>
    </>
  );
};

export default Table;
