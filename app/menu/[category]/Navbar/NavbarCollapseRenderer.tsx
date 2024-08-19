import React, { useState } from "react";
import { Box, Button, Center, Collapse, Spacer, Text } from "@chakra-ui/react";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import useFoodStore from "./../../../store";
import { ExtraItemsList } from "@/types/types";
import { colorPalette } from "@/assets/constants";

export interface NavCollapsProps {
  content: ExtraItemsList[];
  title: string;
}

const NavbarCollapseRenderer: React.FC<NavCollapsProps> = ({
  content: extraItems,
  title,
}) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  const removeExtraItem = useFoodStore((state) => state.removeExtraItem);
  const addExtraItem = useFoodStore((state) => state.addExtraItem);

  const styles = {
    content: {
      display: "flex",
      items: "center",
      justify: "center",
      height: "70px",
      borderRadius: "5px",
      bg: colorPalette.third,
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
  return (
    <>
      <Button size="xs" sx={styles.btn} onClick={handleToggle}>
        {title}
        {show ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
      <Collapse in={show}>
        {extraItems.map((eI) => (
          <>
            <Box key={eI.id} py="2px" dir="rtl">
              <Box sx={styles.content}>
                <Center sx={styles.items}>{eI.title}</Center>
                <Center sx={styles.items}>:</Center>
                <Center sx={styles.items}>
                  {eI.price}
                  <Text fontSize="sm">هزار تومان</Text>
                </Center>
                <Spacer />
                <Center>
                  <Button
                    size="xs"
                    sx={styles.btn}
                    onClick={() => {
                      addExtraItem(eI, eI.foodId);
                    }}
                  >
                    <Text fontSize="3xl" lineHeight="1">
                      +
                    </Text>
                  </Button>
                  <Text fontSize="3xl" lineHeight="1">
                    {eI.count}
                  </Text>
                  <Button
                    size="xs"
                    sx={styles.btn}
                    onClick={() => {
                      removeExtraItem(eI.id, eI.foodId);
                    }}
                  >
                    <Text fontSize="3xl" lineHeight="1">
                      -
                    </Text>
                  </Button>
                </Center>
              </Box>
            </Box>
          </>
        ))}
      </Collapse>
    </>
  );
};

export default NavbarCollapseRenderer;
