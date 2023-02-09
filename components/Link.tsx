import { AnchorHTMLAttributes, ReactElement } from 'react'
import NextLink from 'next/link'
import { classNamesJoin } from 'lib/classNamesJoin'

interface PropsLink {
  children: ReactElement | string
  href: string
  className?: string
  type?: 'External'
  props?: AnchorHTMLAttributes<HTMLAnchorElement>
}

const Link = ({ children, href, props, className, type }: PropsLink) => {
  if (type === 'External') {
    return (
      <a href={href} rel='noreferrer' className={classNamesJoin(className ?? '', 'py-[0.4em] px-[.8em] [line-break:anywhere] dark:bg-custom-dark-2 bg-secondary shadow-lg flex justify-center items-center rounded-sm after:absolute after:bg-gradient-to-l after:from-tertiary after:to-cyan-500 after:w-full after:h-px after:bottom-0 after:left-0 after:scale-x-0 after:duration-300 relative w-fit hover:after:scale-x-100 hover:cursor-pointer')} target='_blank' {...props}>
        {children}
      </a>
    )
  }
  return (
    <NextLink href={href} className={classNamesJoin(className ?? '', 'py-[0.4em] px-[.8em] after:absolute after:bg-gradient-to-l after:from-[#da62c4] after:to-cyan-400 after:w-full after:rounded-sm after:h-px after:bottom-0 after:left-0 after:scale-x-0 after:duration-300 after:z-[5] grid place-content-center relative w-fit hover:after:scale-x-100 shadow-md border-[1px] border-tertiary rounded-sm bg-primary hover:shadow-cyan-400/5 duration-300')} {...props}>
      {children}
    </NextLink>
  )
}

export default Link
