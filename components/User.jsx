import { UserCircle , CircleArrowDown } from 'lucide-react'
import React from 'react'

function User() {
  return (
    <div className=' w-full '>
        <div className='flex justify-between w-full'>
        <div className='flex gap-4 items-center'>

        <h1 className='text-2xl'>Gemi</h1>
        <CircleArrowDown size={15} />
        </div>
        <UserCircle size={36}/>
        </div>
    </div>
  )
}

export default User