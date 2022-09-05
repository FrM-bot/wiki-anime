import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, ReactElement } from 'react'

interface Props {
    children: ReactElement | string
    props?: ButtonHTMLAttributes<HTMLButtonElement>
}

export const Button: FC<Props> = ({ children, props }) => (
    <button
        className="after:absolute after:bg-gradient-to-l after:from-[#da62c4] after:to-cyan-400 after:w-full after:rounded-sm after:h-px after:bottom-0 after:left-0 after:scale-x-0 after:duration-300 after:z-[5] grid place-content-center relative py-1 px-2 w-fit hover:after:scale-x-100 shadow-lg
        shadow-black/50 border-[1px] border-tertiary rounded-sm bg-primary"
        {...props}
    >
        {children}
    </button>
)

interface PropsLink {
    children: string | ReactElement
    href: string
    className?: string
    target?: string
    props?: AnchorHTMLAttributes<HTMLAnchorElement>
}

export const ButtonLink: FC<PropsLink> = ({ children, href, props, className }) => {
  const defaultStylesCard = `after:absolute after:bg-gradient-to-l after:from-[#da62c4] after:to-cyan-400 after:w-full after:rounded-sm after:h-px after:bottom-0 after:left-0 after:scale-x-0 after:duration-300 after:z-[5] grid place-content-center relative py-1 px-2 w-fit hover:after:scale-x-100 shadow-xl
  shadow-black/50 border-[1px] border-tertiary rounded-sm bg-primary hover:shadow duration-300`

  return (<Link href={href}>
        <a className={className ? `${defaultStylesCard} ${className}` : defaultStylesCard} {...props}>{children}</a>
    </Link>)
}

export const LinkExternal: FC<PropsLink> = ({ children, className, href, props }) => {
  const defaultStylesCard = 'dark:bg-custom-dark-2 bg-secondary shadow-lg flex justify-center items-center rounded-sm after:absolute after:bg-gradient-to-l after:from-tertiary after:to-cyan-500 after:w-full after:h-px after:bottom-0 after:left-0 after:scale-x-0 after:duration-300 relative py-1 px-2 w-fit hover:after:scale-x-100 hover:cursor-pointer'
  return (
        <a href={href} className={className ? `${defaultStylesCard} ${className}` : defaultStylesCard} target="blank" {...props}>{children}</a>
  )
}

interface PropsV2 extends Props {
    className?: string
}

export const ButtonTransparent: FC<PropsV2> = ({ children, className, props }) => {
  const defaultStylesButton = 'backdrop-blur-[2px] bg-primary/40 duration-300 p-2 bg-tertiary h-fit rounded-full grid place-content-center outline-none'
  return (
        <button
            className={className ? `${defaultStylesButton} ${className}` : defaultStylesButton} {...props}
        >
            {children}
        </button>
  )
}
