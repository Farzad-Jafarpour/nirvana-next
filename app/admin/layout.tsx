"use client";
import { Box } from "@chakra-ui/react";
import React from "react";
import AdminNavbar from "./_components/AdminNavbar";
import Navbar from "../menu/[category]/Navbar/Navbar";

const styles = {
  container: {
    position: "fixed",
    right: "0",
    left: "0",
    zIndex: "1000",
  },
  content: {
    position: "absolute",
    top: "82px",
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: RootLayoutProps) => {
  return (
    <Box>
      <Box sx={styles.container}>
        <Navbar />
      </Box>
      <Box sx={styles.content} dir="rtl">
        {children}
      </Box>
    </Box>
  );
};

export default layout;
