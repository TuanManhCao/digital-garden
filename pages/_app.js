import '../styles/global.css'
import '../styles/webflow-layout.css'


export default function App({ Component, pageProps }) {

  return <Component { ...pageProps} />
}
