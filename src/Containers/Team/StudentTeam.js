
import React, { useEffect } from 'react'
import './StudentTeamStyles.css'
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as TeamActions from '../../State/Team/TeamActions';
import UserCard from '../../Components/UserCard/UserCard';

const { Search } = Input;

export default function StudentTeam() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const students = useSelector(state => state.team.students);
    useEffect(() => {
        dispatch(TeamActions.getAllStudents({ body: { 'nub_id': currentUser.nub_id }, token: currentUser.token }))
    }, [])
    function itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    }
    const sendRequest = () => {
        console.log("sending request")
    }
    return (
        <div className='container'>
            <Search
                placeholder="Search team member"
                enterButton="Search"
                size="large"
                onSearch={value => console.log(value)}
            />
            <div>
                {students.map(student => <UserCard name={student.name} id={student.nub_id} department={student.department} requestStatus={student.request_status} requestStatusId={student.request_status_id} sendRequest={sendRequest} />)}
            </div>
        </div>
    )
}
