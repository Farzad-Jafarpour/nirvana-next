import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  Box,
  Button,
  Center,
} from "@chakra-ui/react";
import React from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
  details: string;
  existingFoodIndex: number;
  handleAddFood: (isTax: boolean) => void;
  handleRemove: (id: number) => void;
  id: number;
  isTax: boolean;
  foods: any[]; // Adjust the type as per your food store
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src,
  title,
  details,
  existingFoodIndex,
  handleAddFood,
  handleRemove,
  id,
  isTax,
  foods,
}) => {
  const styles = {
    container: {},
    modalBody: {},
    btn: {
      color: " #000000 ",
      bg: "rgba(255, 255, 255,0.8)",
    },
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader padding={"5px"}>
            <Image
              src={src}
              alt="food-image"
              objectFit="cover"
              width="100%"
              borderRadius="md"
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody sx={styles.modalBody} dir="rtl">
            <Box>
              <Text>{title}</Text>
            </Box>
            <Box mt={4}>
              <Text>{details}</Text>
            </Box>
            <Box mt={4}>
              {existingFoodIndex !== -1 && (
                <Center>
                  <Button
                    size="xs"
                    sx={styles.btn}
                    onClick={() => {
                      handleAddFood(isTax);
                    }}
                  >
                    <Text fontSize="3xl" lineHeight="1">
                      +
                    </Text>
                  </Button>
                  <Text fontSize="3xl" lineHeight="1">
                    {foods[existingFoodIndex].count}
                  </Text>
                  <Button
                    size="xs"
                    sx={styles.btn}
                    onClick={() => handleRemove(id)}
                  >
                    <Text fontSize="3xl" lineHeight="1">
                      -
                    </Text>
                  </Button>
                </Center>
              )}
              {existingFoodIndex === -1 && (
                <Button
                  size="xs"
                  sx={styles.btn}
                  onClick={() => {
                    handleAddFood(isTax);
                  }}
                >
                  <Text fontSize="md" lineHeight="1">
                    افزودن به لیست
                  </Text>
                </Button>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ImageModal;
