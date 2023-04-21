import { signIn } from 'next-auth/react'
import Button from './Button'

export default function FacebookButton () {
  return <Button props={{ onClick: () => signIn('facebook', { redirect: true, callbackUrl: '/account' }) }}>Continue with Facebook</Button>
}
