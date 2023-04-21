import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { getToken, JWT } from 'next-auth/jwt'
export interface User {
  user?: JWT | null
}
export function authMiddleware (handler: NextApiHandler) {
  return async (req: NextApiRequest & { user: JWT | null }, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1]
    console.log({ token }, req.headers.authorization)
    try {
      if (!token) {
        return res.send({
          error: 'Not token provided'
        })
      }

      const decodedToken = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET ?? ''
      })

      req.user = decodedToken

      return handler(req, res)
    } catch (err) {
      console.error(err)
      return res.status(401).json({ message: 'Auth failed' })
    }
  }
}
