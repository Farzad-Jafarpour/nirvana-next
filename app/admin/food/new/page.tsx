"use client";
import { colorPalette } from "@/assets/constants";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FoodForm from "../_components/FoodForm";



const NewFood = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
  }, [router]);

  return <FoodForm />;
};

export default NewFood;
