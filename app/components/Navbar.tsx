"use client";
import React, { useEffect } from "react";
import { colorPalette } from "@/assets/constants";
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
import Link from "next/link";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import Logo from "./Logo";
import useFoodStore from "../store";
import ShoppingCartModal from "./ShoppingCartModal";
import useUserStore from "./../auth/store/store";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { useRouter } from "next/navigation"; // Import useRouter to handle routing

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
    fontWeight: "bold",
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

const Navbar = () => {
  const router = useRouter();
  const foodCount = useFoodStore((state) => state.foods.length); // Get the count of items in the cart
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser, clearUser } = useUserStore(); // Access setUser to restore user

  // Restore user from token on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token); // Decode the token to get user info
        setUser({
          id: decoded.id,
          username: decoded.username,
          isAdmin: decoded.isAdmin,
        });
      } catch (error) {
        console.error("Failed to decode token", error);
        localStorage.removeItem("token");
      }
    }
  }, [setUser]); // Only runs when the component mounts

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Clear the user from Zustand
    clearUser();

    // Redirect to home page
    router.push("/");
  };

  return (
    <>
      <Flex sx={styles.container}>
        <Logo />
        <Heading sx={styles.heading} as="h1" size="xl">
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
            <MenuList
              dir="rtl"
              sx={{
                maxHeight: "300px", // Set the max height to make the MenuList scrollable
                overflowY: "auto", // Enable vertical scrolling
                bg: colorPalette.primary,

                /* Hide scrollbar for WebKit (Chrome, Safari) */
                "::-webkit-scrollbar": {
                  display: "none",
                },

                /* Hide scrollbar for Firefox */
                scrollbarWidth: "none",

                /* Optional: Add padding-right to prevent content from hiding behind the invisible scrollbar */
                pr: "8px",
              }}
            >
              <Link href={"/"}>
                <MenuItem sx={styles.menuItem}>خانه</MenuItem>
              </Link>
              {user && user.isAdmin ? (
                <>
                  <Link href={"/admin/food"}>
                    <MenuItem sx={styles.menuItem}>افزودن غذا</MenuItem>
                  </Link>
                  <Link href={"/admin/extra"}>
                    <MenuItem sx={styles.menuItem}>افزودن آیتم اضافی</MenuItem>
                  </Link>
                </>
              ) : (
                !user && (
                  <Link href={"/auth/login"}>
                    <MenuItem sx={styles.menuItem}>ورود</MenuItem>
                  </Link>
                )
              )}
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
              {user && (
                <MenuItem sx={styles.menuItem} onClick={handleLogout}>
                  خروج
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <ShoppingCartModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Navbar;
