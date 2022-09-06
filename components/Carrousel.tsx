import { useRef } from 'react'
import { ICarrousel } from 'interfaces/Anime'
import ArrowIcon from 'icons/ArrowIcon'
import { ButtonTransparent } from './Button'
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
    if (!refSlider.current) return

    (refSlider.current.clientWidth + refSlider.current.scrollLeft - refSlider.current.scrollWidth === 0)
      ? refSlider.current.scrollLeft = 0
      : refSlider.current.scrollLeft += 200
  }

  const scrollLeft = () => {
    if (!refSlider.current) return
    (refSlider.current?.scrollLeft !== 0)
      ? (refSlider.current.scrollLeft -= 200)
      : (refSlider.current.scrollLeft += refSlider.current.scrollWidth)
  }
  return (
    <div ref={refSlider} className='flex gap-4 w-full flex-nowrap my-4 overflow-x-scroll snap-x relative lg:h-80 h-64' style={{ scrollBehavior: 'smooth' }} id="container-carrousel">
      <div className='sticky left-0 z-[5] flex-shrink-0 flex-grow-0 rounded grid place-content-center'>
        <ButtonTransparent props={{ onClick: () => scrollLeft() }}><ArrowIcon props={{ style: { transform: 'rotate(180deg)' } }} /></ButtonTransparent>
      </div>
      {
        data?.map((anime) => (
          <div key={anime.mal_id} className='rounded-md snap-center overflow-hidden align-middle flex-shrink-0 flex-grow-0 relative' id={`to-${anime.mal_id}`}>
            <Link href={`/${type || router.query.type}/${anime?.mal_id}`}>
              <a>
                <img className='hover:scale-110 duration-300 h-full aspect-[5/8]' src={anime.images.webp.image_url} alt={anime.title} />
              </a>
            </Link>
            {anime?.topRightgDataCard &&
              <div className='absolute top-2 right-2 bg-tertiary/70 rounded-lg p-1'>
                <span className='text-[.7rem]'>{anime?.topRightgDataCard}</span>
              </div>
            }
            <div className='absolute bottom-2 mx-auto w-full'>
              <div className='mx-2 bg-tertiary/70 rounded-lg'>
                <h2 className='text-sm p-2 overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal duration-300 transition-all'>{anime.title}</h2>
              </div>
            </div>
          </div>
        ))
      }
      <div className='sticky right-1 z-[5] flex-shrink-0 flex-grow-0 rounded grid place-content-center'>
        <ButtonTransparent props={{ onClick: () => scrollRight() }}><ArrowIcon /></ButtonTransparent>
      </div>
    </div>
  )
}

export default Carrousel
