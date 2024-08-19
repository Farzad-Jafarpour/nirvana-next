import { orderType } from "@/types/order";
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Spacer,
  Collapse,
  Box,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import OrderItemCard from "../order/_components/OrderItemCard";

const PaidOrderCard = ({
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
          <Button onClick={() => handleClick(orderObj.id)}>آماده شده</Button>
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

export default PaidOrderCard;
