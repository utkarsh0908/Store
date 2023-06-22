import Head from 'next/head'
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({children}) => {
  return (
    <div className='p-[10px]'>
      <Head>
        <title>Store</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className='max-w-[1400px] m-auto w-full'>
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout