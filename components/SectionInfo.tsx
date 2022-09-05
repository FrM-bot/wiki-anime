import { ReactElement } from 'react'
import { SubtitleCard } from './Text'

const SectionInfo = ({ title, children }: { title: string, children: ReactElement }) => {
  return (
    <section className='flex flex-col gap-2'>
      <SubtitleCard><h3>{title}</h3></SubtitleCard>
      {children}
    </section>
  )
}

export default SectionInfo
