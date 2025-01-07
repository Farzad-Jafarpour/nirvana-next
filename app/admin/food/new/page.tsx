"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FoodForm from "../_components/FoodForm";

const NewFood = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/api/auth/login");
  }, [router]);

  return <FoodForm />;
};

export default NewFood;
