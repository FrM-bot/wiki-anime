import { ReactElement } from 'react'

export const TitleAndDescription = ({ title, description, children }: { title: string, description?: string | number, children?: ReactElement }) => {
  return (
    <div className='flex flex-wrap gap-2'>
      <h3 className='text-center rounded-md bg-secondary grid place-content-center px-4 py-2'>{title}</h3>
      {description && <h4 className='bg-tertiary rounded-md px-4 py-2 shadow-lg'>{description}</h4>}
      {children}
    </div>
  )
}
