"use client";
import React, { useState } from "react";
import { Box, Button, Collapse, Flex, Spacer, Text } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

export interface CollapsProps {
  content: string;
  question: string;
}

const CollapsibleRenderer: React.FC<CollapsProps> = ({ content, question }) => {
  const [show, setShow] = useState(false);

  const styles = {
    btnTextContainer: {
      justifyContent: "flex-start",
      with: "100%",
    },
    textContainer: {
      margin: "5px",
      textAlign: "right",
      whiteSpace: "pre-wrap",
    },
  };

  const handleToggle = () => setShow(!show);
  return (
    <>
      <Flex sx={styles.btnTextContainer}>
        <Button width="100%" dir="rtl" onClick={handleToggle}>
          {question}
          <Spacer />
          {show ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      </Flex>
      <Collapse in={show}>
        <Box dir="rtl" sx={styles.textContainer}>
          <Text>{content}</Text>
        </Box>
      </Collapse>
    </>
  );
};

export default CollapsibleRenderer;
