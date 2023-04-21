import { useSession, signIn, signOut } from 'next-auth/react'

export default function LoginButton () {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  if (loading) {
    return <div>Loading...</div>
  }
  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
