import Footer from "./Footer";
import { CSSProperties } from "react";

export default function Layout({ children }): JSX.Element {
  const wrapper: CSSProperties = {
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "100%",
    minHeight: "100vh"
  }
  return (
    <div style={wrapper} className="container">
      <main className="theme-light">{children}</main>
      <Footer/>
    </div>
  );
}
