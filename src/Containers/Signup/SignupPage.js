import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, Select, message } from 'antd';
import signupRightImage from '../../../src/Assets/signupRightImage.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../../State/Auth/AuthActions';

export default function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const departments = useSelector(state => state.auth?.departments);
    const programs = useSelector(state => state.auth?.programs);
    const departmentsLoading = useSelector(state => state.auth?.departmentsLoading);
    const programsLoading = useSelector(state => state.auth?.programsLoading);
    const createUserLoading = useSelector(state => state.auth?.createUserLoading);
    const user = useSelector(state => state.auth?.user);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [programOptions, setProgramOptions] = useState([]);
    const onFinish = (values) => {
        for (let department of departments) {
            if (department.name === values.department) {
                values.department_id = department.department_id;
                delete values.department;
            }
        }
        for (let program of programs) {
            if (program.name === values.program) {
                values.program_id = program.program_id;
                delete values.program;
            }
        }
        values.avatar = null;
        dispatch(AuthActions.createUser(values));
    };

    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo);
    };

    useEffect(() => {
        dispatch(AuthActions.getDepartments());
        dispatch(AuthActions.getPrograms());
    }, []);

    useEffect(() => {
        if (departments.length > 0 && departmentOptions.length === 0) {
            setDepartmentOptions(departments.map(department => ({ key: department.department_id, value: department.name })))
        }
    }, [departmentOptions, departments]);

    useEffect(() => {
        if (programs.length > 0 && programOptions.length === 0) {
            setProgramOptions(programs.map(program => ({ key: program.program_id, value: program.name })))
        }
    }, [programs, programOptions]);

    useEffect(() => {
        if (user) {
            navigate('/login', { replace: true });
        }
    }, [user])
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
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="NUB Id"
                        name="nub_id"
                        placeholder="Enter NUB Id. e.g. 04180xxxxxx"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your NUB Id!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Select Department" name="department" rules={[
                        {
                            required: true,
                            message: 'Please select your department!',
                        },
                    ]}>
                        <Select options={departmentOptions} placeholder="Please select Department">
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Select Program" name="program" rules={[
                        {
                            required: true,
                            message: 'Please select your program!',
                        },
                    ]}>
                        <Select options={programOptions} placeholder="Please select Program">
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
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
                        hasFeedback
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
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button loading={createUserLoading} type="primary" htmlType="submit">
                            Signup
                        </Button>
                        <p> Already have an account? <Link to="/login">Login</Link></p>
                    </Form.Item>
                </Form>
            </div>
            <div className='w-1/2 flex justify-center items-center'>
                <img className='w-100' src={signupRightImage}></img>
            </div>
        </div>

    )
}
