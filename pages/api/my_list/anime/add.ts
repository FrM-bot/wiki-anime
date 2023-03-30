import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../lib/prisma'
import { authMiddleware, User } from '../../middleware'
// import { authMiddleware } from '../middleware'

async function Handler (req: NextApiRequest, res: NextApiResponse) {
  const { user } = req as unknown as User
  if (req.method === 'POST') {
    try {
      if (!user?.email) {
        return res.send({
          error: 'Error'
        })
      }

      const { imageUrl, progress, score, title, status, malId } = req.body

      let animeToAdd = await db.anime.findUnique({
        where: {
          malId
        }
      })

      if (!animeToAdd) {
        animeToAdd = await db.anime.create({
          data: {
            imageUrl,
            malId,
            title,
            score
          }
        })
      }

      const data = await db.animeList.create({
        data: {
          user: {
            connect: {
              email: user.email
            }
          },
          anime: {
            connect: {
              id: animeToAdd.id
            }
          },
          progress,
          status
        }
      })
      res.send(data)
    } catch (error: any) {
      console.error(error)
      res.send({
        error: error.message
      })
    }
  }
}

export default authMiddleware(Handler)
