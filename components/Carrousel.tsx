import { useRef } from 'react'
import { ICarrousel } from 'interfaces/Anime'

interface Props {
    animes: ICarrousel[]
}

const Carrousel = ({ animes }: Props) => {
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
    <div ref={refSlider} className='flex gap-4 w-full flex-nowrap my-4 overflow-x-scroll snap-x relative' style={{ scrollBehavior: 'smooth' }} id="container-carrousel">
          <div className='sticky left-0 z-[5] bg-[#11111184] flex-shrink-0 flex-grow-0 p-4 backdrop-blur-sm duration-300 rounded grid place-content-center'>
            <button onClick={scrollLeft}>Next</button>
          </div>
          {
            animes?.map((anime) => (
              <div key={anime.mal_id} className='rounded-md snap-center overflow-hidden block align-middle flex-shrink-0 flex-grow-0 relative' id={`to-${anime.mal_id}`}>
                <img className='hover:scale-110 duration-300 h-full' src={anime.images.webp.image_url} alt={anime.title} />
                { anime?.score &&
                  <div className='absolute top-2 right-2 bg-[#111111a8] rounded-lg p-2'>
                    <span>{anime.score}</span>
                  </div>
                }
                <div className='absolute bottom-2 mx-auto w-full'>
                    <div className='mx-2 bg-[#111111a8] rounded-lg'>
                        <h2 className='text-sm p-2 overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal duration-300 transition-all'>{anime.title}</h2>
                    </div>
                </div>
              </div>
            ))
          }
          <div className='sticky right-0 z-[5] bg-[#11111184] flex-shrink-0 flex-grow-0 p-4 backdrop-blur-sm duration-300 grid place-content-center'>
            <button onClick={scrollRight}>Next</button>
          </div>
        </div>
  )
}

export default Carrousel
