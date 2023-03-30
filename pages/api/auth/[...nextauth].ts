import NextAuth, { Account, Session, User, AuthOptions } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
// import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db as prisma } from 'lib/prisma'

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? ''
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? ''
    })
  ],
  callbacks: {
    async jwt ({ token, account }: { token: JWT; account?: Account | null }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session ({
      session,
      token,
      user
    }: {
      session: Session & { accessToken?: string | null | undefined }
      token: JWT
      user?: User | AdapterUser
    }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token?.accessToken as string
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  theme: {
    colorScheme: 'dark', // "auto" | "dark" | "light"
    brandColor: '#ffff', // Hex color value
    logo: '' // Absolute URL to logo image
  },
  session: {
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60
  }
}

export default NextAuth(authOptions)
