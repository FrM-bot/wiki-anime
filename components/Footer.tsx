import Button from 'components/Button'
import Link from './Link'
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
    <footer className='bg-secondary/70'>
      <div className='w-full relative lg:max-w-[90vw] max-w-[75vw] md:max-w-[95vw] sm:max-w-[95vw] xs:max-w-[95vw] m-auto'>
        <div className='absolute right-2 flex justify-end top-[-25%] z-10'>
          <Button props={{ onClick: () => window.scroll(0, 0), 'aria-label': 'arrow' }}><ArrowIcon props={{ style: { transform: 'rotate(-90deg)' } }} /></Button>
        </div>
        <div className='py-4'>
          <div className='flex mb-2'>
            <p className='whitespace-nowrap flex items-center gap-2'>Built and Design by <Link type='external' href='https://frm-bot.xyz'>Maciel Franco</Link></p>
          </div>
          <div className="flex items-center justify-end">
            <div className='flex gap-2'>
              <Button props={{ onClick: () => sharePage(), 'aria-label': 'share' }}><ShareIcon /></Button>
              <Link type='external' href='mailto:damianmaciel0@gmail.com?subject=Feedback&body=Message'>damianmaciel0@gmail.com</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
