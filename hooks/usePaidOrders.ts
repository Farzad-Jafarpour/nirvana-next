import { axiosInstance } from "@/services/apiClient";
import { orderType } from "@/types/order";
import { useQuery } from "@tanstack/react-query";

export const usePaidOrders = () => {
  return useQuery<orderType[], Error>(["paidOrders"], () =>
    axiosInstance.get<orderType[]>("pay").then((res) => res.data)
  );
};
