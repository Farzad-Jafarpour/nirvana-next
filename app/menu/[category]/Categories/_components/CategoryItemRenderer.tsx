import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Link } from "react-scroll";
import { useSwiper } from "swiper/react";

interface CategoryItemRendererProps {
  linkToSrc: string;
  img?: string;
  title: string;
  color?: string;
  height?: string;
  width?: string;
  scale?: number;
  index: number;
}

const CategoryItemRenderer: React.FC<CategoryItemRendererProps> = ({
  img,
  title = "",
  color = "#000",
  height = "150px",
  width = "150px",
  index = 0,
  linkToSrc,
}) => {
  const swiper = useSwiper();

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
      backgroundImage: `url(${img || ""})`,
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
  };

  return (
    <Link
      to={linkToSrc}
      offset={-270}
      smooth
      duration={800}
      onClick={() => {
        if (swiper && typeof swiper.slideTo === "function") {
          swiper.slideTo(index);
        }
      }}
    >
      <Box sx={styles.container}>
        {/* Overlay Text */}
        <Box sx={styles.overlay}>
          <Text fontSize={["sm", "md", "lg"]}>{title}</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default CategoryItemRenderer;
