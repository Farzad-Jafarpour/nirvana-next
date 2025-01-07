"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/app/theme/Theme";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import Fonts from "./font";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ClientProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Fonts />
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
}
