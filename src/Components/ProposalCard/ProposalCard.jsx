import React, { useState } from "react";
import UserCard from "../UserCard/UserCard";
import styles from "./ProposalCard.module.css";
import { Alert, Collapse, Select } from "antd";
import { Button, Form, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as ProposalActions from "../../State/Proposal/ProposalActions.js";
import TextArea from "antd/lib/input/TextArea";
import { useEffect } from "react";
import { AVATAR_BASE } from "../../Constants/ImageConstants.js";
import defaultAvatar from "../../Assets/avatar.jpg";
import * as TeamActions from "../../State/Team/TeamActions.js";
import Loader from "../Loader/Loader";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { makeApiCall } from "../../client";
import { METHODS, PATHS } from "../../Constants/ApiConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
const { Panel } = Collapse;
const { confirm } = Modal;

export default function ProposalCard({
  projectDetails,
  teamDetails,
  handleRejectOrApproveProjectProposal = null,
  handleProjectComplete = null,
  autoAssignSupervisor = false,
  showActions = true,
}) {
  const dispatch = useDispatch();
  const {
    project,
    thesis,
    project_status_id,
    total_meetup,
    paper,
    title,
    description,
    technologies,
  } = projectDetails;
  const BASE_URL = "https://smtprojectbackend.arifmannan.com";
  const paperDownloadPath = BASE_URL + paper;
  const type = project === 1 ? "Project" : "Thesis";
  const onChange = (key) => {};
  const [data, setData] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supervisorOptions, setSupervisorOptions] = useState([]);
  const [supervisorId, setSupervisorId] = useState();
  const [isSupervisorSelectionModalOpen, setIsSupervisorSelectionModalOpen] =
    useState(false);
  const token = useSelector((state) => state.auth?.user?.token);
  const currentUser = useSelector((state) => state.auth?.user);
  const rejectProposal = useSelector((state) => state.proposal?.rejectProposal);

  const approveProposal = useSelector(
    (state) => state.proposal?.approveProposal
  );
  const supervisors = useSelector((state) => state.proposal?.supervisors);
  const supervisorsLoading = useSelector(
    (state) => state.proposal?.supervisorsLoading
  );

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleApprove = () => {
    if (autoAssignSupervisor) {
      const body = {
        teamId: projectDetails.teamId,
        supervisor_nub_id: null,
        auto_assign: autoAssignSupervisor,
      };
      dispatch(
        ProposalActions.approveProposal({
          body,
          token,
        })
      );
    } else {
      showSupervisorModal();
    }
  };
  const handleComplete = () => {
    confirm({
      title: `Do you want to complete this teams's ${type}?`,
      icon: <ExclamationCircleOutlined />,
      content: "This can not be reverted",
      onOk() {
        setLoading(true);
        const body = {
          project_id: projectDetails.projectId,
        };

        makeApiCall({
          method: METHODS.PUT,
          path: PATHS.COMPLETE_PROJECT,
          body,
          token,
        }).then((response) => {
          const { data, message, error } = response;
          setData(data);
          setMessage(message);
          setError(error);
          setLoading(false);
          const body = {
            supervisor_nub_id: currentUser?.nub_id,
          };
          dispatch(
            TeamActions.getSupervisorTeamDetails({
              body,
              token,
            })
          );
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const showSupervisorModal = () => {
    dispatch(
      ProposalActions.getAllSupervisors({
        token,
      })
    );
    setIsSupervisorSelectionModalOpen(true);
  };

  const onFinish = (values) => {
    setIsModalOpen(false);
    const body = {
      feedback: values.feedback,
      projectId: projectDetails.projectId,
    };
    dispatch(
      ProposalActions.rejectProposal({
        body,
        token,
      })
    );
  };
  const onSupervisorSelectionFinish = (values) => {
    setIsSupervisorSelectionModalOpen(false);
    const body = {
      teamId: projectDetails.teamId,
      supervisor_nub_id: supervisorId,
      auto_assign: autoAssignSupervisor,
    };
    dispatch(
      ProposalActions.approveProposal({
        body,
        token,
      })
    );
  };

  useEffect(() => {
    if (rejectProposal || approveProposal) {
      handleRejectOrApproveProjectProposal(projectDetails.projectId);
    }
  }, [rejectProposal, approveProposal]);
  // useEffect(() => {
  //   if (data?.completeProject) {
  //     console.log("handling Project Complete for", projectDetails.projectId);
  //     dispatch(
  //       TeamActions.updateSupervisorTeamDetails(projectDetails.projectId)
  //     );
  //   }
  // }, [data]);

  const onFinishFailed = (errorInfo) => {
    //   message.error(errorInfo);
  };
  const onSupervisorSelectionFinishFailed = (errorInfo) => {
    //   message.error(errorInfo);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSupervisorModalCancel = () => {
    setIsSupervisorSelectionModalOpen(false);
  };

  const onChangeSupervisor = (value) => {
    setSupervisorId(value);
  };
  const onSearch = (value) => {};

  useEffect(() => {
    if (supervisors?.length > 0) {
      setSupervisorOptions(
        supervisors.map((supervisor) => ({
          value: supervisor.nub_id,
          label: (
            <div className={styles.dropDownItemStyle}>
              <p className="m-0 font-bold">Name: {supervisor.name}</p>
              <p className="m-0 font-bold">
                Teams: {supervisor.total_assign_team}
              </p>
            </div>
          ),
        }))
      );
    }
  }, [supervisors]);
  return (
    <div
      className={`flex flex-col justify-start align-top w-11/12 p-2 mb-3 ${styles.proposalCard}`}
    >
      <div className="flex justify-between w-full flex-wrap">
        <div className={styles.leftDiv}>
          <span
            className={
              project_status_id === 2
                ? styles.ongoingStatus
                : project_status_id === 3 && styles.completeStatus
            }
          ></span>

          <p className="text-2xl font-extrabold">{type}:</p>
          <p>
            <b>Title:</b> {title}
          </p>
          <p className="text-justify w-full">
            <b>Description:</b> {description}
          </p>
          <p>
            <b>Tools:</b> {technologies}
          </p>
          {currentUser.member_status_id === 3 && (
            <p>
              <b>Total Completed Meetups:</b> {total_meetup}
            </p>
          )}
        </div>

        <div className={styles.rightDiv}>
          <p className="text-2xl font-extrabold">Team:</p>
          {teamDetails.map((member) => (
            <div className="flex mb-4">
              <div className={styles.avatarContainer}>
                <img
                  className={styles.avatar}
                  src={
                    member.avatar
                      ? `${AVATAR_BASE}${member.avatar}`
                      : defaultAvatar
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col w-5/6">
                <p className="m-0 font-bold">
                  {member.name}
                  {member.team_leader === 1 && "(Team Leader)"}
                  {member.member_status_id === 3 && "(Supervisor)"}
                </p>
                <p className="m-0">{member.nub_id}</p>
                <p className="m-0">
                  {member.department_name}({member.program_name})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {paper && (
        <div className="m-2">
          <span className="text-xl font-bold mr-4">
            {project === 1 ? "Project Book:" : "Thesis Paper:"}
          </span>

          <a href={paperDownloadPath} download target="_blank" rel="noreferrer">
            {" "}
            <icon>
              <FontAwesomeIcon
                className="w-9 h-9 mr-4 cursor-pointer"
                icon={faFilePdf}
              />
            </icon>{" "}
          </a>
        </div>
      )}
      {projectDetails?.feedback?.length > 0 && (
        <div>
          <p className="font-bold text-2xl">Previous Feedback:</p>
          <Alert message={projectDetails.feedback} type="info" />
        </div>
      )}

      {showActions && (
        <>
          {currentUser.member_status_id === 4 && (
            <div className="flex justify-center align-middle flex-wrap">
              <button
                className={[styles.actionButton, styles.acceptButton].join(" ")}
                onClick={handleApprove}
              >
                Approve
              </button>
              <button
                className={[styles.actionButton, styles.rejectButton].join(" ")}
                onClick={showModal}
              >
                Reject
              </button>
            </div>
          )}

          {currentUser.member_status_id === 3 && project_status_id === 2 && (
            <div className="flex justify-center align-middle flex-wrap">
              <button
                style={{ minWidth: "200px" }}
                className={[styles.actionButton, styles.acceptButton].join(" ")}
                onClick={handleComplete}
              >
                {loading ? <Loader /> : "Complete Project"}
              </button>
            </div>
          )}
        </>
      )}

      <Modal
        title="Reject Proposal"
        visible={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Feedback"
            name="feedback"
            rules={[
              {
                required: true,
                message: "Please provide feedback",
              },
              {
                max: 500,
                message: "You can not enter more than 500 characters",
              },
              {
                min: 10,
                message: "Minimum 10 characters is reqired",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Select Supervisor"
        visible={isSupervisorSelectionModalOpen}
        footer={null}
        onCancel={handleSupervisorModalCancel}
      >
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onSupervisorSelectionFinish}
          onFinishFailed={onSupervisorSelectionFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="supervisor"
            label="Supervisor"
            rules={[
              {
                required: true,
                message: "Please select a supervisor",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a supervisor"
              optionFilterProp="children"
              loading={supervisorsLoading}
              onChange={onChangeSupervisor}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={supervisorOptions}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
