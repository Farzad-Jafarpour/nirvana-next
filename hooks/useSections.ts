import { axiosInstance } from "@/services/apiClient";
import { ExtraType } from "@/types/extra";
import { orderType } from "@/types/order";
import { SectionType } from "@/types/section";
import { useQuery } from "@tanstack/react-query";

export const useMenuItems = () => {
  return useQuery<SectionType[], Error>(["sectionData"], () =>
    axiosInstance.get<SectionType[]>("section").then((res) => res.data)
  );
};

export const useExtraMenuItems = () => {
  return useQuery<ExtraType[], Error>(["extraData"], () =>
    axiosInstance.get<ExtraType[]>("extra").then((res) => res.data)
  );
};

export const useOrders = () => {
  return useQuery<orderType[], Error>(["orders"], () =>
    axiosInstance.get<orderType[]>("table").then((res) => res.data)
  );
};

export const usePaidOrders = () => {
  return useQuery<orderType[], Error>(["paidOrders"], () =>
    axiosInstance.get<orderType[]>("pay").then((res) => res.data)
  );
};
