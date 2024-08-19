import { orderExtraItemType } from "@/types/order";
import { Card, CardBody, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

const ExtraItemCard = ({
  orderExtraItem,
}: {
  orderExtraItem: orderExtraItemType;
}) => {
  useEffect(() => {
    console.log(orderExtraItem);
  }, [orderExtraItem]);
  return (
    <Card m={2} boxShadow="lg">
      <CardBody>
        <Flex alignItems="center">
          <Heading as="h4" fontSize="lg" fontFamily="fontBold">
            {orderExtraItem.price} - {orderExtraItem.quantity}
          </Heading>
          <Spacer />
          <Text>{orderExtraItem.extraItem.title}</Text>
          <Spacer />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ExtraItemCard;
