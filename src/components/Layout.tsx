import { CSSProperties } from "react";

const wrapper: CSSProperties = {
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "100%",
  minHeight: "100vh"
}
export default function Layout({ children }): JSX.Element {
  return (
    <div style={wrapper} className="container">
      <main className="theme-light">{children}</main>
    </div>
  );
}
