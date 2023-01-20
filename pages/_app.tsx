import "../styles/global.css";
import "../styles/style.css";
import "../styles/prism.css";
import PlausibleProvider from "next-plausible";
import {AppProps} from "next/app";
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PlausibleProvider domain="mindstone.tuancao.me">
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}
