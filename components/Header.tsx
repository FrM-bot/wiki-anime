import InputSearch from './inputSearch'
import Link from '@/components/Link'
// import User from '@/icons/User'
// import { useAuth } from 'Layouts/LayoutProfile'

const Header = () => {
  // const { data } = useAuth({})
  return (
    <header className='sticky top-0 z-20 bg-secondary/70 backdrop-blur-sm p-4 border-solid border-tertiary border-b-[1px] shadow-lg'>
      <nav className='w-full flex justify-between items-center z-20 sm:gap-2 gap-2 lg:max-w-[90vw] max-w-[75vw] md:max-w-[95vw] sm:max-w-[95vw] xs:max-w-[95vw] m-auto'>
        <Link href='/'>
          Wiki Anime
        </Link>
        <ul className='flex gap-2 items-center'>
          <li>
            <InputSearch />
          </li>
          {/* <li>
            {data?.user?.image
              ? <Link href='/profile'>
                <picture><img className='w-10 h-10 rounded-full object-cover' src={data?.user?.image ?? ''} alt={data.user.name ?? ''} /></picture>
              </Link>
              : <Link className='block' href='/login'>
                <User />
              </Link>
            }
          </li> */}
        </ul>
      </nav>
    </header>
  )
}

export default Header
