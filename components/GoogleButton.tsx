import { signIn } from 'next-auth/react'
import Button from './Button'

export default function GoogleButton () {
  return <Button props={{ onClick: () => signIn('google', { redirect: false, callbackUrl: '/login' }) }}>Continue with Google</Button>
}
