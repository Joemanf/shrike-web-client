import React from 'react';
import Image from "next/image";

export default function Header() {

  return (
    // style={{ borderColor: '#0051C8' }}
    <div id="header" className='border mx-48 mb-12 mt-2'>
        <div className='flex justify-center p-6'>
            <Image
                src="/Shrike_Coin_2.png"
                alt="Shrike Coin"
                width={250}
                height={250}
            />
        </div>
        <h1 className='text-center text-5xl pb-12'>Thorns of the Shrike</h1>
    </div>
  )
}