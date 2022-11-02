import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Space, Upload, Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import "./StudentProjectThesis.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import * as ProjectActions from "../../State/Project/ProjectActions.js";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { TextArea } = Input;

export default function StudentProjectThesis() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.user?.token);
  const createProjectProposalLoading = useSelector(
    (state) => state.project?.createProjectProposalLoading
  );
  const projectLoading = useSelector((state) => state.project?.projectLoading);
  const project = useSelector((state) => state.project?.project);
  const createProjectProposal = useSelector(
    (state) => state.project?.createProjectProposal
  );

  const teamNotComplete =
    useSelector((state) => state.auth?.user?.total_members) < 3;
  const onFinish = (values) => {
    const { type, title, description, technologies } = values;
    const body = {
      nub_id: currentUser?.nub_id,
      project: type === "project" ? 1 : 0,
      thesis: type === "thesis" ? 1 : 0,
      title,
      description,
      technologies,
      token,
    };
    dispatch(ProjectActions.createProjectProposal({ body, token }));
  };

  const onFinishFailed = (errorInfo) => {};

  const callProjectDetailsApi = () => {
    const body = {
      nub_id: currentUser?.nub_id,
    };
    dispatch(ProjectActions.getProjectDetails({ body, token }));
  };
  const success = () => {
    Modal.success({
      title: "Successfully Created Project/Thesis Proposal",
      content:
        "The Co-Ordinator will review your proposal and get back to you soon",
      onOk() {
        dispatch(ProjectActions.setCreateProjectProposal(false));
        callProjectDetailsApi();
      },
    });
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    callProjectDetailsApi();
  }, []);

  useEffect(() => {
    if (createProjectProposal) {
      success();
    }
  }, [createProjectProposal]);

  return (
    <div className="w-full h-screen" style={{ fontSize: "1.5rem" }}>
      {projectLoading ? (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      ) : Object.keys(project).length > 0 ? (
        <ProjectCard
          title={project.title}
          description={project.description}
          technologies={project.technologies}
          status={project.project_status}
          statusId={project.project_status_id}
          feedback={project.feedback}
        />
      ) : (
        <div>
          <p>Fill up your project details</p>
          {!createProjectProposal && (
            <Form
              name="project"
              labelCol={{
                span: 4,
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
                    max: 50,
                    message: "You can not enter more than 50 characters",
                  },
                  {
                    min: 3,
                    message: "Minimum 3 characters is reqired",
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
                    message:
                      "Please describe your project in at least 10 characters",
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
                <Button size="big" type="primary" htmlType="submit">
                  {createProjectProposalLoading ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      )}
      {/* {!teamNotComplete && (
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
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )} */}
    </div>
  );
}
