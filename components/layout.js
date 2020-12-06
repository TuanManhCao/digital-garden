import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback, useMemo } from "react";
import { useWindowWidth } from "../lib/hooks";
const name = '[Can Burak Sofyalioglu]'
export const siteTitle = 'Digital Backroom - An Internet Archive'

export default function Layout({ children, home }) {
    const [isOpen, setIsOpen] = useState(null)
    const toggle = () => setIsOpen(!isOpen)

    const sidebarposition = isOpen ? "0px" : "-250px"
    //console.log("effect: ", isOpen, sidebarposition)

  useEffect(()=>{
    const navbarButtonEl = document.getElementById("nav-button")
    //navbarButtonEl.addEventListener("click", function(){console.log("asd"); setIsOpen(!isOpen); });
    navbarButtonEl.addEventListener("click", () => setIsOpen(!isOpen));
    return navbarButtonEl.removeEventListener("click", () => setIsOpen(!isOpen))
  },[isOpen])

  useEffect(() => {
    const sidebarEl = document.getElementById("sidebar");
    //console.log("sidebar position: ", sidebarposition)
    //if (isOpen){sidebarEl.classList.add("open"); sidebarEl.classList.remove("close");}
    //else {sidebarEl.classList.remove("open"); sidebarEl.classList.add("close")}
    
    if (isOpen){sidebarEl.style.left = sidebarposition;}
    else {sidebarEl.style.left = sidebarposition;}
    
  },[isOpen])

  return (
    <div >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A Digital Backroom of Can Burak Sofyalioglu"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main>{children}</main>

      <footer>
        Created with 
      </footer>
    </div>
  )
}

