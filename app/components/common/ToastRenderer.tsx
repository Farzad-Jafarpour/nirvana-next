import { colorPalette } from "@/assets/constants";
import { Box, Text, keyframes } from "@chakra-ui/react";
import React from "react";

interface ToastRendererProps {
  content: string;
  duration?: number; // Duration in milliseconds
}

const fadeInOut = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
`;

const ToastRenderer: React.FC<ToastRendererProps> = ({
  content,
  duration = 2000,
}) => {
  const styles = {
    container: {
      position: "fixed",
      width: "100%",
      top: "15%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      p: 3,
      bg: colorPalette.third,
      borderRadius: "25px",
      boxShadow: "lg",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      animation: `${fadeInOut} ${duration}ms ease-in-out forwards`,
    },
  };

  return (
    <Box sx={styles.container}>
      <Text fontWeight="bold" fontSize="xl">
        {content}
      </Text>
    </Box>
  );
};

export default ToastRenderer;
