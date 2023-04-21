import GoogleButton from '@/components/GoogleButton'
import Layout from 'Layouts/Layout'
import { useAuth } from 'Layouts/LayoutProfile'

function Login () {
  const { isLoading } = useAuth({ redirectTo: '/profile', statusRedirect: 'authenticated' })
  return (
    <Layout title="Log In">
      <>
        {
          isLoading
            ? <div>Loading...</div>
            : <div className='flex flex-col gap-4 max-w-xl w-full mt-4 mx-auto'>
              <GoogleButton />
            </div>
        }
      </>
    </Layout>
  )
}

export default Login
