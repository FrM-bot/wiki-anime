import { ReactElement } from 'react'

function Grid ({ children }: { children: ReactElement }) {
  return (
    <div className='grid xs:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 my-4'>
        {children}
    </div>
  )
}

export default Grid
