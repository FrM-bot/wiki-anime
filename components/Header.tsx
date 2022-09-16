import { ButtonLink } from './Button'
import InputSearch from './inputSearch'

const Header = () => {
  return (
    <header className='sticky top-2 z-20 rounded-lg'>
    <nav className='w-full px-4 flex justify-between items-center z-20 border-b-[1px] border-solid border-tertiary bg-secondary/70 backdrop-blur-sm p-4 rounded-md gap-2 shadow-lg'>
      <ButtonLink href='/'>
        <span className='whitespace-nowrap'>Wiki Anime</span>
      </ButtonLink>
      <ul className='flex gap-4 items-center'>
        <li>
          <InputSearch />
        </li>
      </ul>
    </nav>
  </header>
  )
}

export default Header
