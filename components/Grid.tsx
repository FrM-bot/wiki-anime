import { ReactElement } from 'react'

function Grid ({ children }: { children: ReactElement }) {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 my-4'>
        {children}
    </div>
  )
}

export default Grid
