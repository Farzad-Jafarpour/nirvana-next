import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CategoryForm from "./form";

const UpdateCategory = async ({ params }: { params: { id: string } }) => {
  const section = await prisma.section.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!section) notFound();

  return <CategoryForm section={section} />;
};

export default UpdateCategory;
