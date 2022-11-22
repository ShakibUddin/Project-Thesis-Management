import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Select, message } from "antd";
import signupRightImage from "../../../src/Assets/signupRightImage.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SignupPage.module.css";
import * as AuthActions from "../../State/Auth/AuthActions";
import FormSubmitButton from "../../Components/FormSubmitButton/FormSubmitButton";
import loginbg from "../../../src/Assets/loginbg.jpg";
import Loader from "../../Components/Loader/Loader";

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const departments = useSelector((state) => state.auth?.departments);
  const programs = useSelector((state) => state.auth?.programs);
  const userTypes = useSelector((state) => state.auth?.userTypes);
  const departmentsLoading = useSelector(
    (state) => state.auth?.departmentsLoading
  );
  const programsLoading = useSelector((state) => state.auth?.programsLoading);
  const createUserLoading = useSelector(
    (state) => state.auth?.createUserLoading
  );
  const user = useSelector((state) => state.auth?.user);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [userTypesOptions, setUserTypesOptions] = useState([]);
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
    for (let type of userTypes) {
      if (type.name === values.memberStatus) {
        values.member_status_id = type.status_id;
        delete values.memberStatus;
      }
    }
    delete values.confirmPassword;
    values.avatar = null;
    console.log(values);
    dispatch(AuthActions.createUser(values));
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  useEffect(() => {
    dispatch(AuthActions.getDepartments());
    dispatch(AuthActions.getPrograms());
    dispatch(AuthActions.getUserTypes());
  }, []);

  useEffect(() => {
    if (departments?.length > 0 && departmentOptions.length === 0) {
      setDepartmentOptions(
        departments.map((department) => ({
          key: department.department_id,
          value: department.name,
        }))
      );
    }
  }, [departmentOptions, departments]);

  useEffect(() => {
    if (programs?.length > 0 && programOptions.length === 0) {
      setProgramOptions(
        programs.map((program) => ({
          key: program.program_id,
          value: program.name,
        }))
      );
    }
  }, [programs, programOptions]);

  useEffect(() => {
    if (userTypes?.length > 0 && userTypesOptions.length === 0) {
      const filterdUserTypes = [];
      userTypes.forEach((userType) => {
        if (userType.status_id !== 2 && userType.status_id !== 4) {
          filterdUserTypes.push({
            key: userType.status_id,
            value: userType.name,
          });
        }
      });
      setUserTypesOptions([...filterdUserTypes]);
    }
  }, [userTypes, userTypesOptions]);

  console.log(userTypesOptions);
  console.log(userTypes);
  useEffect(() => {
    if (user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  return (
    <div className="w-full flex justify-center align-middle h-screen">
      <div
        className={`flex flex-col justify-center items-center ${styles.leftDiv}`}
      >
        <p className="text-4xl font-extrabold mb-0 ">Create an account</p>

        <Form
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="User Type"
            name="memberStatus"
            rules={[
              {
                required: true,
                message: "Please select a user type!",
              },
            ]}
          >
            <Select
              options={userTypesOptions}
              placeholder="Please select user type"
            >
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
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
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
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
                message: "Please input your NUB Id!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Select Department"
            name="department"
            rules={[
              {
                required: true,
                message: "Please select your department!",
              },
            ]}
          >
            <Select
              options={departmentOptions}
              placeholder="Please select Department"
            >
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Select Program"
            name="program"
            rules={[
              {
                required: true,
                message: "Please select your program!",
              },
            ]}
          >
            <Select
              options={programOptions}
              placeholder="Please select Program"
            >
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
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
                message: "Please input your password again!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <FormSubmitButton>
              {createUserLoading ? <Loader /> : "Signup"}
            </FormSubmitButton>

            <p className="mt-4">
              {" "}
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
      <div
        className={`w-1/2 flex justify-center items-center ${styles.rightDiv}`}
      >
        <img className="w-full h-screen" src={loginbg}></img>
      </div>
    </div>
  );
}
