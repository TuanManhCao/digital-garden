import React, { CSSProperties } from "react";

const css: CSSProperties = {
  position: "absolute",
  top: "auto",
  bottom: 0,
  width: "100%",
  textAlign: "center",
  backgroundColor: "rgb(231, 242, 250)",
};

export default function Footer(): JSX.Element {
  return (
    <footer style={css}>
      Powered by <a href="https://github.com/turtton/volglass">Volglass</a>, © 2023
    </footer>
  );
}
