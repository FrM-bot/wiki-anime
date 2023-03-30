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

      const { imageUrl, chapters, volumes, score, title, status, malId } = req.body

      let mangaToAdd = await db.manga.findUnique({
        where: {
          malId
        }
      })

      if (!mangaToAdd) {
        mangaToAdd = await db.manga.create({
          data: {
            imageUrl,
            malId,
            title,
            score
          }
        })
      }

      const data = await db.mangaList.create({
        data: {
          user: {
            connect: {
              email: user.email
            }
          },
          manga: {
            connect: {
              id: mangaToAdd.id
            }
          },
          chapters,
          volumes,
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
