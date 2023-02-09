import "../styles/global.css";
import "../styles/style.css";
import "../styles/prism.css";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
