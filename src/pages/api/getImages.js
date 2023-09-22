import React from "react";
import Pocketbase from 'pocketbase'

const pb = new Pocketbase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL,
)

export default async function Art(req, res) {
    if(req.method == "GET") {

        const { collection } = req.query
        if(collection) {
            // FIlter art based on collection name

            // Map name to ID
            const collections = await pb.collection('collections').getFullList()
            try {
                const collectionId = collections.filter(e => e.handle == collection)[0].id
                const art = await pb.collection('art').getFullList({
                    filter: `collection = '${collectionId}'`
                })
                return res.status(200).json(art)
            } catch {
                return res.status(404).json({ message: "Collection not found" })
            }

        } else {
            // Filter art based on empty collection, which is home page
            const art = await pb.collection('art').getFullList({
                filter: `collection = ''`
            })
            res.status(200).json(art)
        }
    }
}