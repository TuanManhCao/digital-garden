import Head from 'next/head'
// import BasicTree from 'lib/MyFolderTree'
export const siteTitle = 'Digital Backroom - An Internet Archive'

export default function Layout({children, home}) {

    return (
        <div>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap"
                      rel="stylesheet"/>
            </Head>
            <main className="markdown-rendered theme-light">{children}</main>
        </div>
    )
}

