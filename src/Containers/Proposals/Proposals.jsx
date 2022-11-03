import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProposalCard from "../../Components/ProposalCard/ProposalCard";
import styles from "./Proposals.module.css";
import * as ProposalActions from "../../State/Proposal/ProposalActions.js";
import { Button, Form, Input, Modal, Space, Spin, Checkbox } from "antd";
import TextArea from "antd/lib/input/TextArea";

export default function Proposals() {
  const dispatch = useDispatch();
  const [autoAssignSupervisor, setAutoAssignSupervisor] = useState(false);
  const proposals = useSelector((state) => state?.proposal?.proposals);
  const proposalsLoading = useSelector(
    (state) => state?.proposal?.proposalsLoading
  );
  const rejectProposal = useSelector(
    (state) => state?.proposal?.rejectProposal
  );
  const token = useSelector((state) => state.auth?.user?.token);

  const handleRejectOrApproveProjectProposal = (projectId) => {
    dispatch(ProposalActions.updateProposal(projectId));
  };
  useEffect(() => {
    dispatch(
      ProposalActions.getProposals({
        token,
      })
    );
  }, []);
  const onChange = (e) => {
    setAutoAssignSupervisor(e.target.checked);
  };
  useEffect(() => {
    if (rejectProposal) {
    }
  }, [rejectProposal]);
  return (
    <div className={styles.container}>
      <div className={styles.proposalContainer}>
        {proposalsLoading ? (
          <Space size="middle">
            <Spin size="large" />
          </Space>
        ) : proposals.length ? (
          <div className="w-full flex flex-col justify-start align-top">
            <div className="w-auto p-2 mr-auto">
              <Checkbox className={styles.checkbox} onChange={onChange}>
                Auto assign supervisor
              </Checkbox>
            </div>
            {proposals.map((proposal) => (
              <ProposalCard
                project={proposal.project}
                team={proposal.team}
                handleRejectOrApproveProjectProposal={
                  handleRejectOrApproveProjectProposal
                }
                autoAssignSupervisor={autoAssignSupervisor}
              />
            ))}
          </div>
        ) : (
          <p>You don't have any pending proposals at this moment</p>
        )}
      </div>
    </div>
  );
}
