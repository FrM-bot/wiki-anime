import { ImgHTMLAttributes } from 'react'

const ImageComponent = ({ src, alt, props }: { src: string, alt: string, props?: ImgHTMLAttributes<HTMLImageElement> }) => {
  return (
    <div>
      <div className='rounded-md overflow-hidden shadow-xl shadow-black/50 hover:shadow duration-300 p-2 bg-primary'>
        <img loading='lazy' className='rounded w-full' src={src} alt={alt} {...props} />
      </div>
    </div>
  )
}

export default ImageComponent
