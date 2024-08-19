import { ItemRenderer } from "@/app/components/common";
import { colorPalette } from "@/assets/constants";
import { Box } from "@chakra-ui/react";

const styles = {
  container: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    background: colorPalette.primary,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50px",
    background: colorPalette.primary,
    borderRadius: "5px",
  },
  content: {
    display: "flex",
    width: "250px",
    background: colorPalette.third,
    marginTop: "5px",
    padding: "5px",
    color: "#000000",
    _hover: {
      background: colorPalette.nav,
    },
  },
};

const SideBar = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>کافه نیروانا</Box>
      <ItemRenderer path="/" item="خانه" styling={styles.content} />
      <ItemRenderer path="/admin/food" item="غذا" styling={styles.content} />

      <ItemRenderer
        styling={styles.content}
        item="افزودنی"
        path="/admin/extra"
      />
      </Box>
  );
};

export default SideBar;
