import { signOut } from 'next-auth/react'

export default function SignOut () {
  return <button className='bg-red-400 py-2 px-3 rounded' onClick={() => signOut()}>Sign out</button>
}
