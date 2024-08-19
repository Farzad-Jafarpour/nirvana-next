import { Text } from "@chakra-ui/react";
import Link from "next/link";

interface ItemRendererProps {
  item: string;
  path: string;
  styling: object;
}

const ItemRenderer: React.FC<ItemRendererProps> = ({ item, path, styling }) => {
  return (
    <Link href={path}>
      <Text fontSize="2xl" sx={styling}>
        {item}
      </Text>
    </Link>
  );
};

export default ItemRenderer;
