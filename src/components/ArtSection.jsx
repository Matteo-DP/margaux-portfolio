import React from 'react'
import Art from 'src/components/Art'

export default function ArtSection({ art, compact = false }) {
  
  if(compact) {
    return (
        <div className='flex flex-row flex-wrap gap-1'>
            {art.map((e, i) =>
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
        <div 
            className='
                flex items-center flex-col
                lg:items-start lg:grid lg:grid-cols-2 lg:gap-x-12 gap-y-20'
        >
            {art.map((e, i) =>
                <Art
                    key={i}
                    path={process.env.NEXT_PUBLIC_POCKETBASE_URL + "/api/files/" + e.collectionId + "/" + e.id + "/" + e.image + "?thumb=300x300"}
                    title={e.title}
                    compact={compact}
                />
            )}
        </div>
    )
}
