import React from 'react'

export default function Product({ title, desc, image, video }) {
    return (
        <div className='px-20 py-10 flex items-center justify-between'>
            <div className='flex flex-col gap-6'>
                <h2 className='text-6xl font-medium'>{title}</h2>
                <p className='text-xl max-w-2xl'>{desc}</p>
                <button className='px-6 py-3 bg-white border text-black rounded-full w-fit'>Explore More</button>
            </div>
            <div className='flex items-center justify-center'>
                {
                    image && <img src={image} alt={title} className='w-160 rounded-4xl' />
                }
                {
                    video && <video src={video} autoPlay loop muted className='w-160 rounded-4xl' />
                }
            </div>
        </div>
    )
}
