import SearchIcon from 'icons/SearchIcon'
import { ChangeEvent, useRef, useState } from 'react'
import { types, TypesSearch } from 'utils/types'
import { useRouter } from 'next/router'
import { validateTypeSearch } from './Search.page'

// const useValues = () => {
//   const router = useRouter()
//   const [inputValue, setInputValue] = useState('')
//   const [selectedValue, setSelectedValue] = useState<TypesSearch>(validateTypeSearch(router?.query?.type))

//   return {
//     setInputValue,
//     setSelectedValue,
//     inputValue,
//     selectedValue
//   }
// }

const InputSearch = ({ valueSearched }: { valueSearched?: string | undefined }) => {
  const router = useRouter()
  const refInput = useRef<HTMLInputElement | null>(null)
  const refSelect = useRef<HTMLSelectElement | null>(null)
  const [selectedValue, setSelectedValue] = useState<TypesSearch>(validateTypeSearch(router?.query?.type))
  // const { setInputValue, setSelectedValue, inputValue, selectedValue } = useValues()
  // useEffect(() => {
  // if (refSelect.current) setSelectedValue(validateTypeSearch(refSelect.current?.value))
  // if (router.query.name && typeof router.query.name === 'string') {
  // setInputValue(router.query.name)
  //     refInput.current && (refInput.current.value = router.query.name)
  //   }
  // }, [])
  const handlerSearch = () => {
    // if (refInput.current) setInputValue(refInput.current.value)
    if (refInput.current) router.push(`/${selectedValue}/s/${refInput.current.value}`)
  }
  const handlerSelectType = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(validateTypeSearch(event.target.value))
  }
  return (

    <div className='flex gap-[1px]'>
      <select ref={refSelect} name="type" defaultValue={selectedValue} onChange={e => handlerSelectType(e)} className='focus:outline-none rounded-tl-md rounded-bl-md bg-tertiary p-2'>
        {
          types?.map(type => (<option key={type} value={type}>{type}</option>))
        }
      </select>
      <input ref={refInput} type="search" defaultValue={valueSearched || ''} onKeyDown={e => e.key === 'Enter' && handlerSearch()} className='bg-tertiary w-full p-2 focus:outline-none' /><button onClick={handlerSearch} className='bg-tertiary p-2 rounded-tr-md rounded-br-md hover:shadow-xl hover:shadow-black/50 duration-300'><SearchIcon /></button>
    </div>
  )
}

export default InputSearch
