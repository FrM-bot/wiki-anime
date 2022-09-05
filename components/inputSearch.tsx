import SearchIcon from 'icons/Search.icon'
import { ChangeEvent, useRef, useState, useEffect } from 'react'
import { types } from 'utils/types'
import { useRouter } from 'next/router'

const useValues = () => {
  const [inputValue, setInputValue] = useState('')
  const [selectedValue, setSelectedValue] = useState('')

  return {
    setInputValue,
    setSelectedValue,
    inputValue,
    selectedValue
  }
}

export const InputSearch = () => {
  const refInput = useRef<HTMLInputElement | null>(null)
  const refSelect = useRef<HTMLSelectElement | null>(null)
  const router = useRouter()
  const { setInputValue, setSelectedValue, inputValue, selectedValue } = useValues()
  useEffect(() => {
    if (refSelect.current) setSelectedValue(refSelect.current?.value)
    if (router.query.name && typeof router.query.name === 'string') {
      setInputValue(router.query.name)
      refInput.current && (refInput.current.value = 'router.query.name')
    }
  }, [])
  const handlerSearch = () => {
    if (refInput.current) setInputValue(refInput.current.value)
  }
  const handlerSelectType = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    setSelectedValue(event.target.value)
    // refSelect.current && (refSelect.current.value = event.target.value)
    // types.includes(event.target.value) && router.push({ pathname: `/${event.target.value}` })
  }
  const InputSearchComponent = ({ valueSearched }: { valueSearched?: string | undefined }) =>
        <div className='flex gap-[1px]'>
            <select ref={refSelect} name="type" defaultValue={selectedValue || router.query.type} onChange={e => handlerSelectType(e)} className='focus:outline-none rounded-tl-md rounded-bl-md bg-tertiary p-2'>
                {
                    types?.map(type => (<option key={type} value={type}>{type}</option>))
                }
            </select>
            <input ref={refInput} type="search" defaultValue={valueSearched || ''} onKeyDown={e => e.key === 'Enter' && handlerSearch()} className='bg-tertiary w-full p-2 focus:outline-none' /><button onClick={handlerSearch} className='bg-tertiary p-2 rounded-tr-md rounded-br-md hover:shadow-xl hover:shadow-black/50 duration-300'><SearchIcon /></button>
        </div>
  return {
    InputSearchComponent,
    inputValue,
    selectedValue
  }
}
