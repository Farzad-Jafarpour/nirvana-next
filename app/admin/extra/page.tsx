"use client";
import { useExtraMenuItems } from "@/hooks/useSections";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import ExtraItemCard from "./_components/ExtraItemCard";

const ExtraList = () => {
  const router = useRouter();
  const { data } = useExtraMenuItems();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
  }, [router]);
  return (
    <Box w="95%" h="100vh" p={5}>
      <Button bg="teal.400">
        <Link href="extra/new">افزودنی جدید</Link>
      </Button>
      {data?.map((item) => (
        <ExtraItemCard extraObj={item} key={item.id} />
      ))}
    </Box>
  );
};

export default ExtraList;
