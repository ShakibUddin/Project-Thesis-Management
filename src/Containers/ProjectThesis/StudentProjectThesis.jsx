import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Space, Upload, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";
import styles from "./StudentProjectThesis.module.css";
import * as ProjectActions from "../../State/Project/ProjectActions.js";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import Loader from "../../Components/Loader/Loader";
import FormSubmitButton from "../../Components/FormSubmitButton/FormSubmitButton";
import formTeam from "../../Assets/formTeam.jpg";
import cantFillUpForm from "../../Assets/cantFillUpForm.webp";
import { message } from "antd/lib";
import { BASE_URL, PATHS } from "../../Constants/ApiConstants";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFilePdf } from "@fortawesome/free-solid-svg-icons";
const { TextArea } = Input;

export default function StudentProjectThesis() {
  const [selectedType, setSelectedType] = useState();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.user);
  const teamDetails = useSelector((state) => state.team?.teamDetails);
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
  const paperUploadPath = BASE_URL + PATHS.UPLOAD_PAPER;
  const [uploading, setUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  useEffect(() => {
    if (updateProjectProposal) {
      setEditing(false);
      const body = {
        nub_id: currentUser?.nub_id,
      };
      dispatch(ProjectActions.getProjectDetails({ body, token }));
    }
  }, [updateProjectProposal]);
  const [editing, setEditing] = useState(false);

  const onFinish = (values) => {
    const { type, title, description, technologies } = values;
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
      title: `Successfully Created ${setSelectedType} Proposal`,
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

  const beforeUpload = (file) => {
    const isExcelFile = file.name.split(".").at(-1) === "pdf";
    if (!isExcelFile) {
      message.error("You can only upload pdf file!");
    }
    const isLt2M = file.size / 1024 < 10240;
    if (!isLt2M) {
      message.error("File must smaller than 10mb!");
    }
    return isExcelFile && isLt2M;
  };
  const paperUploadProps = {
    customRequest: (options) => {
      console.log("options", options);
      const formData = new FormData();
      formData.append("project_file", options.file);
      formData.append("project_id", projectDetails?.projectId);
      setUploading(true);
      // You can use any AJAX library you like
      axios({
        method: "put",
        url: paperUploadPath,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          console.log(response.data.data.file_path);
          setFileUploaded(true);
          message.success("File uploaded successfully.");
        })
        .catch(function (response) {
          message.error("Avatar upload failed.");
        })
        .finally(() => {
          setUploading(false);
        });
    },
    showUploadList: false,
  };
  return (
    <div
      className="w-full overflow-x-hidden mt-4"
      style={{ fontSize: "1.5rem" }}
    >
      {currentUser.total_members >= 3 || teamDetails.length >= 3 ? (
        <div>
          {projectLoading ? (
            <Space size="middle">
              <Loader />
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
          ) : currentUser?.team_leader === 1 ? (
            <div>
              <p className="text-center font-bold">
                Fill up your project details
              </p>
              {(!createProjectProposal || editing) && (
                <Form
                  name="project"
                  initialValues={{
                    remember: true,
                    type: projectDetails?.project === 1 ? "project" : "thesis",
                    title: projectDetails?.title,
                    description: projectDetails?.description,
                    technologies: projectDetails?.technologies,
                  }}
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 14,
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
                      <div className="flex">
                        <div className="mr-10">
                          <Radio value="thesis" name="thesis">
                            Thesis
                          </Radio>
                        </div>
                        <div>
                          <Radio value="project" name="project">
                            Project
                          </Radio>
                        </div>
                      </div>
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
                    label="Tools"
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
                      <FormSubmitButton>
                        {createProjectProposalLoading ? <Loader /> : "Submit"}
                      </FormSubmitButton>
                    )}
                    {editing && (
                      <FormSubmitButton
                        size="big"
                        type="primary"
                        htmlType="submit"
                      >
                        {updatedProjectProposalLoading ? <Loader /> : "Update"}
                      </FormSubmitButton>
                    )}
                  </Form.Item>
                </Form>
              )}
            </div>
          ) : (
            <>
              <p className="text-center">
                Only team leader can fill up project proposal form
              </p>
              <div className="w-full p-4 m-4">
                <img
                  className="lg:w-3/5 md:w-4/5 sm:w-full mx-auto"
                  src={cantFillUpForm}
                  alt=""
                />
              </div>
            </>
          )}
          {projectDetails.project_status_id === 3 && (
            <>
              <div className="m-6">
                <Form
                  name="paper"
                  layout="vertical"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <p className="text-xl font-extrabold">
                    {projectDetails.project === 1
                      ? "Upload Project Book:"
                      : "Upload Thesis Paper:"}
                  </p>
                  <Form.Item
                    name="dragger"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                  >
                    <Upload.Dragger
                      beforeUpload={beforeUpload}
                      {...paperUploadProps}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                  <br />
                  <Form.Item>
                    <FormSubmitButton>
                      {uploading ? <Loader /> : "Upload"}
                    </FormSubmitButton>
                  </Form.Item>
                </Form>
              </div>

              {fileUploaded ||
                (projectDetails.paper && (
                  <div className="m-6">
                    <span className="text-xl font-extrabold mr-4">
                      {projectDetails.project === 1
                        ? "Project Book:"
                        : "Thesis Paper:"}
                    </span>
                    <icon>
                      <FontAwesomeIcon
                        className="w-9 h-9 mr-4 cursor-pointer"
                        icon={faFilePdf}
                        onClick={handleEdit}
                      />
                    </icon>
                  </div>
                ))}
            </>
          )}
        </div>
      ) : (
        <>
          <p className="text-center">
            Please form a team before sending project proposal
          </p>
          <div className="w-full p-4 m-4">
            <img
              className="lg:w-3/5 md:w-4/5 sm:w-full mx-auto"
              src={formTeam}
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
}
