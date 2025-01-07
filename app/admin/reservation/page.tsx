"use client";
import { usePaidOrders } from "@/hooks/usePaidOrders";
import { Box } from "@chakra-ui/react";
import PaidOrderCard from "./PaidOrderCard";
import { axiosInstance } from "@/services/apiClient";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Reservation = () => {
  const { data: initialData } = usePaidOrders();
  const [data, setData] = useState(initialData);

  const mutation = useMutation(
    (id: number) => axiosInstance.patch(`ready/${id}`).then((res) => res.data),
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

  const handleReady = (id: number) => {
    mutation.mutate(id);
  };

  return (
    <Box w="95%" h="100vh" p={5}>
      {data?.map((order) => (
        <PaidOrderCard
          orderObj={order}
          key={order.id}
          handleClick={handleReady}
        />
      ))}
    </Box>
  );
};

export default Reservation;
