import { ReactElement } from 'react'
import CardDynamic from './CardDynamic'
// import { SubtitleCard } from './Cards'

const SectionInfo = ({ title, children }: { title: string, children: ReactElement }) => {
  return (
    <section className='flex flex-col gap-2'>
      <CardDynamic type='h3' variant='v1'>{title}</CardDynamic>
      {children}
    </section>
  )
}

export default SectionInfo
