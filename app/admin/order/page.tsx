"use client";
import { useOrders } from "@/hooks/useSections";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import OrderCard from "./_components/OrderCard";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/services/apiClient";
import { useMutation } from "@tanstack/react-query";

const OrdersPage = () => {
  const { data: initialData } = useOrders();
  const [data, setData] = useState(initialData);

  const mutation = useMutation(
    (id: number) => axiosInstance.patch(`pay/${id}`).then((res) => res.data),
    {
      onSuccess: (data, variables) => {
        // Filter out the order with the given id after successful payment
        setData((prevData) =>
          prevData?.filter((order) => order.id !== variables)
        );
      },
      onError: (error) => {
        console.error("Error processing payment:", error);
        // Handle error (e.g., show notification, etc.)
      },
    }
  );

  const handlePay = (id: number) => {
    mutation.mutate(id);
  };

  return (
    <Box w="95%" h="100vh" p={5}>
      {data?.map((order) => (
        <OrderCard orderObj={order} key={order.id} handleClick={handlePay} />
      ))}
    </Box>
  );
};

export default OrdersPage;
