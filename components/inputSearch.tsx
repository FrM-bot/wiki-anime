import SearchIcon from 'icons/SearchIcon'
import { ChangeEvent, useRef, useState } from 'react'
import { types, TypesSearch } from 'utils/types'
import { useRouter } from 'next/router'
import { validateTypeSearch } from 'utils/validators'

const InputSearch = ({ valueSearched }: { valueSearched?: string | undefined }) => {
  const router = useRouter()
  const refInput = useRef<HTMLInputElement | null>(null)
  const refSelect = useRef<HTMLSelectElement | null>(null)
  const [selectedValue, setSelectedValue] = useState<TypesSearch>(validateTypeSearch(router?.query?.type))
  const handlerSearch = () => {
    if (refInput.current) router.push(`/${selectedValue}/s/${refInput.current.value}`)
  }
  const handlerSelectType = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(validateTypeSearch(event.target.value))
  }
  return (
    <div className='flex gap-[1px]'>
      <select ref={refSelect} name="type" defaultValue={selectedValue} onChange={e => handlerSelectType(e)} className='appearance-none text-center focus:outline-none rounded-tl-md rounded-bl-md bg-tertiary p-2 hover:shadow-xl hover:shadow-black/20 duration-300'>
        {
          types?.map(type => (<option key={type} value={type}>{type}</option>))
        }
      </select>
      <input placeholder='Search' ref={refInput} type="search" defaultValue={valueSearched ?? ''} onKeyDown={e => e.key === 'Enter' && handlerSearch()} className='bg-tertiary w-full p-2 focus:outline-none focus:shadow-xl active:shadow-black/20 duration-300' />
      <button aria-label="search" onClick={handlerSearch} className='bg-tertiary p-2 rounded-tr-md rounded-br-md hover:shadow-xl hover:shadow-black/20 duration-300'><SearchIcon /></button>
    </div>
  )
}

export default InputSearch
