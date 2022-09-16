import React from 'react'
import { ButtonLink } from './Button'

const Footer = () => {
  return (
    <footer>
      <div className='py-4 bg-secondary/70 rounded-md px-4 mb relative bottom-2'>

        <div className='flex mb-1'>
          <p className='whitespace-nowrap flex items-center gap-2'>Built and Design by <ButtonLink href='https://frm-bot.xyz' props={{ target: '_blank' }}>Maciel Franco</ButtonLink></p>
        </div>
        <div className="flex justify-end">
          <ButtonLink href='mailto:damianmaciel0@gmail.com?subject = Feedback&body = Message' props={{ target: '_blank' }}>damianmaciel0@gmail.com</ButtonLink>
        </div>
      </div>

    </footer>
  )
}

export default Footer
