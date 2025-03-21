"use client";
import React, { useEffect } from "react";
import { Center } from "@chakra-ui/react";
import { ExtraItemsProps } from "@/types/types";
import ExtraItemRenderer from "./ExtraItemRenderer";
import { useExtraMenuItems } from "@/hooks/useExtraMenuItems";
import { ExtraItemType, ExtraType } from "@/types/extra";
import Loading from "@/app/components/Loading";
// import sectionData from "data/foodSections.json";

const styles = {
  container: {
    flexDirection: "column",
    width: "100%",
    borderRadius: "5px",
    padding: "5px",
  },
};

const ExtraItems: React.FC<ExtraItemsProps> = ({
  categoryTitle,
  foodId,
  extraItems,
}) => {
  const { data, error, isLoading } = useExtraMenuItems();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const items = extraItems!.filter((item) => item.isEnable === true);

  return (
    <Center sx={styles.container}>
      {items.map((item: ExtraType) => (
        <ExtraItemRenderer
          foodId={foodId!}
          id={item.id}
          count={item.count}
          category={item.category}
          price={item.price}
          key={item.id}
          title={item.title}
        />
      ))}
    </Center>
  );
};

export default ExtraItems;
