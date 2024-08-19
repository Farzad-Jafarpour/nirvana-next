import { MenuItemType } from "@/types/menu";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const MenuItem = ({ food }: { food: MenuItemType }) => {
  return (
    <Card m={2}>
      <CardBody>
        <Flex alignItems="center">
          <Heading as="h4" fontSize="lg" fontFamily="fontBold">
            {food.title} - {food.price}
          </Heading>
          <Spacer />
          <Text>{food.isAvailable === true ? "موجود" : "ناموجود"}</Text>
          <Spacer />
          <Box bg="teal.400" borderRadius="xl" p={2}>
            <Link href={`food/${food.id}`}>تغییر</Link>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MenuItem;
