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
} from "@chakra-ui/react";
import React from "react";
import MenuItem from "./MenuItem";
import { colorPalette } from "@/assets/constants";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const Section = ({ sectionObj }: { sectionObj: SectionType }) => {
  const { isOpen, onToggle } = useDisclosure();

  // Function to stop the event from propagating to parent elements
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      borderRadius="5px"
      boxShadow="md"
      backgroundColor={colorPalette.secondary}
      color={colorPalette.nav}
      m={2}
    >
      <CardBody>
        <Flex alignItems="center" onClick={onToggle} cursor="pointer">
          <Heading as="h4" fontSize="lg">
            {sectionObj.title}
          </Heading>
          <Spacer />
          <Text>{sectionObj.category}</Text>
          <Spacer />

          <Box
            bg={colorPalette.nav}
            color={"#000"}
            borderRadius="5px"
            p={2}
            zIndex="100"
            onClick={handleLinkClick} // Prevent event propagation
          >
            <Link href={`categories/${sectionObj.id}`}>تغییر</Link>
          </Box>

          <IconButton
            aria-label="Toggle collapse"
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={onToggle}
            m={2}
            bg={colorPalette.nav}
            color={"#000"}
            borderRadius="5px"
            _hover={{ bg: colorPalette.primary }}
          />
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Box mt={4}>
            {sectionObj.menuItems.map((menuItemObj) => (
              <MenuItem key={menuItemObj.id} food={menuItemObj} />
            ))}
          </Box>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default Section;
