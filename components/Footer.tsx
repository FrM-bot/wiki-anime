import { Button, ButtonLink } from 'components/Button'
import ArrowIcon from 'icons/ArrowIcon'
import ShareIcon from 'icons/ShareIcon'

const Footer = () => {
  const sharePage = () => {
    window.navigator.share({
      url: window.location.href,
      title: window.location.hostname
    })
  }
  return (
    <footer className='relative'>
      <div className='absolute right-2 flex justify-end top-[-25%] z-10'>
        <Button props={{ onClick: () => window.scroll(0, 0) }}><ArrowIcon props={{ style: { transform: 'rotate(-90deg)' } }} /></Button>
      </div>
      <div className='py-4 bg-secondary/70 rounded-md px-4 mb relative bottom-2'>

        <div className='flex mb-1'>
          <p className='whitespace-nowrap flex items-center gap-2'>Built and Design by <ButtonLink href='https://frm-bot.xyz' props={{ target: '_blank' }}>Maciel Franco</ButtonLink></p>
        </div>
        <div className="flex items-center justify-end">
          <div className='flex gap-2'>
            <Button props={{ onClick: () => sharePage() }}><ShareIcon /></Button>
            <ButtonLink href='mailto:damianmaciel0@gmail.com?subject = Feedback&body = Message' props={{ target: '_blank' }}>damianmaciel0@gmail.com</ButtonLink>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
