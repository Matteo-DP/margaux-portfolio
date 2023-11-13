import React from "react";
import Pocketbase from 'pocketbase'

const pb = new Pocketbase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL,
)

export default async function Art(req, res) {
    if(req.method == "GET") {
        
        const art = await pb.collection('exhibitions').getFullList()

        res.status(200).json(art)
    }
}