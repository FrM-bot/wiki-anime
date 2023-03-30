import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import { PickerItem } from './EmblaCarouselIosPickerItem'

type PropType = {
  loop?: EmblaOptionsType['loop']
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { loop } = props

  return (
    <div className="embla">
      <PickerItem
        slideCount={24}
        perspective="left"
        loop={loop}
        label="Progress"
      />
      <PickerItem
        slideCount={10}
        perspective="right"
        loop={loop}
        label="Score"
      />
    </div>
  )
}

export default EmblaCarousel
