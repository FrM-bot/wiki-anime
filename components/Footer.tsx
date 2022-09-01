import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="border-t-[2px] border-solid border-tertiary p-4 grid place-content-center rounded-md">
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{' '}
      <span>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </a>
  </footer>
  )
}

export default Footer
