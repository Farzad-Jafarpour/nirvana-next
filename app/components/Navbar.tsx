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
import useFoodStore from "../stores/foodStore";
import ShoppingCartModal from "./ShoppingCartModal";
import useUserStore from "../stores/userStore";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { useRouter } from "next/navigation"; // Import useRouter to handle routing
import { useMainItems } from "@/hooks/useMainItems";

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
    fontSize: "lg",
    fontWeight: "medium",
    color: "#000",
    _hover: {
      bg: colorPalette.nav,
      color: "#fff",
    },
    transition: "background 0.3s ease, color 0.3s ease",
    py: 2,
    px: 4,
    borderRadius: "5px",
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
    top: "30%",
    right: "30%",
    transform: "translate(-50%, -50%)", // Center the badge within the icon
    bg: "red",
    borderRadius: "50%",
    fontWeight: "bold",
  },
};

const Navbar = () => {
  const router = useRouter();

  const foodCount = useFoodStore((state) => state.foods.length); // Get the count of items in the cart
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser, clearUser } = useUserStore(); // Access setUser to restore user

  const { data: mainItems = [] } = useMainItems();

  const staticData = {
    id: 0,
    title: "منوی کلی",
    isEnable: true,
    src: "http://nirvanacafe.ir/uploads/logo.webp",
    path: "menuitems",
  };

  const allItems = [staticData, ...mainItems];
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
                boxShadow: "lg",
                borderRadius: "5px",
                py: 2,

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
                  <Link href={"/admin/mainItems"}>
                    <MenuItem sx={styles.menuItem}>افزودن دسته بندی</MenuItem>
                  </Link>
                  <Link href={"/admin/food"}>
                    <MenuItem sx={styles.menuItem}>افزودن آیتم</MenuItem>
                  </Link>
                  <Link href={"/admin/extra"}>
                    <MenuItem sx={styles.menuItem}>افزودن آیتم اضافی</MenuItem>
                  </Link>
                </>
              ) : (
                !user && (
                  <Link href={"/api/auth/login"}>
                    <MenuItem sx={styles.menuItem}>ورود</MenuItem>
                  </Link>
                )
              )}
              {allItems.map((item) => {
                // Construct query parameters for each item
                const queryParams = new URLSearchParams({
                  food: item.title,
                }).toString();
                return (
                  <Link
                    key={item.id}
                    href={`/menu/${item.path}?${queryParams}`}
                  >
                    <MenuItem sx={styles.menuItem}>{item.title}</MenuItem>
                  </Link>
                );
              })}

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
