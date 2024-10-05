// src/components/Loading.tsx
"use client";
import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";

interface LoadingProps {
  message?: string; // Optional loading message
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <Box
      flexGrow={1}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh" // Full height to center content
      textAlign="center" // Center text
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        size="xl"
        color="teal.500" // Customize the color if needed
        mt={4} // Add margin-top to separate from the logo
      />
      <Text mt={4} fontSize="lg" color="gray.600">
        {message ||
          "نیروانایی عزیز در صفحه در حال بارگزاری میباشد. لطفا صبور باشید"}{" "}
        {/* Default message */}
      </Text>
    </Box>
  );
};

export default Loading;
