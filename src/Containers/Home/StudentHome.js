import React from 'react'
import MeetupCard from '../../Components/MeetupCard';
import UserCard from '../../Components/UserCard'
import * as Meetup from '../../Constants/MeetupConstants';

export default function StudentHome() {
    return (
        <div className='d-flex flex-col w-100'>
            <p>Project Thesis: ECommerce Website</p>
            <p>Team Members:</p>
            <div className='flex w-100 p-4'>
                <UserCard name={"Jack"} id={"12232"} department={"CSE"} />
                <UserCard name={"Jack"} id={"12232"} department={"CSE"} />
                <UserCard name={"Jack"} id={"12232"} department={"CSE"} />
            </div>
            <p>Supervisor:</p>
            <div className='flex w-100 p-4'>
                <UserCard name={"Jack"} id={"12232"} department={"CSE"} />
            </div>
            <p>Meetups:</p>
            <div className='flex w-100 p-4'>
                <MeetupCard id={1} date={'03/01/2022'} status={Meetup.OVER} />
                <MeetupCard id={2} date={'07/01/2022'} status={Meetup.UPCOMING} />
            </div>

        </div>
    )
}
