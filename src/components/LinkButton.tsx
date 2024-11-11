"use client"
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'


const LinkButton = ({text,link,color}:{text:string,link:string,color:string}) => {
  return (
    <Link href={link}>
    
    <Button 
  className={`${color === 'black' 
    ? 'text-white bg-black hover:bg-gray-700' 
    : 'text-black bg-white hover:bg-gray-300'} font-semibold rounded-sm`}
>
  {text}
</Button>

    </Link>
  )
}

export default LinkButton