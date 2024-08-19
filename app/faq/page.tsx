"use client";
import { BaseUrl, colorPalette } from "@/assets/constants";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  useTheme,
  Box,
  Flex,
  Icon,
  Image,
  Spacer,
  Text,
  Link,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { CollapsibleRenderer } from "../components/common";

const faq = [
  {
    question: "چه روز هایی صبحانه دارید؟",
    content:
      "دوست عزیز هفت روز هفته از ساعت 8 صبح الی 24 نیروانا یک سره باز می باشد و هر روز با صبحانه بشقابی در خدمتتون هستیم.\n \n( اگر روزی به هر دلیلی تعطیل باشیم در استوری اعلام می کنیم پس لطفا استوری هارا دنبال کنید ) \n \nمنتظرتونیم. به نیروانا سر بزنید.",
  },
  {
    question: "ساعت کاری کافه به چه صورته؟",
    content:
      "دوست عزیز هفت روز هفته از ساعت 8 صبح الی 24 یک سره با صبحانه بشقابی در خدمتتون هستیم.\n \n All day breakfast \n \nمنتظرتونیم به نیروانا سر بزنید.",
  },
];

function FrequentlyAskedQuestions() {
  const theme = useTheme();

  const Url = BaseUrl + "logo.webp";

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      paddingX: "15px",
      background: colorPalette.secondary,
    },
    contentContainer: {
      top: "15px",
      position: "absolute",
      whiteSpace: "pre-wrap",
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      marginY: "5px",
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
    <Box height="100vh">
      <Navbar />
      <Box sx={styles.container}>
        <Box sx={styles.contentContainer}>
          <Image src={Url} sx={styles.image} alt="image" />
          {faq.map((f, index) => (
            <Box sx={styles.textContainer} key={index}>
              <CollapsibleRenderer content={f.content} question={f.question} />
            </Box>
          ))}
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
    </Box>
  );
}

export default FrequentlyAskedQuestions;
