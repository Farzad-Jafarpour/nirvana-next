import { colorPalette } from "@/assets/constants";
import prisma from "@/lib/prisma";
import { Box } from "@chakra-ui/react";
import { notFound } from "next/navigation";
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
};

const EditExtraItem = async ({ params }: { params: { id: string } }) => {
  const extraObj = await prisma.extraItem.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!extraObj) notFound();

  return (
    <Box sx={styles.container}>
      <ExtraForm extra={extraObj} />
    </Box>
  );
};

export default EditExtraItem;
