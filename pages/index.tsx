import Layout from 'Layouts/Layout'
import Link from 'next/link'

const Index = () => {
  return (
    <Layout>
        <div className='flex justify-center'>
            <div className='flex w-fit text-xl'>
              <Link href='/anime'>
                <a className='rounded-tl-2xl rounded-bl-2xl bg-primary hover:shadow-xl hover:shadow-black/40 py-2 px-4 border-[#202020] border-[2px] duration-300'>Anime</a>
              </Link>
              <Link href='/manga'>
                <a className='rounded-tr-2xl rounded-br-2xl bg-primary hover:shadow-xl hover:shadow-black/40 py-2 px-4 border-[#202020] border-[2px] duration-300'>Manga</a>
              </Link>
              {/* <button className='rounded-tl-2xl rounded-bl-2xl bg-primary hover:shadow-xl hover:shadow-black/40 py-2 px-4 border-[#202020] border-[2px]'></button>
              <button className='rounded-tr-2xl rounded-br-2xl bg-primary hover:shadow-xl hover:shadow-black/40 py-2 px-4 border-[#202020] border-[2px]'></button> */}
            </div>
        </div>
    </Layout>
  )
}

export default Index
