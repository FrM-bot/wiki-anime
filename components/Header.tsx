import { ButtonLink } from './Button'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { InputSearch } from './inputSearch'
import { types } from 'utils/types'

// const routes = {
//   anime: '/anime',
//   manga: '/manga'
// }

const Header = () => {
  const router = useRouter()
  // const [type, setType] = useState<string>('')
  const { InputSearchComponent, inputValue, selectedValue } = InputSearch()
  // useEffect(() => setType(typeof router.query.type === 'string' && types.includes(router.query.type) ? router.query.type : 'anime'), [router.query.type])

  useEffect(() => {
    // !selectedValue && router.push(`/search/${refInput.current.value}`)
    // console.log(inputValue, selectedValue, 'in')
    types.includes(selectedValue) && inputValue && router.push({
      pathname: `/${selectedValue}/s/${inputValue}`
    })
  }, [inputValue, selectedValue])

  return (
    <header className='sticky top-2 z-20 rounded-lg'>
    <nav className='w-full px-4 flex justify-between items-center z-20 border-b-[1px] border-solid border-tertiary bg-secondary/80 backdrop-blur-sm p-4 rounded-lg gap-2'>
      <ButtonLink href='/'>
        <h1 className='whitespace-nowrap'>Wiki Anime</h1>
      </ButtonLink>
      <ul className='flex gap-4 items-center'>
        <li>
          <InputSearchComponent />
        </li>
        {/* <li><ButtonLink href={type === 'anime' ? '/anime' : '/manga'}>{type}</ButtonLink></li> */}
        {/* <li>{type}</li> */}
        {/* <li><ButtonLink href='/login'>Login</ButtonLink></li> */}
        {/* <li><a href="/manga">Manga</a></li> */}
        {/* <li><ButtonLink href='/login'>Link 3</ButtonLink></li> */}
      </ul>
    </nav>
  </header>
  )
}

export default Header
