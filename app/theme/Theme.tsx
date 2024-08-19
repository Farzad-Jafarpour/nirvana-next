import { extendTheme } from "@chakra-ui/react";
import { modalTheme } from "./ModalTheme";
import { selectTheme } from "./SelectTheme";
import { fileInputTheme } from "./FileInputTheme";

const theme = extendTheme({
  fonts: {
    heading: `'BMehr', 'BNazanin','BYekan', sans-serif`,
    body: `'BMehr','BNazanin','BYekan', sans-serif`,
  },
  components: { Modal: modalTheme, Select: selectTheme, Input: fileInputTheme },
});

export default theme;
