import React from 'react'

function Home({listOfffices, users, documents}) {
  console.log(documents)
  return (
    <div className='flex gap-5 text-white'>
      <div className='p-2 w-96 h-52 bg-bluelight rounded-md'>
        <p>Offices</p>
        <p>{listOfffices?.length}</p>
      </div>
      <div className='p-2 w-96 h-52 bg-bluelight rounded-md'>
        <p>Users</p>
        <p>{users?.length}</p>
      </div>
      <div className='p-2 w-96 h-52 bg-bluelight rounded-md'>
        <p>Documents</p>
        <p>{documents?.length}</p>
      </div>
    </div>
  )
}

export default Home