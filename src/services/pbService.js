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
                filter: `collection = '${collectionId}'`,
                sort: 'sort',
            })
            return JSON.parse(JSON.stringify(art));
        } catch {
            return { 
                code: 404,
                message: "Collection not found" 
            }
        }

    } else {
        return undefined;
    }
    // Unused feature
    // else {
    //     // Filter art based on empty collection, which is home page
    //     const art = await pb.collection('art').getFullList({
    //         filter: `collection = ''`,
    //         sort: 'sort'
    //     })
    //     return JSON.parse(JSON.stringify(art)).reverse();
    // }
};

export async function getImagesByExhibitionId(exhibitionId) {
    const images = await pb.collection('images').getFullList({
        filter: `exhibition = '${exhibitionId}'`,
        sort: 'updated'
    })
    return JSON.parse(JSON.stringify(images))

}

export async function getExhibitions() {

    const exhibitions = await pb.collection('exhibitions').getFullList()
    return JSON.parse(JSON.stringify(exhibitions))

}