import Link from 'next/link'
import React from 'react'
const Topbar = () => {
  return (
    <header className='bg-blue-900 flex items-center justify-between px-10'>
        <Link href='/'><h1 className='text-white font-bold text-2xl'>Mini Notes</h1></Link>
        <Link href='/addnote'><button className='bg-white p-2 font-semibold text-lg shadow-md'>Add Topic</button></Link>
    </header>
  )
}

export default Topbar