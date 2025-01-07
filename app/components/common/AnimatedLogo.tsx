import { BaseUrl } from "@/assets/constants";
import { Box, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const styles = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    textAlign: "center",
  },
};

const AnimatedLogo: React.FC = () => {
  const Url = BaseUrl + "logo.webp";

  return (
    <Box sx={styles.container}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
      >
        <Link href={"/menu/menuitems"}>
          <Image
            src={Url}
            borderRadius="5px"
            minWidth="180px"
            minHeight="180px"
            boxSize="170px"
            p={0.5}
            alt="Logo"
          />
        </Link>
      </motion.div>
    </Box>
  );
};

export default AnimatedLogo;
