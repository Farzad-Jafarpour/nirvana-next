"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SwipeableProps, useSwipeable } from "react-swipeable";
import { colorPalette } from "@/assets/constants";
import { FoodProps } from "@/types/types";
import CustomModal from "./_components/CustomModal";
import ExtraItems from "./_components/ExtraItems";
import Details from "./_components/Details";
import DetailsModal from "./_components/DetailsModal";
import useFoodStore from "@/app/store";
// import useFoodStore from "components/menu/store";

const breakpoints = {
  base: "row",
  md: "row",
  lg: "row",
  xl: "row",
};

const sizeBreakpoints = {
  base: "100px", // 0px
  sm: "100px", // ~480px. em is a relative unit and is dependant on the font size.
  md: "140px", // ~768px
  lg: "140px", // ~992px
  xl: "150px", // ~1280px
  "2xl": "150px", // ~1536px
};

const Food: React.FC<FoodProps> = ({
  id,
  title,
  price,
  details,
  src,
  hasExtra,
  category,
  isNew,
  isLarge,
}) => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [selectedFoodId, setSelectedFoodId] = useState<number | null>(null);

  const styles = {
    container: {
      width: { base: "95%", md: "365px", lg: "475px", xl: "575px" },
      height: isLarge ? "400px" : "182px",
      backgroundColor: isNew ? colorPalette.contrast : colorPalette.fourth,
      display: "flex",
      flexDirection: isLarge ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px",
      padding: "5px",
      transition: "transform 0.3s ease-in-out",
      transform:
        swipeDirection === "left"
          ? "translateX(-10px)"
          : swipeDirection === "right"
          ? "translateX(10px)"
          : "translateX(0)",
    },
    imageContainer: {
      width: isLarge ? "180px" : sizeBreakpoints,
      height: isLarge ? "180px" : sizeBreakpoints,
      marginLeft: "15px",
    },
    largeHeader: {
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "row",
      width: "100%",
      padding: "5px",
    },
    image: {
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "5px",
    },
    textContainer: {
      height: "100%",
      width: isLarge ? "100%" : "70%",
      display: "flex",
      alignItems: "flex-start",
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "5px",
      marginY: isLarge ? "15px" : "",
      fontSize: "xl",
    },
    priceText: {
      display: "flex",
      flexGrow: 1,
      fontSize: "20px",
      width: "100%",
      textAlign: "flex-start",
    },
    smallText: {
      fontSize: "10px",
      textAlign: "center",
    },
    details: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "5px",
      color: " #000000 ",
    },
    btn: {
      margin: "5px",
      color: " #000000 ",
      bg: "rgba(255, 255, 255,0.8)",
    },
    btnSecondary: {
      bg: colorPalette.__hover,
      color: " #000000 ",
      height: "40px",
      width: "98%",
      borderRadius: "5px",
    },
    btnContainer: {
      display: "flex",
      flexDirection: breakpoints,
    },
    modal: {
      position: "absolute",
      top: "50%",
    },
  };

  const {
    isOpen: isExtraItemsOpen,
    onOpen: onExtraItemsOpen,
    onClose: onExtraItemsClose,
  } = useDisclosure();

  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();

  const foods = useFoodStore((state) => state.foods);
  const addFood = useFoodStore((state) => state.addFood);
  const removeFood = useFoodStore((state) => state.removeFood);

  const existingFoodIndex = foods.findIndex((f) => f.id === id);

  const handleClick = () => {
    onExtraItemsOpen();
    setCategoryTitle(category);
    setSelectedFoodId(id);
  };

  const handleDetailsClick = () => {
    onDetailsOpen();
  };

  const handleAddFood = () => {
    const food = {
      id,
      title,
      price,
      count: 1,
    };
    addFood(food);
  };

  const handleRemove = (id: number) => {
    removeFood(id);
  };

  const handleSwipeLeft = () => {
    setSwipeDirection("left");
    handleAddFood();
    setTimeout(() => setSwipeDirection(null), 300);
  };

  const handleSwipeRight = () => {
    setSwipeDirection("right");
    if (existingFoodIndex !== -1) {
      handleRemove(id);
    }
    setTimeout(() => setSwipeDirection(null), 300);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  } as SwipeableProps);

  return (
    <>
      {isLarge && (
        <Box {...swipeHandlers} sx={styles.container}>
          <Flex sx={styles.largeHeader}>
            <Box sx={styles.imageContainer}>
              <Image src={src} sx={styles.image} alt="food-image" />
            </Box>
            <Box flex="1">
              <Text as="h3" fontSize="3xl" color={" #000000 "}>
                {title}
              </Text>
            </Box>
          </Flex>
          <Spacer />
          <Box width={"100%"}>
            <Box sx={styles.textContainer}>
              <Button onClick={handleClick} sx={styles.btnSecondary}>
                برای انتخاب محتویات خود کلیک کنید
              </Button>
              <Box sx={styles.details}>
                <Box>
                  <Box sx={styles.priceText}>
                    <Text fontSize="sm">{price} هزار تومان </Text>
                  </Box>
                </Box>
                <Box sx={styles.btnContainer}>
                  {details && (
                    <Button
                      sx={styles.btn}
                      size="xs"
                      onClick={handleDetailsClick}
                    >
                      توضیحات
                    </Button>
                  )}
                  {existingFoodIndex !== -1 && (
                    <Center>
                      <Button size="xs" sx={styles.btn} onClick={handleAddFood}>
                        <Text fontSize="3xl" lineHeight="1">
                          +
                        </Text>
                      </Button>
                      <Text fontSize="3xl" lineHeight="1">
                        {foods[existingFoodIndex].count}
                      </Text>
                      <Button
                        size="xs"
                        sx={styles.btn}
                        onClick={() => handleRemove(id)}
                      >
                        <Text fontSize="3xl" lineHeight="1">
                          -
                        </Text>
                      </Button>
                    </Center>
                  )}
                  {existingFoodIndex === -1 && (
                    <Button size="xs" sx={styles.btn} onClick={handleAddFood}>
                      <Text fontSize="3xl" lineHeight="1">
                        +
                      </Text>
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Spacer />
        </Box>
      )}
      {!isLarge && (
        <Box {...swipeHandlers} sx={styles.container}>
          <Box sx={styles.imageContainer}>
            <Image src={src} sx={styles.image} alt="food-image" />
          </Box>
          <Box sx={styles.textContainer}>
            <Text as="h2" fontSize="xl" color={" #000000 "}>
              {title}
            </Text>
            <Button onClick={handleClick} sx={styles.btnSecondary}>
              برای انتخاب محتویات خود کلیک کنید
            </Button>
            <Box sx={styles.details}>
              <Box sx={styles.priceText}>
                <Text fontSize="sm">{price} هزار تومان </Text>
              </Box>
              <Box sx={styles.btnContainer}>
                {details && (
                  <Button
                    size="xs"
                    sx={styles.btn}
                    onClick={handleDetailsClick}
                  >
                    توضیحات
                  </Button>
                )}
                {existingFoodIndex !== -1 && (
                  <Center>
                    <Button size="xs" sx={styles.btn} onClick={handleAddFood}>
                      <Text fontSize="3xl" lineHeight="1">
                        +
                      </Text>
                    </Button>
                    <Text fontSize="3xl" lineHeight="1">
                      {foods[existingFoodIndex].count}
                    </Text>
                    <Button
                      size="xs"
                      sx={styles.btn}
                      onClick={() => handleRemove(id)}
                    >
                      <Text fontSize="3xl" lineHeight="1">
                        -
                      </Text>
                    </Button>
                  </Center>
                )}
                {existingFoodIndex === -1 && (
                  <Button size="xs" sx={styles.btn} onClick={handleAddFood}>
                    <Text fontSize="3xl" lineHeight="1">
                      +
                    </Text>
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <CustomModal
        category={categoryTitle}
        foodId={selectedFoodId!}
        isOpen={isExtraItemsOpen}
        onClose={onExtraItemsClose}
        CustomComponent={ExtraItems}
      />
      <DetailsModal
        category={categoryTitle}
        isOpen={isDetailsOpen}
        onClose={onDetailsClose}
        details={details}
        CustomComponent={Details}
      />
    </>
  );
};

export default Food;
