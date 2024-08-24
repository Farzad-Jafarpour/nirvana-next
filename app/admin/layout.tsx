"use client";
import { Box } from "@chakra-ui/react";
import React from "react";
import AdminNavbar from "./_components/AdminNavbar";

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
    overflow: "hidden",
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
        <AdminNavbar />
      </Box>
      <Box sx={styles.content} dir="rtl">
        {children}
      </Box>
    </Box>
  );
};

export default layout;
