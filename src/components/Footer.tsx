import React, { CSSProperties } from "react";

const css: CSSProperties = {
  position: "absolute",
  bottom: 0,
  width: "93%",
};

export default function Footer(): JSX.Element {
  return (
    <footer style={css}>
      <p>
        Powered by <a href="https://github.com/turtton/volglass">Volglass</a>, © 2022
      </p>
    </footer>
  );
}
