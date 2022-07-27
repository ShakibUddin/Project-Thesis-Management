import React, { useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, message } from 'antd';
import signupRightImage from '../../../src/Assets/signupRightImage.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../../State/Auth/AuthActions';
import { makeApiCall } from '../../client';
import { METHODS, PATHS } from '../../Constants/ApiConstants';

export default function SignupPage() {
    const dispatch = useDispatch();
    const departments = useSelector(state => state?.auth?.departments);
    const onFinish = (values) => {
        // signup(values)
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (departments.length === 0) {
            dispatch(AuthActions.getDepartments());
        }
    }, [departments]);
    return (
        <div className='flex'>
            <div className='w-1/2 flex flex-col justify-center items-center'>
                <p className='text-3xl font-extrabold'>Signup</p>
                <p className='text-2xl'>Manage your thesis or project progress</p>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="NUB Id"
                        name="nub_id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your NUB Id!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Select Department">
                        <Select options={departments}>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password again!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Signup
                        </Button>
                        <p> Already have an account? <Link to="/signin">Login</Link></p>
                    </Form.Item>
                </Form>
            </div>
            <div className='w-1/2 flex justify-center items-center'>
                <img className='w-100' src={signupRightImage}></img>
            </div>
        </div>

    )
}
