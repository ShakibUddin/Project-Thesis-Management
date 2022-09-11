import React from 'react';
import { Button } from 'antd';

export default function UserCard({ name, id, department, requestStatus = null, requestStatusId = null, sendRequest = null }) {
    return (
        <div className='container'>
            <div className='details'>
                <p className='detailsText'>Name: {name}</p>
                <p className='detailsText'>Id: {id}</p>
                <p className='detailsText'>Department: {department}</p>
            </div>
            <div className='action'>
                <Button type="primary" onClick={requestStatusId && sendRequest}>{requestStatus}</Button>
            </div>
        </div>
    )
}