import { DetailsModalProps } from "@/types/types";
import { Center } from "@chakra-ui/react";
import React from "react";

const Details: React.FC<DetailsModalProps> = ({ details }) => {
  const styles = {
    container: {
      flexDirection: "column",
      width: "100%",
      borderRadius: "5px",
      padding: "5px",
    },
  };

  return <Center sx={styles.container}>{details}</Center>;
};

export default Details;
