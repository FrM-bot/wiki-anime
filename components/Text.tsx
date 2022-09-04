import { ReactElement } from 'react'

export const SubtitleCard = ({ children }: { children: ReactElement }) => {
  return (
      <div className='p-2 border-b-[2px] border-b-secondary bg-tertiary my-2'>{children}</div>

  )
}
