import { axiosInstance } from "@/services/apiClient";
import { SectionType } from "@/types/section";
import { useQuery } from "@tanstack/react-query";

export const useMenuItems = () => {
  return useQuery<SectionType[], Error>(["sectionData"], () =>
    axiosInstance.get<SectionType[]>("section").then((res) => res.data)
  );
};
