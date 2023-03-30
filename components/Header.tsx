import InputSearch from './inputSearch'
import Link from '@/components/Link'
import NextLink from 'next/Link'
import User from '@/icons/User'
import { useSession } from 'next-auth/react'

const Header = () => {
  const { data } = useSession()
  return (
    <header className='sticky top-0 z-20 bg-secondary/70 backdrop-blur-sm p-4 border-solid border-tertiary border-b-[1px] shadow-lg'>
      <nav className='w-full flex justify-between items-center z-20 sm:gap-2 gap-2 lg:max-w-[90vw] max-w-[75vw] md:max-w-[95vw] sm:max-w-[95vw] xs:max-w-[95vw] m-auto'>
        <NextLink className='text-white/70 hover:text-white duration-300' href='/'>
          Wiki Anime
        </NextLink>
        <ul className='flex gap-2 items-center'>
          <li>
            <InputSearch />
          </li>
          <li>
            {data?.user?.image
              ? <NextLink href='/profile'>
                <picture><img className='w-10 h-10 rounded-full object-cover' src={data?.user?.image ?? ''} alt={data.user.name ?? ''} /></picture>
              </NextLink>
              : <Link className='block' href='/login'>
                <User />
              </Link>
            }
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
