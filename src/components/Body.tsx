"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import client from '@/appwrite';
import { Databases } from 'appwrite';
import Items from './Items'


const Body = () => {
  const [list, setList]:any[] = useState([]);
  const database = new Databases(client);

  useEffect(() => {
      getData();
  },[list])

  const getData = async() => {
      const promise = database.listDocuments(process.env.NEXT_PUBLIC_DB_ID || "", process.env.NEXT_PUBLIC_COLL_ID || "")
      promise.then(function (response) {
          console.log(response);
          setList(response.documents) // Success
      }, function (error) {
          console.log(error); // Failure
      });
    }
    const deleteDoc = async (id: string) => {
      const promise = database.deleteDocument(process.env.NEXT_PUBLIC_DB_ID || "",process.env.NEXT_PUBLIC_COLL_ID || "", id);
      promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });
    }
    return (
      <div className='px-10 py-2'>
        {list.map((li:any) => (
          <div key={li.$id}>
            <section  className='border border-slate-400 flex justify-between items-center py-5 px-3 mt-5'>
                <div>
                  <Items title={li.title} description={li.description} />
                </div>
                <div className='flex flex-col gap-10 h-full'>
                    <button onClick={() => deleteDoc(li.$id)}><FaTrash className="text-red-700"/></button>
                    <Link href={`/rename/${li.$id}`}><FaPen className="text-blue-800"/></Link>
                </div>
                
            </section>
            
          </div>
          ))}
      </div>
    )
  }


export default Body