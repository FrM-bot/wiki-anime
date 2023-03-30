import { db } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleware, User } from 'pages/api/middleware'
import { CommonStatus } from '../anime/[status]'

export type MangaStatus = CommonStatus | 'plan_to_read' | 'reading'

interface MangaListDB {
  id: string,
  chapters: number,
  volumes: number,
  status: MangaStatus,
  mangaId: string,
  email: string,
  manga: {
    id: string,
    imageUrl: string,
    title: string,
    score: number,
    malId: number
  }
}

export interface MangaList {
  listId: string
  mangaId: string
  status: MangaStatus
  chapters: number
  volumes: number
  imageUrl: string
  malId: number
  title: string
  score: number
}

const formatMangaListData = (data: MangaListDB[]) => {
  return data.map(({ manga, mangaId, chapters, volumes, status, id: listId }) => {
    const { imageUrl, malId, score, title } = manga
    return {
      listId,
      mangaId,
      status,
      chapters,
      volumes,
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
    const { status } = req.query as { status: MangaStatus | 'all' }

    if (status === 'all') {
      const data = await db.mangaList.findMany({
        where: {
          email: user.email
        },
        include: {
          manga: true
        },
        take: 10
      }) as MangaListDB[]
      return res.send({ data: formatMangaListData(data) })
    }
    const data = await db.mangaList.findMany({
      where: {
        status,
        email: user.email
      },
      include: {
        manga: true
      }
    }) as MangaListDB[]
    res.send({ data: formatMangaListData(data) })
  }
}

export default authMiddleware(Handler)
