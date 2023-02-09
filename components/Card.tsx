import type { FC, ReactElement } from 'react'

interface ICard {
    children: ReactElement
    className?: string
}

const Card: FC<ICard> = ({ children, className }) => {
  const defaultStylesCard = 'p-2 shadow-md rounded bg-tertiary'

  return (
    <div className={className ? `${defaultStylesCard} ${className}` : defaultStylesCard}>{ children }</div>
  )
}

export default Card
