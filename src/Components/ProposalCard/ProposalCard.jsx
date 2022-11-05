import React, { useState } from "react";
import UserCard from "../UserCard/UserCard";
import styles from "./ProposalCard.module.css";
import { Collapse, Select } from "antd";
import { Button, Form, Input, Modal, Space, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as ProposalActions from "../../State/Proposal/ProposalActions.js";
import TextArea from "antd/lib/input/TextArea";
import { useEffect } from "react";

const { Panel } = Collapse;

export default function ProposalCard({
  project,
  team,
  handleRejectOrApproveProjectProposal = null,
  autoAssignSupervisor = false,
}) {
  const dispatch = useDispatch();
  const { title, description, technologies } = project;
  const onChange = (key) => {};
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
        teamId: project.teamId,
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
      projectId: project.projectId,
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
      teamId: project.teamId,
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
      handleRejectOrApproveProjectProposal(project.projectId);
    }
  }, [rejectProposal, approveProposal]);

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
          label: `${supervisor.name}\nTeams:${supervisor.total_assign_team}`,
        }))
      );
    }
  }, [supervisors]);
  return (
    <div
      className={`flex flex-col justify-start align-top w-full p-4 ${styles.proposalCard}`}
    >
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Project" key="1">
          <p>
            <b>Title:</b> {title}
          </p>
          <p>
            <b>Description:</b> {description}
          </p>
          <p>
            <b>Technologies:</b> {technologies}
          </p>
        </Panel>
        <Panel header="Team" key="2">
          <div className={styles.studentContainer}>
            {team.map((member) => (
              <UserCard
                name={member.name}
                id={member.nub_id}
                department={member.department_name}
                program={member.program_name}
                leader={member.team_leader}
              />
            ))}
          </div>
        </Panel>
        {project?.feedback?.length > 0 && (
          <Panel header="Previous Feedback" key="3">
            <p>{project.feedback}</p>
          </Panel>
        )}
      </Collapse>

      {currentUser.member_status_id === 2 && (
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

      <Modal
        title="Reject Proposal"
        visible={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
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
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
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
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 20,
          }}
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
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
