import 'styles/main.css'
import { SessionProvider, useSession } from 'next-auth/react'
import type { AppProps, AppType } from 'next/app'
import { Session } from 'next-auth'
import React from 'react'
import AnimeProvider from 'context/Anime.provider'

export default function App ({
  Component,
  pageProps: { session, ...pageProps }
}: { Component: AppType & { auth: boolean }, pageProps: AppProps & { session: Session } }) {
  return (
    <SessionProvider session={session}>
      <AnimeProvider>
        {Component.auth
          ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
            )
          : (
            <Component {...pageProps} />
            )}
      </AnimeProvider>
    </SessionProvider>
  )
}

function Auth ({ children }: { children: React.ReactElement }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return children
}
