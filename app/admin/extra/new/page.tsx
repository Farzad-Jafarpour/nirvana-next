"use client";
import { colorPalette } from "@/assets/constants";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ExtraForm from "../_components/ExtraForm";

const styles = {
  container: {
    w: "100%",
    p: "5px",
    bg: colorPalette.primary,
    borderRadius: "5px",
    boxShadow: "md",
    color: "black",
  },
  labels: {
    margin: "5px",
  },
  inputs: {
    bg: colorPalette.third,
    "&::placeholder": {
      opacity: 1,
      color: "black",
    },
  },
  fileInput: {
    display: "none",
  },
  fileInputLabel: {
    display: "inline-block",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
  selectOptions: {
    background: "#38B2AC",
  },
  itemContainer: {
    width: "100%",
  },
  item: {
    width: "100%",
    margin: "5px",
  },
};

const NewExtra = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/api/auth/login");
  }, [router]);

  return (
    <Box sx={styles.container}>
      <ExtraForm />
    </Box>
  );
};

export default NewExtra;
