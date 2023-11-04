"use client"

import client from '@/appwrite'
import { Databases, Query } from 'appwrite'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface Pagez {
  params: { id: string }
}

const Page: FC<Pagez> = ({ params }) => {
  const [item, setItem] = useState({
    title:"",
    description: "",
  })
  const database = new Databases(client);
  const { push } = useRouter();
  
  useEffect(() => {
      request();
  }, [])

  const request = async() => {
    
    const promise = database.listDocuments(process.env.NEXT_PUBLIC_DB_ID || "",process.env.NEXT_PUBLIC_COLL_ID || "",[
      Query.equal("$id", params.id)
    ]);
  
    promise.then(function (response) {
      setItem({
        title: response.documents[0].title,
        description: response.documents[0].description,
      })
    }, function (error) {
        console.log(error); // Failure
    });
  }



  const handleSubmit = async(e) => {
    e.preventDefault();
    const promise = database.updateDocument(process.env.NEXT_PUBLIC_DB_ID || "",process.env.NEXT_PUBLIC_COLL_ID || "", params.id, item);

    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });
    push('/');

  }


  return (
    <div className='px-10 py-3'>
      <form className='flex flex-col w-full h-full mt-24 gap-10' onSubmit={handleSubmit}>
        <input type="text" placeholder='Text Title' className='p-3 border' value={item.title} onChange={(e) => setItem({
          ...item,
          title: e.target.value
        })} />
        <input type="text" placeholder='Text Description' className='p-3 border' value={item.description} onChange={(e) => setItem({
          ...item,
          description: e.target.value
        })} />
        <button type="submit" className='mt-4 border bg-green-400 w-1/3 p-4 self-center'>Update Topic</button>
      </form>
    ~</div>
  )
}



export default Page