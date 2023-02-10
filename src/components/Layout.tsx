import { useCurrentTheme } from "./ThemeSwitcher";
import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export default function Layout({ children }): JSX.Element {
  const currentTheme = useCurrentTheme();
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: currentTheme,
          primary: {
            main: purple[500],
          },
        },
      }),
    [currentTheme],
  );
  return (
    <div className="fixed grid h-full min-h-full w-full grid-cols-1 grid-rows-1 flex-row overflow-hidden">
      <ThemeProvider theme={muiTheme}>
        <main className={currentTheme === "dark" ? "theme-dark" : "theme-light"}>{children}</main>
      </ThemeProvider>
    </div>
  );
}
