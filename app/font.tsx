import * as React from "react";
import { Global } from "@emotion/react";

const Fonts: React.FC = () => (
  <Global
    styles={`
      @font-face {
        font-family: "BMehr";
        src: url("/fonts/BMehrBold.ttf")
          format("truetype");
        font-weight: 900;
        font-style: normal;
        font-display: normal;
      }
      @font-face {
        font-family: "BNazanin";
        src: url("/fonts/BNazanin.ttf")
          format("truetype");
        font-weight: 900;
        font-style: normal;
        font-display: normal;
      }
      @font-face {
        font-family: "BYekan";
        src: url("/fonts/Byekan.ttf")
          format("truetype");
        font-weight: 900;
        font-style: normal;
        font-display: normal;
      }
      `}
  />
);

export default Fonts;
