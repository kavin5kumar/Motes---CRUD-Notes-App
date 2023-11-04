"use client"


import client from '@/appwrite'
import { Databases, ID } from 'appwrite'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const { push } = useRouter();
  const database = new Databases(client);
  

  

  const addItem = async (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const it = {
      title: newTitle, 
      description: newDesc,
    }
    

    if(it.title !== '' && it.description !== '') {
      //setItems([...items, it])
      const promises = database.createDocument(
        process.env.NEXT_PUBLIC_DB_ID || "",
        process.env.NEXT_PUBLIC_COLL_ID || "",
        ID.unique(),
        it
      )
        promises.then(function (response) {
          console.log(response);
      }, function (error) {
          console.log(error);
      });
     
      setNewTitle("");
      setNewDesc("");
      push('/');
    }
  }

  return (
    <div className='px-10 py-3'>
        <form className='flex flex-col w-full h-full mt-24 gap-10'>
            <input type="text" placeholder='Text Title' className='p-3 border' required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <input type="text" placeholder='Text Description' className='p-3 border' value={newDesc} onChange={(e) => setNewDesc(e.target.value)}/>
            <button type="submit" className='mt-4 border bg-green-400 w-1/3 p-4 self-center' onClick={addItem}>Add Topic</button>
        </form>
    </div>
  )
}

export default Page