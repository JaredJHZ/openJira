import mongoose from "mongoose";
import type {NextApiRequest, NextApiResponse} from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data = {
    messages: string
} 
|
IEntry
|
null;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {id} = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({messages:'El id no es valido'});
    }
     
    switch(req.method) {
        case 'PUT':
            return updateEntry(req, res);
    }

    res.status(200).json({messages:'Example'});
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse <Data>) => {
    const {id} = req.query;
    try {
        await db.connect();

        const entryToUpdate = await Entry.findById(id);

        if (!entryToUpdate ) {
            await db.disconnect();
            return res.status(400).json({messages: "No hay entrada por id"})
        }

        const {
            description = entryToUpdate.description,
            status = entryToUpdate.status
        } = req.body;

        const updatedEntry = await Entry.findByIdAndUpdate(id , {description, status}, {runValidators: true, new: true});

        res.status(200).json(updatedEntry);



    }catch(err) {
        res.status(500).json({messages:'error'});
    }
}