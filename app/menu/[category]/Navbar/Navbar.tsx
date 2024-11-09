"use client";

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
import useFoodStore from "@/app/stores/foodStore";
import Logo from "@/app/components/Logo";
import ShoppingCartModal from "./NavbarModal";
import { colorPalette } from "@/assets/constants";

const Navbar: React.FC = () => {
  const foodCount = useFoodStore((state) => state.foods.length); // Get the count of items in the cart
  const { isOpen, onOpen, onClose } = useDisclosure();

  const styles = {
    container: {
      p: "16px",
      bg: `linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))`, // Subtle light gradient
      color: "#000",
      align: "center",
      justifyContent: "space-between",
      borderRadius: "20px", // Rounded corners for a soft look
      boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)", // Stronger shadow for floating effect
      backdropFilter: "blur(10px)", // Slight blur for frosted glass effect
    },
    heading: {
      borderRadius: "10px",
      padding: "8px",
      fontSize: "2xl",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: colorPalette.__hover,
      fontWeight: "bold",
      transition: "color 0.3s ease", // Smooth color transition on hover
      _hover: { color: "#ffdd57" }, // Bright color on hover
    },
    menuItem: {
      fontSize: "lg",
      fontWeight: "bold",
      padding: "12px 30px",
      borderRadius: "12px",
      color: "#fff",
      transition: "all 0.4s ease", // Smooth transition for effects
      bgGradient: `linear(to-r, ${colorPalette.primary}, ${colorPalette.secondary})`,
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Initial shadow for depth
      _hover: {
        transform: "scale(1.1)", // Larger scale on hover for impact
        bgGradient: `linear(to-r, ${colorPalette.secondary}, ${colorPalette.primary})`, // Gradient reversal for visual effect
        color: "#ffdd57", // Bright color for text on hover
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)", // Stronger shadow for a lifting effect
        filter: "brightness(1.2)", // Slight brightness increase
      },
      _active: {
        transform: "scale(0.95)", // Slight press-down effect on click
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Subtle shadow on active click
      },
    },
    iconButton: {
      padding: "8px",
      borderRadius: "50%", // Circular button for icons
      bg: "rgba(255, 255, 255, 0.15)", // Transparent light background
      transition: "transform 0.3s ease, background 0.3s ease", // Scale on hover
      backdropFilter: "blur(5px)", // Blurred background for icon buttons
      _hover: { transform: "scale(1.1)", background: colorPalette.nav }, // Enlarged and color change on hover
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
      transform: "translate(-50%, -50%)",
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
              <Link href={"/api/auth/login"}>
                <MenuItem sx={styles.menuItem}>ورود</MenuItem>
              </Link>
              <Link href={"/menu/menuitems"}>
                <MenuItem sx={styles.menuItem}>منو</MenuItem>
              </Link>
              <Link href={"/menu/breakfast"}>
                <MenuItem sx={styles.menuItem}>صبحانه</MenuItem>
              </Link>
              <Link href={"/menu/food"}>
                <MenuItem sx={styles.menuItem}>غذاها</MenuItem>
              </Link>
              <Link href={"/menu/cold"}>
                <MenuItem sx={styles.menuItem}>بار سرد</MenuItem>
              </Link>
              <Link href={"/menu/hot"}>
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
