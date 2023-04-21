import type { FC, ReactElement } from 'react'

// import {  } from 'react-dom'

interface ICard {
    children: ReactElement
    className?: string
}

const Card: FC<ICard> = ({ children, className }) => {
  const defaultStylesCard = 'p-2 shadow-md rounded-md bg-tertiary'

  return (
    <div className={className ? `${defaultStylesCard} ${className}` : defaultStylesCard}>{ children }</div>
  )
}

export default Card
