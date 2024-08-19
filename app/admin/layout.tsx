"use client";
import { Box } from "@chakra-ui/react";
import { colorPalette } from "@/assets/constants";
import SideBar from "./_components/SideBar";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    height: "100vh",
  },
  sidebar: {
    display: "flex",
    width: "250px",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  content: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#030303",
    padding: "20px",
    bg: colorPalette.__svgFill,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: RootLayoutProps) => {
  return (
    <Box sx={styles.container} dir="rtl">
      <Box sx={styles.sidebar}>
        <SideBar />
      </Box>
      <Box w="100%" px="1%">
        {children}
      </Box>
    </Box>
  );
};

export default layout;
