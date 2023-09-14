// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { randomUUID } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    responseLimit: false,
  },
}

type UUIDsResponse = {
  uuids: {
    uuid : string,
    time: number
  }[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UUIDsResponse>
) {

  const { count } = req.query || 1
  const startTime = Date.now()
  res.json({
    "uuids": [...Array(
      Math.min(parseInt(count as string), Number.MAX_SAFE_INTEGER)
    )].map(() => {
      const uuid = randomUUID()
      return {
        uuid,
        time: Date.now() - startTime
      }
    })
  })

}
