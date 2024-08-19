import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { colorPalette } from "@/assets/constants";
import { DetailsModalProps } from "@/types/types";

const styles = {
  container: {
    items: "center",
    justify: "center",
    flexDirection: "column",
    width: "100%",
    height: "400px",
    paddingY: "5px",
    marginTop: "20%",
    borderRadius: "5px",
  },
  modalOverlay: {
    bg: "rgba(0, 0, 0, 0.6)", // Adjust the opacity (fourth value) to change transparency
  },
  content: {
    display: "flex",
    items: "center",
    justify: "center",
    borderRadius: "5px",
    bg: colorPalette.primary,
  },
  items: {
    items: "center",
    justify: "center",
    padding: "15px",
    margin: "5px",
    color: colorPalette.nav,
    fontSize: "2xl",
  },
  btn: {
    margin: "5px",
    background: colorPalette.nav,
    color: "#000000",
    colorScheme: colorPalette.third,
    borderRadius: "5px",
  },
  closeBtn: {
    color: "#000000",
  },
  modalHeader: {
    marginY: "15px",
    marginX: "25px",
    fontSize: "2xl",
    color: colorPalette.nav,
  },
  modalFooter: {
    display: "flex",
    items: "center",
    justify: "center",
  },

  totalPriceContainer: {
    margin: "5px",
    background: colorPalette.nav,
    color: "#000000",
    borderRadius: "5px",
    padding: "5px",
  },
};

const DetailsModal: React.FC<DetailsModalProps> = ({
  isOpen,
  onClose,
  category,
  details,
  CustomComponent,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay sx={styles.modalOverlay} />
      <ModalContent sx={styles.content}>
        <ModalCloseButton />
        <ModalBody sx={styles.items}>
          {CustomComponent && <CustomComponent details={details} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailsModal;
