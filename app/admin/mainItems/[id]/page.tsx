import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import MainItemForm from "../_components/form";

const UpdateMainItem = async ({ params }: { params: { id: string } }) => {
  const mainItem = await prisma.mainItem.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!mainItem) notFound();

  return <MainItemForm mainItem={mainItem} />;
};

export default UpdateMainItem;
