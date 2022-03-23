import Head from 'next/head'
// import BasicTree from 'lib/MyFolderTree'
export const siteTitle = 'Digital Backroom - An Internet Archive'

export default function Layout({children, home}) {

    return (
        <div>
            <main className="markdown-rendered theme-light">{children}</main>
        </div>
    )
}

