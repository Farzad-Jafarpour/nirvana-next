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

const reserveData = [
  {
    question: "رزرو مراسمات به چه صورت است؟",
    content:
      "سلام وقتتون بخیر\n امیدوارم که حالتون عالی باشه\nبرای رزرو مراسمات می تونید از یک هفته قبل تا خود روز مراسم ( در صورت تکمیل نشدن ظرفیت ) به ما اطلاع بدید و مبلغ بیانه ( 50 هزار تومان به ازای هر نفر) رو واریز کنید این مبلغ وقتی تشریف بیارید خدمتتون برگشت داده میشه و رزرو کافه هزینه ای براتون نداره فقط در صورت کنسلی این مبلغ داده نمیشه .\nما میزتون رو به صورت رایگان با گل خشک و شمع تزیین می کنیم. برای رزرو می تونید میزتون رو تو طبقه اول ( سیگار ممنوع ) یا طبقه دوم ( سیگار ازاد ) انتخاب کنید. شما می تونید قبل مراسم کیک رو به کافه تحویل بدید و اگه خواستید می تونید یک استند بادکنک کوچیک یا تعدادی بادکنک با خودتون بیارید.",
  },
  {
    question: "شرایط رزرو به چه صورت است؟",
    content:
      "-اگر هیچ سفارشی از منو نداشته باشید برای هر یک ساعت نفری 50 تومان هزینه گرفته می شه.\n -اگر ظروف مورد استفاده تولد رو هم که شامل بشقاب و کارد و چنگال از ما بخواین برای هر نفر حق سرویس دریافت می شه ( که مبلغش 15 هزار تومان برای هر سرویس ) البته میز هایی که تعدادشون زیاده و یا سفارش بالایی دارن شامل تخفیف هم می شن.\n -اجاره یک طبقه یا کل کافه به طور اختصاصی امکان پذیر نیست. \n -بزن و برقص نداریم.",
  },
];
function Reservation() {
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
          {reserveData.map((f, index) => (
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

export default Reservation;
