import { ImgHTMLAttributes } from 'react'

const ImageComponent = ({ src, alt, props }: { src: string, alt: string, props?: ImgHTMLAttributes<HTMLImageElement> }) => {
  return (
      <div className='rounded-md overflow-hidden shadow-xl duration-300 p-2 bg-secondary'>
        <img loading='lazy' className='rounded w-full' src={src} alt={alt} {...props} />
      </div>
  )
}

export default ImageComponent
