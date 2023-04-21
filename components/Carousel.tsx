import { useRef } from 'react'
import { ICarrousel } from 'interfaces/Anime'
import ArrowIcon from '../icons/ArrowIcon'
import Button from './Button'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  data: ICarrousel[]
  type?: 'anime' | 'manga' | 'character'
}

const Carrousel = ({ data, type }: Props) => {
  const router = useRouter()
  const refSlider = useRef<HTMLDivElement>(null)

  const scrollRight = () => {
    if (refSlider.current) {
      refSlider.current.scrollWidth === refSlider.current.clientWidth + refSlider.current.scrollLeft
        ? refSlider.current.scrollTo({ left: 0 })
        : refSlider.current.scrollTo({ left: refSlider.current.scrollLeft + 300 })
    }
  }

  const scrollLeft = () => {
    if (refSlider.current) {
      refSlider.current?.scrollLeft !== 0
        ? refSlider.current.scrollTo({ left: refSlider.current.scrollLeft - 300 })
        : refSlider.current.scrollTo({ left: refSlider.current.scrollWidth })
    }
  }

  return (
    <div className='relative flex items-center'>

      <div className='absolute left-1 z-[5] flex-shrink-0 flex-grow-0 rounded grid place-content-center'>
        <Button variant='Transparent' props={{ onClick: () => scrollLeft(), 'aria-label': 'arrow' }}><ArrowIcon props={{ style: { transform: 'rotate(180deg)', width: 35, height: 35 } }} /></Button>
      </div>
      <div ref={refSlider} className='flex gap-4 w-full flex-nowrap my-4 overflow-x-scroll snap-x relative h-96 sm:h-80 xs:h-72' style={{ scrollBehavior: 'smooth' }} id="container-carrousel">
        {
          data?.map((anime) => (
            <div key={anime.mal_id} className='rounded-md snap-center overflow-hidden align-middle flex-shrink-0 flex-grow-0 relative' id={`to-${anime.mal_id}`}>
              <Link href={`/${type || router.query.type}/${anime?.mal_id}`}>
                <img className='hover:scale-110 duration-300 h-full' src={anime.images.webp.image_url} alt={anime.title} />
              </Link>
              {anime?.topRightgDataCard &&
                <div className='absolute top-2 right-2 bg-tertiary/70 rounded-lg p-1 grid place-content-center'>
                  <span className='text-[1rem]'>{anime?.topRightgDataCard}</span>
                </div>
              }
              <div className='absolute bottom-2 mx-auto w-full'>
                <div className='mx-2 bg-tertiary/70 rounded-lg'>
                  <h2 className='text-sm p-2 overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal duration-300 transition-all text-[1.4rem]'>{anime.title}</h2>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='absolute right-1 z-[5] flex-shrink-0 flex-grow-0 rounded grid place-content-center'>
        <Button variant='Transparent' props={{ onClick: () => scrollRight(), 'aria-label': 'arrow' }}><ArrowIcon props={{ width: 35, height: 35 }} /></Button>
      </div>
    </div>
  )
}

export default Carrousel
