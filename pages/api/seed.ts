// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database'
import { EntryList } from '../../components/ui'
import { Entry } from '../../models'
import { seedData } from '../../database/seed-data'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(401).json({message:'No tiene acceso a este servicio1'})
    }

    await db.connect();

    await Entry.deleteMany();

    await Entry.insertMany(seedData.entries);

    await db.disconnect();

    res.status(200).json({message:'Proceso realizado correctamente'})
}
