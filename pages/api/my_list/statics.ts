import { db } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleware, User } from 'pages/api/middleware'

async function Handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req as unknown as User
  if (req.method === 'GET') {
    const planToWatch = await db.animeList.count({
      where: {
        user: {
          email: user?.email
        },
        status: 'plan_to_watch'
      }
    })
    const planToRead = await db.mangaList.count({
      where: {
        user: {
          email: user?.email
        },
        status: 'plan_to_read'
      }
    })
    res.send({
      anime: {
        planToWatch
      },
      manga: {
        planToRead
      }
    })
  }
}

export default authMiddleware(Handler)
