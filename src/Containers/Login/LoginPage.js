import React, { useEffect } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import loginRightImage from '../../../src/Assets/loginRIghtImage.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../../State/Auth/AuthActions';

export default function LoginPage() {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth?.user);
    const loginLoading = useSelector(state => state.auth?.loginLoading);
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch(AuthActions.login(values));
    };

    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo);
    };

    useEffect(() => {
        if (user?.email && !user?.token) {
            message.success('Registration complete, Please login.');
        }
    }, [user])

    useEffect(() => {
        if (user?.token) {
            navigate('/home', { replace: true });
        }
    }, [user])
    return (
        <div className='flex'>
            <div className='w-1/2 flex flex-col justify-center items-center'>
                <p className='text-3xl font-extrabold'>Login</p>
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
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button loading={loginLoading} type="primary" htmlType="submit">
                            Login
                        </Button>
                        <p> Don't have an account? <Link to="/signup">Create Now</Link></p>
                    </Form.Item>
                </Form>
            </div>
            <div className='w-1/2 flex justify-center items-center'>
                <img className='w-100' src={loginRightImage}></img>
            </div>
        </div>

    )
}
