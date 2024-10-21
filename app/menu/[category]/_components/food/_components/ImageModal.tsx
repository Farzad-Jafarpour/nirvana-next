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
} from "@chakra-ui/react";
import React from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
  details: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src,
  title,
  details,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> <Image
            src={src}
            alt="food-image"
            objectFit="cover"
            width="100%"
            borderRadius="md"
          /></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
         {title}
          <Box mt={4}>
            <Text>{details}</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
