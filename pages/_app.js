import "../styles/global.css";
import "../styles/style.css";
import "../styles/prism.css";
import PlausibleProvider from "next-plausible";
export default function App({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="mindstone.tuancao.me">
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}
