import { colorPalette } from "@/assets/constants";
import { ExtraType } from "@/types/extra";
import {
  Card,
  Link as ChakraLink,
  Flex,
  Heading,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";

const styles = {
  card: {
    borderRadius: "5px",
    boxShadow: "lg",
    backgroundColor: "teal.500",
    m: 3,
    p: 4,
    _hover: { boxShadow: "xl", transform: "scale(1.02)" },
    transition: "all 0.3s ease-in-out",
  },
  flexContainer: {
    alignItems: "center",
  },
  title: {
    as: "h4",
    fontSize: "lg",
    color: "white",
    fontWeight: "bold",
    isTruncated: true,
  },
  category: {
    fontSize: "sm",
    fontWeight: "medium",
    color: "gray.200",
    bg: "teal.600",
    px: 3,
    py: 1,
    borderRadius: "full",
  },
  editButton: {
    bg: colorPalette.third,
    color: "white",
    borderRadius: "5px",
    p: 2,
    zIndex: "100",
    _hover: { bg: colorPalette.primary, color: "white" },
    fontWeight: "bold",
    textAlign: "center",
  },
};

const ExtraItemCard = ({ extraObj }: { extraObj: ExtraType }) => {
  return (
    <Card sx={styles.card}>
      <Flex sx={styles.flexContainer}>
        {/* Title and Price */}
        <Heading sx={styles.title}>
          {extraObj.title} - {extraObj.price} تومان
        </Heading>
        <Spacer />

        {/* Category */}
        <Text sx={styles.category}>{extraObj.category}</Text>
        <Spacer />

        {/* Edit Button */}
        <Tooltip label="تغییر" fontSize="sm">
          <ChakraLink
            as={Link}
            href={`extra/${extraObj.id}`}
            sx={styles.editButton}
          >
            تغییر
          </ChakraLink>
        </Tooltip>
      </Flex>
    </Card>
  );
};

export default ExtraItemCard;
