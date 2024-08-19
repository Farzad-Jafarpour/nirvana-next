import React from "react";
import FoodForm from "../_components/FoodForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

const EditFood = async ({ params }: { params: { id: string } }) => {
  const food = await prisma.menuItem.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!food) notFound();

  return <FoodForm food={food} />;
};

export default EditFood;
