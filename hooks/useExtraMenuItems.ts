import { useQuery } from "@tanstack/react-query";

import { ExtraType } from "@/types/extra";
import { axiosInstance } from "@/services/apiClient";
export const useExtraMenuItems = () => {
  return useQuery<ExtraType[], Error>(["extraData"], () =>
    axiosInstance.get<ExtraType[]>("extra").then((res) => res.data)
  );
};
