"use client";

import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NavbarCollapseRenderer from "./NavbarCollapseRenderer";
import useFoodStore from "@/app/stores/foodStore";
import { colorPalette } from "@/assets/constants";

const ShoppingCartModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  const foods = useFoodStore((state) => state.foods);
  const removeFood = useFoodStore((state) => state.removeFood);
  const clearCart = useFoodStore((state) => state.clearCart);
  const addFood = useFoodStore((state) => state.addFood);
  const foodCartPrice = useFoodStore((state) => state.foodCartPrice);

  const TotalPrice = foodCartPrice(foods);

  const styles = {
    container: {
      margin: "5px",
      bg: foods.length > 0 ? colorPalette.secondary : "",
      borderRadius: "5px",
    },
    content: {
      paddingY: "5px",
      display: "flex",
      items: "center",
      justify: "center",
      height: "80px",
      borderRadius: "5px",
      bg: colorPalette.secondary,
    },
    items: {
      items: "center",
      justify: "center",
      padding: "5px",
      color: colorPalette.__hover,
      fontSize: "18px",
    },
    btn: {
      margin: "5px",
      background: colorPalette.nav,
      color: "#000000",
      colorScheme: colorPalette.third,
      borderRadius: "5px",
    },
    closeBtn: {
      color: "#000000",
    },

    modalHeader: {
      marginY: "10px",
      marginX: "20px",
      color: "#000",
    },
    modalFooter: {
      display: "flex",
      items: "center",
      justify: "center",
    },

    totalPriceContainer: {
      margin: "5px",
      background: colorPalette.nav,
      color: "#000000",
      borderRadius: "5px",
      padding: "5px",
    },
  };

  const handleRemove = (id: string) => {
    removeFood(Number(id));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader sx={styles.modalHeader} dir="rtl">
          سبد خرید شما
        </ModalHeader>
        <ModalCloseButton sx={styles.closeBtn} />
        <ModalBody sx={styles.container}>
          {foods.length === 0 ? (
            <Text dir="rtl" sx={styles.modalHeader}>
              سبد خرید شما خالی است.
            </Text>
          ) : (
            foods.map((food) => (
              <>
                <Box key={food.id} py="5px" dir="rtl">
                  <Box sx={styles.content}>
                    <Center sx={styles.items}>{food.title}</Center>
                    <Center sx={styles.items}>:</Center>
                    <Center sx={styles.items}>
                      {food.price}
                      <Text fontSize="sm">هزار تومان</Text>
                    </Center>
                    <Spacer />
                    <Center>
                      <Button
                        size="xs"
                        sx={styles.btn}
                        onClick={() => {
                          addFood(food);
                        }}
                      >
                        <Text fontSize="3xl" lineHeight="1">
                          +
                        </Text>
                      </Button>
                      <Text fontSize="3xl" lineHeight="1">
                        {food.count}
                      </Text>
                      <Button
                        size="xs"
                        sx={styles.btn}
                        onClick={() => handleRemove(`${food.id}`)}
                      >
                        <Text fontSize="3xl" lineHeight="1">
                          -
                        </Text>
                      </Button>
                    </Center>
                  </Box>
                  {food.extraItems && food.extraItems.length > 0 && (
                    <NavbarCollapseRenderer
                      content={food.extraItems}
                      title="محتویات اضافه"
                    />
                  )}
                </Box>
              </>
            ))
          )}
        </ModalBody>
        <ModalFooter>
          <Box flex="1" dir="rtl" sx={styles.modalFooter}>
            <Center flex="1" sx={styles.totalPriceContainer}>
              <Text>مجموع خرید: </Text>
              <Spacer />
              <Text>{`${TotalPrice} هزار تومان`}</Text>
            </Center>

            <Button sx={styles.btn} onClick={() => clearCart()}>
              خالی کردن سبد خرید
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShoppingCartModal;
