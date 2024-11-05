import { ExtraItemType } from "@/types/extra";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  CustomComponent: React.ComponentType<any>;
  category: string;
  foodId: number | null;
  extraItems: ExtraItemType[];
}

const styles = {
  content: {
    height: "80%",
    margin: "5px",
    borderRadius: "5px",
    direction: "rtl",
    overflowY: "scroll",
  },

  closeBtn: {
    color: "#000",
  },
  modalHeader: {
    marginTop: "10px",
    marginX: "20px",
    color: "#000",
  },
};

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  CustomComponent,
  category,
  foodId,
  extraItems,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader sx={styles.modalHeader} dir="rtl">
          محتویات اضافه
        </ModalHeader>
        <ModalCloseButton sx={styles.closeBtn} />
        <ModalBody>
          <CustomComponent
            categoryTitle={category}
            foodId={foodId}
            extraItems={extraItems}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
