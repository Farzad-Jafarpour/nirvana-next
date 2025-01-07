import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/apiClient";

import { orderType } from "@/types/order";
export const useOrders = () => {
  return useQuery<orderType[], Error>(["orders"], () =>
    axiosInstance.get<orderType[]>("table").then((res) => res.data)
  );
};
