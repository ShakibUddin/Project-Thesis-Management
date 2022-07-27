import React from 'react';
import * as Meetup from '../Constants/MeetupConstants';
export default function MeetupCard({ id, date, status }) {
    return (
        <div className='flex flex-col m-2 justify-betwee py-2 px-4 w-40 rounded-md shadow-lg'>
            <div className='w-100 d-flex flex-col text-center'>
                <p className='text-black text-sm m-0 p-1'>Meetup: {id}</p>
                <p className='text-black text-sm m-0 p-1'>Date: {date}</p>
                <p className={'text-sm m-0 p-1 font-bold ' + `${status === Meetup.UPCOMING ? 'text-green-500' : 'text-gray-400'}`}>{status}</p>
            </div>
        </div>
    )
}