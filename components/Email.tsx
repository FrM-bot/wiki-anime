import { signIn } from 'next-auth/react'
import { FormEvent } from 'react'
import Button from './Button'

export default function Email () {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))

    if (data.email && data.password) {
      signIn('credentials', { redirect: false, ...data })
    }
  }
  return (
    <form onSubmit={e => onSubmit(e)} className='flex flex-col gap-4'>
      <label className='flex flex-col gap-1'>
        <span>Email</span>
        <input className='bg-secondary text-white rounded p-3 outline-none' type='email' name='email' autoComplete='username' />
      </label>
      <label className='flex flex-col gap-1'>
        <div className='flex justify-between'>
          <span>Password</span>
          <span className='opacity-50 cursor-pointer'>Forgot password?</span>
        </div>
        <input className='bg-secondary text-white rounded p-3 outline-none' type='password' name='password' autoComplete='current-password' />
      </label>
      <Button>Sign in</Button>
    </form>
  )
}
