import GoogleButton from '@/components/GoogleButton'
import Layout from 'Layouts/Layout'
import { useAuth } from './profile/[type]/[status]'

function Login () {
  const { data, isLoading, status } = useAuth({ redirect: '/profile', statusRedirect: 'authenticated' })
  console.log({ data, isLoading, status })
  return (
        <Layout title="Log In">
            <>
                <div className='flex flex-col gap-4 max-w-xl w-full mt-4 mx-auto'>
                    <GoogleButton />
                </div>
            </>
        </Layout>
  )
}

export default Login
