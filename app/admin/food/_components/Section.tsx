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
} from "@chakra-ui/react";
import React from "react";
import MenuItem from "./MenuItem";

const Section = ({ sectionObj }: { sectionObj: SectionType }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card borderRadius="5px" boxShadow="md" backgroundColor="teal.400" m={2}>
      <CardBody>
        <Flex alignItems="center" onClick={onToggle} cursor="pointer">
          <Heading as="h4" fontSize="lg">
            {sectionObj.title}
          </Heading>
          <Spacer />
          <Text>{sectionObj.category}</Text>
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
