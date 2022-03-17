import Head from 'next/head'

export const siteTitle = 'Digital Backroom - An Internet Archive'

export default function Layout({children, home}) {

    return (
        <div>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap"
                      rel="stylesheet"/>
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
                <meta name="og:title" content={siteTitle}/>
                <meta name="twitter:card" content="summary_large_image"/>
            </Head>

            <main className="markdown-rendered theme-light">{children}</main>
        </div>
    )
}

