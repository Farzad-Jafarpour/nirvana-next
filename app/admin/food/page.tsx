"use client";
import { useAdminMenu } from "@/hooks/useSections";
import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Section from "./_components/Section";

const FoodList = () => {
  const { data } = useAdminMenu();
  console.log("data", data);

  return (
    <Box w="95%" h="100vh" p={5}>
      <Flex gap={3}>
        <Button bg="teal.400">
          <Link href="food/new">غذای جدید</Link>
        </Button>
        <Button bg="teal.400">
          <Link href="/admin/categories">دسته بندی</Link>
        </Button>
      </Flex>
      {data?.map((section) => (
        <Section sectionObj={section} key={section.id} />
      ))}
    </Box>
  );
};

export default FoodList;
