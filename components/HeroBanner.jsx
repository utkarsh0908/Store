import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'

const HeroBanner = ({heroBanner}) => {
  return (
    <div className='flex items-center px-[100px] py-[40px] bg-[#dcdcdc] rounded-[15px] relative h-[500px] leading-none w-full'>
      <div>
        <p className='font-xl'>{heroBanner.smallText}</p>
        <h3 className='text-6xl mt-[4px]'>{heroBanner.midText}</h3>
        <img src={urlFor(heroBanner.image)} alt="headphones" className='absolute top-0 right-[20%] w-[450px] h-[450px]'/>

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type='button' className='rounded-[15px] px-[10px] py-[16px] bg-[#f02d34] text-white border-none mt-[40px] font-lg text-medium cursor-pointer z-[10000]'>{heroBanner.buttonText}</button>
          </Link>
        </div>
        <div className="absolute right-[10%] bottom-[5%] w-[300px] leading-none flex flex-col text-[#324d67]">
          <h5 className='mb-[12px] font-bold self-end'>Description</h5>
          <p className='text-[#5f5f5f] font-thin text-end'>{heroBanner.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner