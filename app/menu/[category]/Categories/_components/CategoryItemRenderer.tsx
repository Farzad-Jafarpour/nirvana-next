import { colorPalette } from "@/assets/constants";
import { Box, Button, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
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

const StyledBox = styled(Box)<{ color: string; height: string; width: string }>(
  ({ color, height, width }) => ({
    color,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px",
    padding: "5px",
    width,
    height,
  })
);

const StyledButton = styled(Button)<{
  color: string;
  height?: string;
  width?: string;
}>(({ color, height, width }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color,
  background: colorPalette.primary,
  margin: "5px",
  padding: "5px",
  minWidth: width,
  height,
  borderRadius: "5px",
  zIndex: 999,
}));

const CategoryItemRenderer: React.FC<CategoryItemRendererProps> = ({
  img,
  title = "",
  color = "#000",
  height = "100px",
  width = "100px",
  index = 0,
  linkToSrc,
}) => {
  const swiper = useSwiper();

  const styles = {
    images: {
      margin: "5px",
      width: "80px",
      height: "80px",
      borderRadius: "5px",
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
      <StyledButton color={color} height={height} width={width}>
        <StyledBox color={color} height={height} width={width}>
          {img && <img src={img} alt="menu" style={styles.images} />}
          <Text padding={"5px"}>{title}</Text>
        </StyledBox>
      </StyledButton>
    </Link>
  );
};

export default CategoryItemRenderer;
