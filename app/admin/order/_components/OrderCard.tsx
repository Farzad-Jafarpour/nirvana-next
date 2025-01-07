import { orderType } from "@/types/order";
import {
  Box,
  Button,
  Card,
  CardBody,
  Collapse,
  Flex,
  Heading,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import OrderItemCard from "./OrderItemCard";

const OrderCard = ({
  orderObj,
  handleClick,
}: {
  orderObj: orderType;
  handleClick: (id: number) => void;
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card borderRadius="xl" boxShadow="md" backgroundColor="teal.400" m={2}>
      <CardBody>
        <Flex alignItems="center" cursor="pointer">
          <Heading as="h4" fontSize="lg">
            {orderObj.table}
          </Heading>
          <Spacer />
          <Text onClick={onToggle}>{orderObj.totalPrice}</Text>
          <Spacer />
          <Button onClick={() => handleClick(orderObj.id)}>پرداخت شده</Button>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Box mt={4}>
            {orderObj.orderItems.map((orderItemObj) => (
              <OrderItemCard key={orderItemObj.id} orderItem={orderItemObj} />
            ))}
          </Box>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default OrderCard;
