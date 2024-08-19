"use client";
import { colorPalette } from "@/assets/constants";
import { useMenuItems } from "@/hooks/useSections";
import { axiosInstance } from "@/services/apiClient";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FoodForm from "../_components/FoodForm";

const styles = {
  container: {
    w: "100%",
    p: "5px",
    bg: colorPalette.primary,
    borderRadius: "5px",
    boxShadow: "md",
    color: "black",
  },
};

const NewFood = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
  }, [router]);

  return (
    <Box sx={styles.container}>
      <FoodForm />
    </Box>
  );
};

export default NewFood;
