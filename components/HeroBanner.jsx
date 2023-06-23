import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'

const HeroBanner = ({heroBanner}) => {
  return (
    <div className='md:h-[400px] text-white flex items-center px-16 py-12 md:px-[100px] md:py-[40px] bg-black rounded-lg relative leading-none w-full'>
      <div>
        <p className='font-xl'>{heroBanner.smallText}</p>
        <h3 className='text-6xl mt-[4px] text-[#ffAA1D] font-bold'>{heroBanner.midText}</h3>
        <img src={urlFor(heroBanner.image)} alt="headphones" className='hidden md:flex absolute top-0 right-[20%] w-[450px] h-[450px]'/>

        <div>
          <Link href={`/products/${heroBanner.product}`}>
            <button type='button' className='rounded-lg px-4 py-3 font-bold bg-white text-black border-none mt-[40px] font-lg text-medium cursor-pointer z-[10000]'>{heroBanner.buttonText}</button>
          </Link>
        </div>
        <div className="absolute right-[10%] bottom-[5%] w-[300px] leading-none flex flex-col text-[#ffAA1D]">
          <h5 className='mb-2 md:mb-[12px] font-bold self-end text-sm md:text-xl'>Description</h5>
          <p className='text-white font-thin text-end text-xs md:text-base'>{heroBanner.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner