import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../../lib/prisma'
import { authMiddleware, User } from '../../../middleware'
import { FormListData } from '@/components/AddToMyList'
// import { authMiddleware } from '../middleware'

async function Handler (req: NextApiRequest, res: NextApiResponse) {
  const { user } = req as unknown as User
  if (req.method === 'PUT') {
    try {
      if (!user?.email) {
        return res.send({
          error: 'Error'
        })
      }

      const { id } = req.query as { id: string }
      const { body } = req as { body: FormListData | any }

      if (Object.keys(body).length === 0) {
        return res.send({
          error: 'Error'
        })
      }

      const data = await db.animeList.update({
        where: {
          id
        },
        data: {
          ...body
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
