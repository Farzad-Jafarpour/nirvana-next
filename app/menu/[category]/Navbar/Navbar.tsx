"use client"

import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaShoppingCart } from "react-icons/fa"; // Import the shopping cart and hamburger menu icons
import Link from "next/link";
import useFoodStore from "@/app/store";
import Logo from "@/app/components/Logo";
import ShoppingCartModal from "./NavbarModal";
import { colorPalette } from "@/assets/constants";

const Navbar: React.FC = () => {
  const foodCount = useFoodStore((state) => state.foods.length); // Get the count of items in the cart
  const { isOpen, onOpen, onClose } = useDisclosure();

  const styles = {
    container: {
      p: "16px",
      bg: colorPalette.primary,
      color: "#000",
      align: "center",
      justifyContent: "space-between",
    },
    heading: {
      borderRadius: "5px",
      padding: "5px",
      width: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: colorPalette.__hover,
    },
    menuItem: {
      bg: colorPalette.primary,
      fontSize: "3xl",
      _hover: { background: colorPalette.nav },
    },
    iconButton: {
      padding: "8px",
      borderRadius: "5px",
      bg: "transparent",
      transition: "background 0.3s",
      _hover: { background: colorPalette.nav },
      position: "relative",
    },
    icon: {
      width: "30px",
      height: "30px",
      fill: colorPalette.nav,
    },
    badge: {
      color: "#000",
      fontSize: "0.75rem",
      height: "15px",
      width: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "40%",
      left: "40%",
      transform: "translate(-50%, -50%)", // Center the badge within the icon
    },
  };

  return (
    <>
      <Flex sx={styles.container}>
        <Logo />
        <Heading sx={styles.heading} as="h1" size="lg">
          کافه نیروانا
        </Heading>

        <Flex sx={{ zIndex: 2 }} alignItems="center">
          <Box position="relative">
            <IconButton
              aria-label="Shopping Cart"
              icon={<FaShoppingCart style={styles.icon} />}
              sx={styles.iconButton}
              variant="outline"
              mr="4" // Add some margin to the right to separate from the hamburger menu
              onClick={onOpen} // Open the modal on click
            />
            {foodCount > 0 && (
              <Box sx={styles.badge}>
                <Text>{foodCount}</Text>
              </Box>
            )}
          </Box>
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FaBars style={styles.icon} />} // Use FaBars for the hamburger menu
              sx={styles.iconButton}
            />
            <MenuList bg={colorPalette.primary} dir="rtl">
              <Link href={"/"}>
                <MenuItem sx={styles.menuItem}>خانه</MenuItem>
              </Link>
              <Link href={"/login"}>
                <MenuItem sx={styles.menuItem}>ورود</MenuItem>
              </Link>
              <Link href={"/menulayout/menu"}>
                <MenuItem sx={styles.menuItem}>منو</MenuItem>
              </Link>
              <Link href={"/menulayout/menu/breakfast"}>
                <MenuItem sx={styles.menuItem}>صبحانه</MenuItem>
              </Link>
              <Link href={"/menulayout/menu/food"}>
                <MenuItem sx={styles.menuItem}>غذاها</MenuItem>
              </Link>
              <Link href={"/menulayout/menu/cold"}>
                <MenuItem sx={styles.menuItem}>بار سرد</MenuItem>
              </Link>
              <Link href={"/menulayout/menu/hot"}>
                <MenuItem sx={styles.menuItem}>بار گرم</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <ShoppingCartModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Navbar;
