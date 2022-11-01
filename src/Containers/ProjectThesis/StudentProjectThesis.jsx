import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Space, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import "./StudentProjectThesis.module.css";
import styled from "styled-components";
import * as TeamActions from "../../State/Team/TeamActions.js";

const { TextArea } = Input;

export default function StudentProjectThesis() {
  const createUserLoading = useSelector(
    (state) => state.auth?.createUserLoading
  );
  const teamNotComplete =
    useSelector((state) => state.auth?.user?.total_members) < 3;
  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {};

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="w-full h-screen" style={{ fontSize: "1.5rem" }}>
      <Form
        name="project"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please select a type",
            },
          ]}
          style={{ flex: "0 0 20.33333333%" }}
          label="Type"
          name="type"
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="thesis"> Thesis </Radio>
              <Radio value="project"> Project </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter your title",
            },
            {
              max: 100,
              message: "You can not enter more than 100 characters",
            },
            {
              min: 10,
              message: "Minimum 10 characters is reqired",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please describe your project",
            },
            {
              max: 10000,
              message: "You can not enter more than 10000 characters",
            },
            {
              min: 200,
              message:
                "Please describe your project in at least 100 characters",
            },
          ]}
          label="Description"
          name="description"
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message:
                "Please enter the technologies you will use(e.g. Java, Python)",
            },
            {
              max: 1000,
              message: "You can not enter more than 1000 characters",
            },
            {
              min: 10,
              message: "Please describe your project in at least 10 characters",
            },
          ]}
          label="Technologies"
          name="technologies"
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
          }}
        >
          <Button loading={createUserLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {!teamNotComplete && (
        <Form
          name="paper"
          labelCol={{
            span: 5,
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
          <Form.Item label="Paper">
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
            }}
          >
            <Button
              loading={createUserLoading}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
