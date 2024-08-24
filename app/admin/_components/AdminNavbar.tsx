"use client";
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
import { Logo } from "@/app/components/Logo";

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
    fontSize: "2xl",
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
 
};

const AdminNavbar = () => {
  return (
    <>
      <Flex sx={styles.container}>
        <Logo />
        <Heading sx={styles.heading} as="h1" size="xl">
          کافه نیروانا
        </Heading>

        <Flex sx={{ zIndex: 2 }} alignItems="center">
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
              <Link href={"/menu/menuitems"}>
                <MenuItem sx={styles.menuItem}>منو</MenuItem>
              </Link>
              <Link href={"/admin/food"}>
                <MenuItem sx={styles.menuItem}>افزودن غذا</MenuItem>
              </Link>
              <Link href={"/admin/extra"}>
                <MenuItem sx={styles.menuItem}>افزودن آیتم اضافی</MenuItem>
              </Link>
              <Link href={"/"}>
                <MenuItem sx={styles.menuItem}>خروج</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
};

export default AdminNavbar;
