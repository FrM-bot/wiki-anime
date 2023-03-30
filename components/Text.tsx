import { ReactElement } from 'react'

export const SubtitleCard = ({ children }: { children: ReactElement }) => {
  return (
    <div className='px-4 py-2 border-b bg-tertiary border-secondary my-2 rounded-md'>{children}</div>

  )
}
export const TitleAndDescription = ({ title, description, children }: { title: string, description?: string | number, children?: ReactElement }) => {
  return (
    <div className='flex flex-wrap gap-2'>
      <h3 className='text-center rounded-md bg-secondary grid place-content-center px-4 py-2'>{title}</h3>
      {description && <h4 className='bg-tertiary rounded-md px-4 py-2 shadow-lg'>{description}</h4>}
      {children}
    </div>
  )
}
