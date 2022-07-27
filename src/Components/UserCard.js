import React from 'react'
export default function UserCard({ name, id, department }) {
    return (
        <div className='flex flex-col m-2 justify-betwee py-2 px-4 w-40 rounded-md shadow-lg'>
            <div className='w-100 d-flex flex-col'>
                <p className='text-black text-sm m-0 p-1'>Name: {name}</p>
                <p className='text-black text-sm m-0 p-1'>Id: {id}</p>
                <p className='text-black text-sm m-0 p-1'>Department: {department}</p>
            </div>
        </div>
    )
}