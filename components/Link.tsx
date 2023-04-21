import { AnchorHTMLAttributes, ReactElement } from 'react'
import NextLink from 'next/link'
import { classNamesJoin } from 'lib/classNamesJoin'

interface PropsLink {
  children: ReactElement | string
  href: string
  className?: string
  type?: 'external'
  variant?: 'button'
  props?: AnchorHTMLAttributes<HTMLAnchorElement>
}

const Link = ({ children, href, props, className, type, variant }: PropsLink) => {
  if (type === 'external') {
    return (
      <a href={href} rel='noreferrer' className={classNamesJoin(className ?? '', 'p-[1px] rounded-md [line-break:anywhere] dark:bg-custom-dark-2 bg-secondary shadow-lg flex justify-center items-center after:rounded after:absolute after:bg-gradient-to-l after:from-tertiary after:to-cyan-500 after:w-full after:h-full after:bottom-0 after:left-0 after:opacity-0 hover:after:opacity-100 after:duration-300 relative w-fit hover:cursor-pointer')} target='_blank' {...props}>
        <span className='bg-secondary py-[0.2em] px-[.4em] z-[1] rounded'>
          {children}
        </span>
      </a>
    )
  }
  if (variant === 'button') {
    return (
      <NextLink href={href} className={classNamesJoin(className ?? '', 'rounded-md p-[1px] flex justify-center items-center after:absolute after:bg-gradient-to-l after:from-[#da62c4] after:to-cyan-400 after:w-full after:rounded after:h-full after:bottom-0 after:left-0 after:opacity-0 after:duration-300 after:z-0 relative w-fit hover:after:opacity-100 shadow-md border-[1px] border-tertiary bg-primary hover:shadow-cyan-400/5 duration-300')} {...props}>
        <span className='bg-primary py-[0.2em] px-[.4em] z-[1] rounded'>
          {children}
        </span>
      </NextLink>
    )
  }

  return (
    <NextLink href={href} className={classNamesJoin(className ?? '', 'text-white/70 hover:text-white duration-300 flex items-center justify-center')} {...props}>
      {children}
    </NextLink>
  )
}

export default Link
