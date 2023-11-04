import React from 'react'

type Props = {
    title:string,
    description:string
}

const Items = ({title, description}: Props) => {
  return (
    <>
        <h1 className='font-bold text-3xl'>{title}</h1>
        <p className='mt-3'>{description}</p>
    </>
  )
}

export default Items