"use client";

import { colorPalette } from "@/assets/constants";
import { useMainItems } from "@/hooks/useMainItems";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

const styles = {
  container: {
    w: "95%",
    minH: "100vh",
    p: 5,
    dir: "rtl",
  },
  topButtons: {
    gap: 3,
    mb: 5,
  },
  button: {
    bg: "teal.400",
    color: "white",
  },
  flexLayout: {
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
  },
  itemBox: {
    boxShadow: "md",
    borderRadius: "lg",
    overflow: "hidden",
    border: "1px solid",
    borderColor: "gray.200",
    p: 4,
    transition: "transform 0.2s ease-in-out",
    _hover: { transform: "scale(1.05)" },
    width: {
      base: "100%", // Full width on small screens
      sm: "calc(50% - 12px)", // Two items per row on medium screens
      md: "calc(33.33% - 12px)", // Three items per row on large screens
      lg: "calc(25% - 12px)", // Four items per row on extra large screens
    },
  },
  image: {
    borderRadius: "md",
    w: "100%",
    h: "150px",
    objectFit: "cover",
  },
  title: {
    fontWeight: "bold",
    fontSize: "lg",
    mt: 3,
    textAlign: "center",
  },
  path: {
    fontSize: "sm",
    color: "gray.500",
    textAlign: "center",
    mt: 1,
  },
  toggleSection: {
    justifyContent: "space-between",
    alignItems: "center",
    mt: 4,
  },
  editButton: {
    bg: colorPalette.third,
    color: "#000",
    borderRadius: "5px",
    p: 2,
  },
};

const MainItems = () => {
  const { data } = useMainItems(); // Data is an array of objects

  return (
    <Box sx={styles.container}>
      {/* Top Buttons */}
      <Flex sx={styles.topButtons}>
        <Button sx={styles.button}>
          <Link href="/admin/mainItems/new">آیتم جدید</Link>
        </Button>
      </Flex>

      {/* Flex Layout for Data */}
      <Flex sx={styles.flexLayout}>
        {data?.map((item) => (
          <Box key={item.id} sx={styles.itemBox}>
            {/* Image */}
            <Image src={item.src} alt={item.title} sx={styles.image} />

            {/* Title */}
            <Text sx={styles.title}>{item.title}</Text>

            {/* Path */}
            <Text sx={styles.path}>مسیر: {item.path}</Text>

            {/* Enable Toggle */}
            <Flex sx={styles.toggleSection}>
              <Text>فعال</Text>
              <Box sx={styles.editButton}>
                <Link href={`mainItems/${item.id}`}>تغییر</Link>
              </Box>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default MainItems;
