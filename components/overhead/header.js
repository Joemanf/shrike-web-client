import React from 'react';
import Image from "next/image";

export default function Header({theme}) {

  return (
    // style={{ borderColor: '#0051C8' }}
    <div id="header" className='rounded mx-48 mb-12 mt-2' style={{ border: `2px solid ${theme.tertiary}`, backgroundColor: (theme.backgroundImage ? '' : theme.primary) }}>
        <div className='flex justify-center p-6'>
            <Image
                src="/Bird_2.svg"
                alt="Shrike"
                width={250}
                height={250}
            />
        </div>
        <h1 className='text-center text-5xl pb-12'>Thorns of the Shrike</h1>
    </div>
  )
}