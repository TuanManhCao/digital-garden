import '../styles/global.css'
import '../styles/style.css'


export default function App({ Component, pageProps }) {

  return <Component { ...pageProps} />
}
