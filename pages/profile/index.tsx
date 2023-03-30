import { StatusMyList } from '@/components/AddToMyList'
import CustomCard from '@/components/CustomCard'
import { SubtitleCard } from '@/components/Text'
import { AnimeContext } from 'context/Anime.provider'
import LayoutProfile from 'Layouts/LayoutProfile'
import Link from 'next/link'
import { AnimeStatus } from 'pages/api/my_list/anime/[status]'
import { useContext } from 'react'

function ProfileResume () {
  const { animes } = useContext(AnimeContext)
  return (
    <LayoutProfile>
        <section>
          <SubtitleCard>
            <h2>Statistics</h2>
          </SubtitleCard>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-4'>
              <CustomCard type='h3'>
                Anime
              </CustomCard>
              {
                StatusMyList.anime.map(({ name, value }) => (
                  <Link href={`/profile/anime/${value}`} key={value} className='border-b border-b-white/10 px-4 py-2 rounded flex justify-between items-center hover:bg-secondary/30 duration-300'>
                    <span>{name}</span>
                    <span>{animes[value as AnimeStatus]?.length ?? 0}</span>
                  </Link>
                ))
              }
            </div>
            <div className='flex flex-col gap-4'>
              <CustomCard type='h3'>
                Manga
              </CustomCard>
              {
                StatusMyList.manga.map(({ name, value }) => (
                  <Link href={`/profile/manga/${value}`} key={value} className='border-b border-b-white/10 px-4 py-2 rounded flex justify-between items-center hover:bg-secondary/30 duration-300'>
                    <span>{name}</span>
                    <span>467</span>
                  </Link>
                ))
              }
            </div>
          </div>
        </section>
    </LayoutProfile>
  )
}

export default ProfileResume
