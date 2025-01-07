import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

interface CarouselItemRendererProps {
  src?: string;
  title: string;
  height?: string;
  width?: string;
  scale?: number;
  index: number;
  path: string;
}

const CarouselItemRenderer: React.FC<CarouselItemRendererProps> = ({
  title,
  src,
  path,
  height,
  width,
}) => {
  const styles = {
    container: {
      width,
      height,
      borderRadius: "5px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      backgroundImage: `url(${src || ""})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "transform 0.5s ease, opacity 0.5s ease",
      boxShadow: "lg",
      cursor: "pointer",
      margin: "10px",
      transform: "scale(1)", // Default scale
      opacity: 1,
    },
    overlay: {
      position: "absolute",
      bottom: "0",
      width: "100%",
      background: "rgba(0, 0, 0, 0.6)",
      color: "white",
      textAlign: "center",
      py: 2,
    },
    slideTitle: {
      fontSize: ["md", "lg", "xl"],
    },
  };

  // Define query parameters for the Link
  const queryParams = new URLSearchParams({ food: title }).toString();

  return (
    <Link href={`/menu/${path}?${queryParams}`}>
      <Box sx={styles.container}>
        <Box sx={styles.overlay}>
          <Text sx={styles.slideTitle}>{title}</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default CarouselItemRenderer;
