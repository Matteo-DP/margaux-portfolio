import React from 'react'
import Exhibition from './Exhibition'

export default function ExhibitionSection({ exhibitions }) {
  
    return (
        <div className='flex justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
                {exhibitions.map((e, i) =>
                    <div key={i} className='group w-max'>
                        <Exhibition
                            exhibition={e}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
