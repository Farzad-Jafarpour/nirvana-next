"use client";
import React, { useEffect } from "react";
import { Center } from "@chakra-ui/react";
import { ExtraItemsProps } from "@/types/types";
import ExtraItemRenderer from "./ExtraItemRenderer";
import { useExtraMenuItems } from "@/hooks/useSections";
import { ExtraType } from "@/types/extra";
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

const ExtraItems: React.FC<ExtraItemsProps> = ({ categoryTitle, foodId }) => {
  const { data, error, isLoading } = useExtraMenuItems();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const items: ExtraType[] = data!.filter(
    (item) => item.category === categoryTitle
  );

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
