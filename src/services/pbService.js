import React from "react";
import Pocketbase from 'pocketbase'

const pb = new Pocketbase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL,
)

export async function getCollections() {        
    const art = await pb.collection('collections').getFullList()

    return JSON.parse(JSON.stringify(art));
}

export async function getArt(collection) {
    if(collection) {
        // FIlter art based on collection name

        // Map name to ID
        const collections = await pb.collection('collections').getFullList()
        try {
            const collectionId = collections.filter(e => e.handle == collection)[0].id
            const art = await pb.collection('art').getFullList({
                filter: `collection = '${collectionId}'`
            })
            return JSON.parse(JSON.stringify(art))
        } catch {
            return { 
                code: 404,
                message: "Collection not found" 
            }
        }

    } else {
        // Filter art based on empty collection, which is home page
        const art = await pb.collection('art').getFullList({
            filter: `collection = ''`
        })
        return JSON.parse(JSON.stringify(art))
    }
}