import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import loginRightImage from '../../../src/Assets/loginRIghtImage.svg';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
                        name="NUB Id"
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
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            <Link to="/mainlayout">Login</Link>
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
