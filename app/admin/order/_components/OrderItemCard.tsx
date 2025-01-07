import { orderItemType } from "@/types/order";
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Spacer,
  Box,
  Text,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ExtraItemCard from "./ExtraItemCard";

const OrderItemCard = ({ orderItem }: { orderItem: orderItemType }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card m={2}>
      <CardBody>
        <Flex alignItems="center" onClick={onToggle}>
          <Heading as="h4" fontSize="lg" fontFamily="fontBold">
            {orderItem.price} - {orderItem.quantity}
          </Heading>
          <Spacer />
          <Text>{orderItem.menuItem.title}</Text>
          <Spacer />
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Box mt={4}>
            {orderItem.orderExtraItem.map((orderExtraItemObj) => (
              <ExtraItemCard
                key={orderExtraItemObj.id}
                orderExtraItem={orderExtraItemObj}
              />
            ))}
          </Box>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default OrderItemCard;
