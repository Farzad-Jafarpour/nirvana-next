import { SectionType } from "@/types/section";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/apiClient";

export const useAdminMenu = () => {
  return useQuery<SectionType[], Error>(["adminData"], () =>
    axiosInstance.get<SectionType[]>("admin").then((res) => res.data)
  );
};
