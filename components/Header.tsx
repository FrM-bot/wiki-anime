import InputSearch from './inputSearch'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='sticky top-2 z-20 rounded-lg'>
    <nav className='w-full px-4 flex justify-between items-center z-20 border-b-[1px] border-solid border-tertiary bg-secondary/70 backdrop-blur-sm p-4 rounded-md sm:gap-2 gap-2 shadow-lg'>
      <Link href='/'>
          Wiki Anime
      </Link>
      <InputSearch />
    </nav>
  </header>
  )
}

export default Header
