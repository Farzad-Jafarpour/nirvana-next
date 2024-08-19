"use client";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminLayout = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
  }, [router]);
  return <Box></Box>;
};

export default AdminLayout;
