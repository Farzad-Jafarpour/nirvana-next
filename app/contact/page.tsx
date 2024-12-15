"use client";
import { BaseUrl, colorPalette } from "@/assets/constants";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Spacer,
  Text,
  useTheme,
  Link,
  Image,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Contact = () => {
  const theme = useTheme();

  const Url = BaseUrl + "logo.webp";

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      height: "calc(100vh - 74px)",
      justifyContent: "center",
      alignItems: "center",
      paddingX: "15px",
      background: colorPalette.secondary,
    },
    contentContainer: {
      top: "15px",
      position: "absolute",
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      textAlign: "center",
    },
    content: {
      color: colorPalette.__hover,
      textDecoration: "none",
      borderRadius: "5px",
      padding: "5px",
      marginTop: "8px",
      marginBottom: "5px",
      boxShadow: theme.shadows.md,
      fontSize: "2xl",
      background: colorPalette.third,
    },
    footer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
    },
    footerContent: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      borderRadius: "5px",
      padding: "5px",
      margin: "5px",
      width: "100%",
      fontSize: "4xl",
      boxShadow: theme.shadows.md,
      background: colorPalette.third,
    },
    text: {
      color: colorPalette.__hover,
      fontSize: "2xl",
    },
    icon: {
      marginLeft: theme.space[2],
    },
    image: {
      borderRadius: "5px",
    },
  };

  return (
    <>
      <Navbar />

      <Flex sx={styles.container}>
        <Box sx={styles.container}>
          <Box sx={styles.contentContainer}>
            <Image src={Url} sx={styles.image} alt="image" />
            <Box sx={styles.textContainer}>
              <Text sx={styles.content} dir="rtl">
                اینجا کافه نیرواناس، یک خاطره با طعم خاص، شما دلیل حال خوب
                نیروانا هستید، بهترین! انتخاب بهترینهاست.
              </Text>
            </Box>
            <Box sx={styles.footer}>
              <Flex sx={styles.footerContent} dir="rtl">
                <Icon as={PhoneIcon} sx={styles.icon} />
                <Text sx={styles.text}> کافه:</Text>
                <Spacer />
                <Link href="tel:09370052929" sx={styles.text}>
                  09370052929
                </Link>
              </Flex>
              <Flex sx={styles.footerContent} dir="rtl">
                <Icon as={PhoneIcon} sx={styles.icon} />
                <Text sx={styles.text}>مدیریت: </Text>
                <Spacer />
                <Link href="tel:09148162165" sx={styles.text}>
                  09148162165
                </Link>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Contact;
