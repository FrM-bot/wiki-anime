import { ReactElement } from 'react'

export const SubtitleCard = ({ children }: { children: ReactElement }) => {
  return (
    <div className='p-2 border-b-[2px] border-b-secondary bg-tertiary my-2'>{children}</div>

  )
}
export const TitleAndDescription = ({ title, description, children }: { title: string, description?: string | number, children?: ReactElement }) => {
  return (
    <div className='flex flex-wrap gap-2'>
      <h3 className='text-center bg-secondary grid place-content-center p-2'>{title}</h3>
      {description && <h4 className='bg-tertiary p-2 shadow-lg shadow-secondary'>{description}</h4>}
      {children}
    </div>
  )
}
