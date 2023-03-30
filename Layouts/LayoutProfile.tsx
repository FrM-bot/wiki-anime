import Layout from 'Layouts/Layout'
// import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SignOut from '@/components/SignOut'

import Link from 'next/link'
import { parseUsername } from '@/utils/parseText'

interface IUseAuth {
    redirect?: string
    statusRedirect?: 'authenticated' | 'loading' | 'unauthenticated'
}

export const useAuth = ({ redirect = '/login', statusRedirect = 'unauthenticated' }: IUseAuth) => {
  const router = useRouter()
  const { data, status } = useSession()
  useEffect(() => {
    status === statusRedirect && router.push(redirect)
  }, [data, redirect, router, status, statusRedirect])
  return {
    isLoading: status === 'loading',
    data,
    status
  }
}

interface Props {
    children: ReactElement
}

function LayoutProfile ({ children }: Props) {
  const router = useRouter()

  const { data, isLoading: isLoadingAuth } = useAuth({ redirect: '/login', statusRedirect: 'unauthenticated' })
  const [staus, setStaus] = useState(router.query.status ?? 'all')
  useEffect(() => {
    setStaus('all')
  }, [router.query.type])

  return (
        <Layout title={parseUsername(data?.user?.email ?? '')}>
            <div className='grid gap-4 grid-cols-[200px_1fr]'>
                {
                    !isLoadingAuth &&
                    <>
                        <div className='mx-auto flex justify-center flex-col gap-4 items-center text-center'>
                            <picture><img className='rounded-full' src={data?.user?.image ?? ''} alt={data?.user?.name ?? ''} /></picture>
                            <div className='flex flex-col'>
                                <span>{data?.user?.name}</span>
                                <span>{data?.user?.email}</span>
                            </div>
                            <SignOut />
                        </div>
                        <div className='w-full flex flex-col gap-4'>
                        <div className='bg-secondary mx-auto rounded-full p-2 w-fit flex gap-4 shadow-lg'>
                            <Link style={{ backgroundColor: router.query.type === 'anime' ? 'white' : '', color: router.query.type === 'anime' ? 'black' : '' }} className='px-6 py-1 rounded-full grid place-content-center hover:bg-primary duration-300'
                                    href={`/profile/anime/${staus}`}>
                                    Anime
                                </Link>
                                <Link style={{ backgroundColor: router.query.type === 'manga' ? 'white' : '', color: router.query.type === 'manga' ? 'black' : '' }} className='px-6 py-1 rounded-full grid place-content-center hover:bg-primary duration-300'
                                    href={`/profile/manga/${staus}`}>
                                    Manga
                                </Link>
                            </div>
                            <div>
                                {
                                    children
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </Layout>
  )
}

export default LayoutProfile
