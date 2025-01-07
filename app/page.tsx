"use client";

import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Center, Icon, Link, Heading } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import { CollapsibleRenderer, ToastRenderer } from "./components/common";
import { faq, reserveData } from "@/assets/staticData";

const styles = {
  heroSection: {
    position: "relative",
    height: "100vh",
    bgImage: "url('http://nirvanacafe.ir/uploads/land.webp')",
    bgSize: "cover",
    bgPosition: "center",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bgGradient: "linear(to-b, rgba(0, 0, 0, 0.6), transparent)",
  },
  heroContent: {
    height: "100%",
    flexDirection: "column",
    color: "white",
    textAlign: "center",
    background: "rgba(0, 0, 0, 0.6)",
  },
  heading: {
    fontSize: ["3xl", "4xl", "5xl"],
    fontWeight: "bold",
    mb: 4,
  },
  subHeading: {
    fontSize: ["lg", "xl"],
    mb: 6,
    maxW: "500px",
  },
  sectionContainer: {
    py: 10,
    bg: "white",
    position: "relative",
    zIndex: 1,
  },
  headerBox: {
    textAlign: "center",
    py: 4,
    bg: "white",
    borderRadius: "md",
    boxShadow: "sm",
  },
  headerText: {
    fontSize: "3xl",
    fontWeight: "bold",
    color: "teal.600",
  },
  faqBox: {
    p: 4,
    borderWidth: "1px",
    borderRadius: "lg",
    boxShadow: "md",
    _hover: { boxShadow: "xl", transform: "translateY(-5px)" },
    transition: "all 0.3s",
  },
  reservationBox: {
    p: 4,
    borderWidth: "1px",
    borderRadius: "lg",
    bg: "white",
    boxShadow: "md",
    _hover: { boxShadow: "xl", transform: "translateY(-5px)" },
    transition: "all 0.3s",
  },
  footer: {
    bg: "teal.600",
    color: "white",
    py: 4,
    mt: 10,
  },
  footerLink: {
    justify: "center",
    gap: 6,
    mb: 2,
  },
  footerText: {
    fontSize: "sm",
  },
};

function Home() {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={styles.heroSection}>
        <Navbar />
        <Box sx={styles.gradientOverlay} />
        <Center sx={styles.heroContent}>
          <Heading sx={styles.heading}>اینجا کافه نیرواناس</Heading>
          <Text sx={styles.subHeading}>
            یک خاطره با طعم خاص، شما دلیل حال خوب نیروانا هستید، بهترین! انتخاب
            بهترینهاست
          </Text>
        </Center>
      </Box>

      {/* Menu Section */}
      <Box sx={styles.sectionContainer}>
        <Box sx={styles.headerBox}>
          <Heading sx={styles.headerText}>منو کافه ما</Heading>
        </Box>
        <Carousel />
      </Box>

      {/* FAQ Section */}
      <Box py={10} px={6} bg="white">
        <Heading textAlign="center" mb={8} fontSize="3xl" color="teal.600">
          سوالات پر تکرار
        </Heading>
        <Flex direction="column" gap={6}>
          {faq.map((item, index) => (
            <Box key={index} sx={styles.faqBox}>
              <CollapsibleRenderer
                question={item.question}
                content={item.content}
              />
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Reservation Section */}
      <Box py={10} px={6} bg="gray.50">
        <Heading textAlign="center" mb={8} fontSize="3xl" color="teal.600">
          شرایط رزرو
        </Heading>
        <Flex direction="column" gap={6}>
          {reserveData.map((item, index) => (
            <Box key={index} sx={styles.reservationBox}>
              <CollapsibleRenderer
                question={item.question}
                content={item.content}
              />
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Footer */}
      <Box sx={styles.footer}>
        <Center sx={styles.footerLink}>
          <Link href="tel:09370052929" isExternal>
            <Flex align="center">
              <Icon as={PhoneIcon} mr={2} /> کافه: 09370052929
            </Flex>
          </Link>
          <Link href="tel:09148162165" isExternal>
            <Flex align="center">
              <Icon as={PhoneIcon} mr={2} /> مدیریت: 09148162165
            </Flex>
          </Link>
        </Center>
        <Center sx={styles.footerText}>Powered By Mitena</Center>
      </Box>

      {/* Toast */}
      {showToast && <ToastRenderer content="به نیروانا خوش آمدید" />}
    </Box>
  );
}

export default Home;
