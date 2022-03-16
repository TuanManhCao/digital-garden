import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback, useMemo } from "react";
import { useWindowWidth } from "../lib/hooks";
const name = '[Can Burak Sofyalioglu]'
export const siteTitle = 'Digital Backroom - An Internet Archive'

export default function Layout({ children, home }) {
    const [isOpen, setIsOpen] = useState(null)

  return (
    <div >
      <Head>
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
        Created by <a href="https://www.cbsofyalioglu.com/" title="Personal blog about design and development">cbsofyalioglu</a>
      </footer>
    </div>
  )
}

