import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../../lib/prisma'
import { authMiddleware, User } from '../../../middleware'
// import { authMiddleware } from '../middleware'

async function Handler (req: NextApiRequest, res: NextApiResponse) {
  const { user } = req as unknown as User
  if (req.method === 'DELETE') {
    try {
      if (!user?.email) {
        return res.send({
          error: 'Error'
        })
      }

      const { id } = req.query as { id: string }
      console.log({ id })

      const data = await db.animeList.delete({
        where: {
          id
        }
      })
      res.send({
        data
      })
    } catch (error: any) {
      console.error(error)
      res.send({
        error: error.message
      })
    }
  }
}

export default authMiddleware(Handler)
