import { db } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleware, User } from 'pages/api/middleware'

export type CommonStatus = 'on_hold' | 'dropped' | 'completed'

export type AnimeStatus = 'plan_to_watch' | 'watching' | CommonStatus

interface AnimeListDB {
  id: string,
  progress: number,
  status: AnimeStatus,
  animeId: string,
  email: string,
  anime: {
    id: string,
    imageUrl: string,
    title: string,
    score: number,
    malId: number
  }
}

export interface AnimeList {
  listId: string
  animeId: string
  status: AnimeStatus
  progress: number
  imageUrl: string
  malId: number
  title: string
  score: number
}

const formatAnimeListData = (data: AnimeListDB[]) => {
  return data.map(({ anime, animeId, progress, status, id: listId }) => {
    const { imageUrl, malId, score, title } = anime
    return {
      listId,
      animeId,
      status,
      progress,
      imageUrl,
      malId,
      title,
      score
    }
  })
}

async function Handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { user } = req as unknown as User
    if (!user?.email) {
      return res.send({
        error: 'Error User'
      })
    }
    const { status } = req.query as { status: AnimeStatus | 'all' }

    if (status === 'all') {
      const data = await db.animeList.findMany({
        where: {
          email: user.email
        },
        include: {
          anime: true
        }
      }) as AnimeListDB[]
      return res.send({ data: formatAnimeListData(data) })
    }
    const data = await db.animeList.findMany({
      where: {
        status,
        email: user.email
      },
      include: {
        anime: true
      }
    }) as AnimeListDB[]
    res.send({ data: formatAnimeListData(data) })
  }
}

export default authMiddleware(Handler)
