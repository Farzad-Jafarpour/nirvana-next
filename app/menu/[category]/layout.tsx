import { Box } from "@chakra-ui/react";
import Header from "./Header/Header";

interface MenuLayoutProps {
  params: { category: string };
  children: React.ReactNode;
}

const MenuLayout = ({ params, children }: MenuLayoutProps) => {
 

  const styles = {
    container: {
      position: "fixed",
      right: "0",
      left: "0",
      zIndex: "1000",
    },
    content: {
      position: "absolute",
      top: "100px",
      overflow: "hidden",
      marginTop: "10px",
      width: "100%",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
    },
  };

  return (
    <Box>
      <Box sx={styles.container}>
        <Header />
      </Box>
      <Box sx={styles.content}>{children}</Box>
    </Box>
  );
};

export default MenuLayout;
