import { axiosInstance } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { MainItemType } from "@/types/mainItem";

export const useMainItems = () => {
  return useQuery<MainItemType[], Error>(["mainItemData"], () =>
    axiosInstance.get<MainItemType[]>("mainItem").then((res) => res.data)
  );
};
