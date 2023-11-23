import React from 'react'
import Art from '@/components/Art'

export default function ArtSection({ art, compact = false }) {
  
    if(compact) {
        return (
            <div className='flex flex-row flex-wrap gap-1'>
                {art.map((e, i) =>
                    !e.hidden &&
                        <div key={i}>
                            <Art
                                path={process.env.NEXT_PUBLIC_POCKETBASE_URL + "/api/files/" + e.collectionId + "/" + e.id + "/" + e.image + "?thumb=300x300"}
                                title={e.title}
                                compact={compact}
                            />
                        </div>
                )}
            </div>
        )
    }
  
    return (
        <div className='w-full flex justify-center'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                {art.map((e, i) =>
                    !e.hidden &&
                        <div key={i}>
                            <Art
                                path={process.env.NEXT_PUBLIC_POCKETBASE_URL + "/api/files/" + e.collectionId + "/" + e.id + "/" + e.image + "?thumb=300x300"}
                                title={e.title}
                                compact={compact}
                            />
                        </div>
                )}
            </div>
        </div>
    )
}
