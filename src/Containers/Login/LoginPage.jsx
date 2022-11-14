import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, message, Alert } from "antd";
import loginRightImage from "../../../src/Assets/loginRIghtImage.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as AuthActions from "../../State/Auth/AuthActions";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const loginLoading = useSelector((state) => state.auth?.loginLoading);
  const loginError = useSelector((state) => state.auth?.loginError);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(AuthActions.login(values));
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  useEffect(() => {
    if (user?.email && !user?.token) {
      message.success("Registration complete, Please login.");
    }
  }, [user]);

  useEffect(() => {
    if (user?.token) {
      navigate("/home", { replace: true });
    }
  }, [user]);
  return (
    <div className="w-full flex justify-center align-middle">
      <div
        className={`h-screen flex flex-col justify-center items-center ${styles.leftDiv}`}
      >
        <p className="text-4xl font-extrabold mb-0 text-blue-500">Login</p>
        <p className="text-xl text-center p-4 mb-4 font-bold">
          Manage your thesis or project progress
        </p>
        <Form
          name="basic"
          labelCol={{
            span: 10,
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
                message: "Please input your NUB Id!",
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
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          {loginError && (
            <Alert className={styles.alert} message={loginError} type="error" />
          )}
          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button loading={loginLoading} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div
        className={`w-1/2 flex justify-center items-center ${styles.rightDiv}`}
      >
        <img className="w-100" src={loginRightImage}></img>
      </div>
    </div>
  );
}
