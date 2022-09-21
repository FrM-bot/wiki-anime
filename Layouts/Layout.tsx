import { ReactElement } from 'react'
import Head from 'next/head'
import Header from 'components/Header'
import Footer from 'components/Footer'

interface IProps {
  children: ReactElement
  title: string
}

const Layout = ({ children, title }: IProps) => {
  return (
    <div className='bg-primary text-cyan-50'>
      <div className='lg:max-w-[85vw] 2xl:max-w-[70vw] md:max-w-[96vw] max-w-[95vw] m-auto'>
        <Head>
          <title>{title}</title>
          <meta name="description" content="Welcome! Here you will find information about anime, manga, authors, etc." />
          <link rel="icon" href="/favicon.ico" />
          <meta name="keywords" content="anime, anime-app, anime, manga" />
        </Head>
        <Header />
        <main className='min-h-[100vh] py-8'>
          { children }
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
