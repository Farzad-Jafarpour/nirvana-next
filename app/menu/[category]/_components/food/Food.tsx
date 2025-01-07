"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { useSwipeable, SwipeableProps } from "react-swipeable";
import { colorPalette } from "@/assets/constants";
import { FoodProps } from "@/types/types";
import CustomModal from "./_components/CustomModal";
import ExtraItems from "./_components/ExtraItems";
import Details from "./_components/Details";
import DetailsModal from "./_components/DetailsModal";
import useFoodStore from "@/app/stores/foodStore";
import ImageModal from "./_components/ImageModal";

interface StyleProps {
  isLarge: boolean;
  isNew: boolean;
  swipeDirection: "left" | "right" | null;
}

const Food: React.FC<FoodProps> = (props) => {
  const {
    id,
    title,
    price,
    details,
    src,
    hasExtra,
    category,
    isNew,
    isLarge,
    isAvailable,
    isTax,
    extraItems,
  } = props;

  const [showFullTitle, setShowFullTitle] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

  const handleAddFood = () => addFood({ id, title, price, count: 1, isTax });
  const handleRemoveFood = () => removeFood(id);
  const handleImageClick = () => setIsImageModalOpen(true);
  const handleSwipeLeft = () => {
    setSwipeDirection("left");
    handleAddFood();
    setTimeout(() => setSwipeDirection(null), 300);
  };
  const handleSwipeRight = () => {
    setSwipeDirection("right");
    if (existingFoodIndex !== -1) handleRemoveFood();
    setTimeout(() => setSwipeDirection(null), 300);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  } as SwipeableProps);

  const truncateTitle = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const styles = {
    container: {
      w: { base: "95%", md: "360px", lg: "400px" },
      height: isLarge ? "auto" : "200px",
      bg: isNew ? colorPalette.contrast : colorPalette.fourth,
      borderRadius: "5px",
      overflow: "hidden",
      boxShadow: "lg",
      position: "relative",
      transition: "transform 0.3s",
      transform:
        swipeDirection === "left"
          ? "translateX(-10px)"
          : swipeDirection === "right"
          ? "translateX(10px)"
          : "translateX(0)",
      "&:hover": {
        transform: "scale(1.03)",
      },
    },
    btn: {
      color: isLarge ? colorPalette.__hover : "#000000",
      bg: isLarge ? colorPalette.primary : "rgba(255, 255, 255, 0.8)",
    },
    btnSecondary: {
      bg: isLarge ? colorPalette.primary : colorPalette.__hover,
      color: isLarge ? colorPalette.__hover : "#000000",
    },
    unavailableOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      w: "100%",
      h: "100%",
      bg: "rgba(0, 0, 0, 0.15)", // Semi-transparent background
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    diagonalText: {
      transform: "rotate(-45deg)", // Rotate the text to display it diagonally
      fontSize: "2xl",
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Background for better visibility
      padding: "10px",
      borderRadius: "5px",
    },
    fadedContent: {
      opacity: 0.4, // Fades out the underlying content
    },
  };

  return (
    <Box {...swipeHandlers} sx={styles.container}>
      {!isAvailable && (
        <Box sx={styles.unavailableOverlay}>
          <Text sx={styles.diagonalText}>این آیتم تمام شده است</Text>
        </Box>
      )}

      <Flex
        direction={isLarge ? "column" : "row"}
        h="100%"
        sx={!isAvailable ? styles.fadedContent : {}}
      >
        {/* Image Section */}
        <Box
          flexShrink={0}
          w={isLarge ? "100%" : "40%"}
          h={isLarge ? "200px" : "100%"}
          cursor="pointer"
          onClick={handleImageClick}
        >
          <Image
            src={src}
            alt="food-image"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>

        {/* Content Section */}
        <Flex
          direction="column"
          flex={1}
          p={4}
          justify="space-between"
          bg={isLarge ? "white" : colorPalette.fourth}
        >
          {/* Title */}
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="black"
            cursor="pointer"
            onClick={() => setShowFullTitle(!showFullTitle)}
          >
            {showFullTitle ? title : truncateTitle(title, 30)}
          </Text>

          {/* Price and Details */}
          <Flex justify="space-between" align="center" mt={2}>
            <Text fontSize="lg" fontWeight="bold">
              {price} هزار تومان
            </Text>
            {details && (
              <Button size="sm" sx={styles.btn} onClick={onDetailsOpen}>
                توضیحات
              </Button>
            )}
          </Flex>

          {/* Extra Items */}
          {hasExtra && (
            <Button mt={4} sx={styles.btnSecondary} onClick={onExtraItemsOpen}>
              انتخاب محتویات اضافی
            </Button>
          )}

          {/* Add/Remove Buttons */}
          <Flex justify="space-between" align="center" mt={4}>
            {existingFoodIndex !== -1 && (
              <Center>
                <Button size="sm" sx={styles.btn} onClick={handleAddFood}>
                  +
                </Button>
                <Text mx={2}>{foods[existingFoodIndex].count}</Text>
                <Button size="sm" sx={styles.btn} onClick={handleRemoveFood}>
                  -
                </Button>
              </Center>
            )}
            {existingFoodIndex === -1 && (
              <Button size="sm" sx={styles.btn} onClick={handleAddFood}>
                اضافه کن
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>

      {/* Modals */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title={title}
        details={details || ""}
        src={src}
        existingFoodIndex={existingFoodIndex}
        handleAddFood={handleAddFood}
        handleRemove={handleRemoveFood}
        id={id}
        isTax={isTax}
        foods={foods}
      />
      {hasExtra && (
        <CustomModal
          category={category}
          foodId={id}
          isOpen={isExtraItemsOpen}
          onClose={onExtraItemsClose}
          CustomComponent={ExtraItems}
          extraItems={extraItems!}
        />
      )}
      <DetailsModal
        category={category}
        isOpen={isDetailsOpen}
        onClose={onDetailsClose}
        details={details}
        CustomComponent={Details}
      />
    </Box>
  );
};

export default Food;
