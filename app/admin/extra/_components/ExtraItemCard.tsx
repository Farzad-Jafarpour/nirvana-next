import { ExtraType } from "@/types/extra";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

const ExtraItemCard = ({ extraObj }: { extraObj: ExtraType }) => {
  return (
    <Card
      borderRadius="5px"
      boxShadow="md"
      backgroundColor="teal.400"
      m={2}
      py={2}
      px={3}
    >
      <Flex alignItems="center">
        <Heading as="h4" fontSize="md">
          {extraObj.title} - {extraObj.price}
        </Heading>
        <Spacer />
        <Text>{extraObj.category}</Text>
        <Spacer />
        <Box bg="white" borderRadius="xl" p={2}>
          <Link href={`extra/${extraObj.id}`}>تغییر</Link>
        </Box>
      </Flex>
    </Card>
  );
};

export default ExtraItemCard;
