import { Button } from './Button'
import { useRouter } from 'next/router'
// import { useEffect } from 'react'
import InputSearch from './inputSearch'
// import { types } from 'utils/types'

const Header = () => {
  const router = useRouter()
  // const { InputSearchComponent, inputValue, selectedValue } = InputSearch()

  // useEffect(() => {
  //   types.includes(selectedValue) && inputValue && router.push({
  //     pathname: `/${selectedValue}/s/${inputValue}`
  //   })
  // }, [inputValue, selectedValue])

  return (
    <header className='sticky top-2 z-20 rounded-lg'>
    <nav className='w-full px-4 flex justify-between items-center z-20 border-b-[1px] border-solid border-tertiary bg-secondary/70 backdrop-blur-sm p-4 rounded-md gap-2 shadow-lg'>
      <Button props={{ onClick: () => router.push('/') }}>
        <span className='whitespace-nowrap'>Wiki Anime</span>
      </Button>
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
