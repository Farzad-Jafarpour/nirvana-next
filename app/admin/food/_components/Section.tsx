import { SectionType } from "@/types/section";
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Spacer,
  Collapse,
  Box,
  useDisclosure,
  Text,
  IconButton,
  Divider,
  Tooltip,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import React from "react";
import MenuItem from "./MenuItem";
import { colorPalette } from "@/assets/constants";
import NextLink from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const styles = {
  card: {
    borderRadius: "5px",
    boxShadow: "lg",
    backgroundColor: colorPalette.secondary,
    color: colorPalette.nav,
    m: 4,
    overflow: "hidden",
    _hover: { boxShadow: "xl", transform: "scale(1.02)" },
    transition: "all 0.3s ease-in-out",
  },
  flex: {
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    p: 3,
    borderRadius: "5px",
    _hover: { backgroundColor: colorPalette.primary },
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
    color: colorPalette.nav,
    flex: 1,
  },
  text: {
    fontSize: "sm",
    fontWeight: "bold",
    color: "gray.700",
  },
  editLink: {
    bg: colorPalette.third,
    color: "white",
    borderRadius: "5px",
    p: 2,
    zIndex: "100",
    fontWeight: "bold",
    textAlign: "center",
    _hover: { bg: colorPalette.primary, color: "white" },
  },
  iconButton: {
    m: 2,
    bg: colorPalette.third,
    color: "white",
    borderRadius: "50%",
    _hover: { bg: colorPalette.primary },
    size: "sm",
  },
  collapseBox: {
    mt: 4,
    pl: 4,
  },
  noItemsText: {
    color: "gray.600",
    fontSize: "sm",
    textAlign: "center",
  },
};

const Section = ({ sectionObj }: { sectionObj: SectionType }) => {
  const { isOpen, onToggle } = useDisclosure();

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card sx={styles.card}>
      <CardBody>
        <Flex sx={styles.flex} onClick={onToggle}>
          {/* Image Badge */}
          <Box sx={styles.imageBadge}>
            <Image
              src={sectionObj.icon}
              alt={sectionObj.title}
              objectFit="cover"
              w="100%"
              h="100%"
            />
          </Box>

          {/* Section Title */}
          <Heading sx={styles.heading}>{sectionObj.title}</Heading>

          <Spacer />

          {/* Section Category */}
          <Text sx={styles.text}>{sectionObj.category}</Text>

          <Spacer />

          {/* Edit Link */}
          <Tooltip label="تغییر" fontSize="sm">
            <ChakraLink
              as={NextLink}
              href={`categories/${sectionObj.id}`}
              sx={styles.editLink}
              onClick={handleLinkClick}
            >
              تغییر
            </ChakraLink>
          </Tooltip>

          {/* Toggle Collapse Button */}
          <Tooltip label={isOpen ? "بستن" : "باز کردن"} fontSize="sm">
            <IconButton
              aria-label="Toggle collapse"
              icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              sx={styles.iconButton}
            />
          </Tooltip>
        </Flex>

        {/* Divider for separation */}
        <Divider mt={3} mb={3} />

        {/* Collapsible Menu Items */}
        <Collapse in={isOpen} animateOpacity>
          <Box sx={styles.collapseBox}>
            {sectionObj.menuItems.length > 0 ? (
              sectionObj.menuItems.map((menuItemObj) => (
                <MenuItem key={menuItemObj.id} food={menuItemObj} />
              ))
            ) : (
              <Text sx={styles.noItemsText}>آیتمی موجود نیست</Text>
            )}
          </Box>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default Section;
