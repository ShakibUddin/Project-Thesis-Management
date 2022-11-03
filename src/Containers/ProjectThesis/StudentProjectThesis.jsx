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
  const projectDetails = useSelector((state) => state.project?.project);
  const createProjectProposal = useSelector(
    (state) => state.project?.createProjectProposal
  );
  const updateProjectProposal = useSelector(
    (state) => state.project?.updateProjectProposal
  );
  const updatedProjectProposalLoading = useSelector(
    (state) => state.project?.updateProjectProposalLoading
  );
  useEffect(() => {
    console.log("updatedProjectProposalLoading", updatedProjectProposalLoading);
  }, [updatedProjectProposalLoading]);
  useEffect(() => {
    console.log("updateProjectProposal", updateProjectProposal);
    if (updateProjectProposal) {
      setEditing(false);
      const body = {
        nub_id: currentUser?.nub_id,
      };
      dispatch(ProjectActions.getProjectDetails({ body, token }));
    }
  }, [updateProjectProposal]);
  const [editing, setEditing] = useState(false);
  const teamNotComplete =
    useSelector((state) => state.auth?.user?.total_members) < 3;
  const onFinish = (values) => {
    console.log(values);
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
    if (editing) {
      const body = {
        projectId: projectDetails?.projectId,
        project: type === "project" ? 1 : 0,
        thesis: type === "thesis" ? 1 : 0,
        title,
        description,
        technologies,
        token,
      };
      dispatch(ProjectActions.updateProjectProposal({ body, token }));
    } else {
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
    }
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

  const handleEdit = () => {
    setEditing(true);
  };

  useEffect(() => {
    console.log("editing", editing);
  }, [editing]);
  return (
    <div className="w-full h-screen" style={{ fontSize: "1.5rem" }}>
      {projectLoading ? (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      ) : Object.keys(projectDetails).length > 0 && !editing ? (
        <ProjectCard
          title={projectDetails.title}
          description={projectDetails.description}
          technologies={projectDetails.technologies}
          status={projectDetails.project_status}
          statusId={projectDetails.project_status_id}
          feedback={projectDetails.feedback}
          handleEdit={handleEdit}
        />
      ) : (
        <div>
          <p>Fill up your project details</p>
          {(!createProjectProposal || editing) && (
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
                type: projectDetails?.project === 1 ? "project" : "thesis",
                title: projectDetails?.title,
                description: projectDetails?.description,
                technologies: projectDetails?.technologies,
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
                    <Radio value="thesis" name="thesis">
                      {" "}
                      Thesis{" "}
                    </Radio>
                    <Radio value="project" name="project">
                      {" "}
                      Project{" "}
                    </Radio>
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
                {!editing && (
                  <Button size="big" type="primary" htmlType="submit">
                    {createProjectProposalLoading ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                )}
                {editing && (
                  <Button size="big" type="primary" htmlType="submit">
                    {updatedProjectProposalLoading ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      "Update"
                    )}
                  </Button>
                )}
              </Form.Item>
            </Form>
          )}
        </div>
      )}
      {projectDetails.project_status === 3 && (
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
