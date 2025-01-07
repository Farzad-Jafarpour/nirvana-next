import { colorPalette } from "@/assets/constants";
import { MenuItemType } from "@/types/menu";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Spacer,
  Text,
  Tooltip,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const styles = {
  card: {
    bg: colorPalette.third,
    color: colorPalette.nav,
    m: 2,
    borderRadius: "5px",
    boxShadow: "lg",
    overflow: "hidden",
    _hover: { boxShadow: "xl", transform: "scale(1.02)" },
    transition: "all 0.3s ease-in-out",
  },
  flex: {
    alignItems: "center",
    p: 3,
  },
  imageBadge: {
    w: "50px",
    h: "50px",
    borderRadius: "full",
    overflow: "hidden",
    boxShadow: "md",
    border: `2px solid ${colorPalette.secondary}`,
    ml: 4,
    flexShrink: 0,
  },
  heading: {
    as: "h4",
    fontSize: "lg",
    fontFamily: "fontBold",
    color: colorPalette.nav,
    isTruncated: true,
  },
  availabilityText: (isAvailable: boolean) => ({
    fontSize: "sm",
    fontWeight: "bold",
    color: isAvailable ? "green.600" : "red.600",
  }),
  editButton: {
    bg: colorPalette.secondary,
    color: "white",
    borderRadius: "5px",
    p: 2,
    _hover: { bg: colorPalette.primary, color: "white" },
    fontWeight: "bold",
    textAlign: "center",
    transition: "background-color 0.3s",
  },
};

const MenuItem = ({ food }: { food: MenuItemType }) => {
  return (
    <Card sx={styles.card}>
      <CardBody>
        <Flex sx={styles.flex}>
          {/* Image Badge */}
          <Box sx={styles.imageBadge}>
            <Image
              src={food.src}
              alt={food.title}
              objectFit="cover"
              w="100%"
              h="100%"
            />
          </Box>

          {/* Title and Price */}
          <Flex flex="1" flexDirection="column" justifyContent="center">
            <Heading sx={styles.heading}>
              {food.title} - {food.price} تومان
            </Heading>
          </Flex>

          <Spacer />

          {/* Availability Status */}
          <Tooltip
            label={
              food.isAvailable ? "این آیتم موجود است" : "این آیتم موجود نیست"
            }
            fontSize="sm"
          >
            <Text sx={styles.availabilityText(food.isAvailable)}>
              {food.isAvailable ? "موجود" : "ناموجود"}
            </Text>
          </Tooltip>

          <Spacer />

          {/* Edit Button */}
          <Tooltip label="ویرایش آیتم" fontSize="sm">
            <ChakraLink
              as={Link}
              href={`food/${food.id}`}
              sx={styles.editButton}
            >
              تغییر
            </ChakraLink>
          </Tooltip>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MenuItem;
