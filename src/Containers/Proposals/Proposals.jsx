import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProposalCard from "../../Components/ProposalCard/ProposalCard";
import styles from "./Proposals.module.css";
import * as ProposalActions from "../../State/Proposal/ProposalActions.js";
import { Checkbox, notification } from "antd";
import Loader from "../../Components/Loader/Loader";

export default function Proposals() {
  const dispatch = useDispatch();
  const [autoAssignSupervisor, setAutoAssignSupervisor] = useState(false);
  const proposals = useSelector((state) => state?.proposal?.proposals);
  const proposalsLoading = useSelector(
    (state) => state?.proposal?.proposalsLoading
  );
  const approveProposalError = useSelector(
    (state) => state?.proposal?.approveProposalError
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
  const openNotification = (message) => {
    notification.open({
      message,
      placement: "bottomLeft",
      onClick: () => {},
    });
  };
  useEffect(() => {
    if (approveProposalError) {
      openNotification(approveProposalError);
    }
  }, [approveProposalError]);

  return (
    <div className="w-full h-screen">
      <div className={styles.proposalContainer}>
        {proposalsLoading ? (
          <Loader />
        ) : proposals.length ? (
          <div className="w-full flex flex-col justify-start align-top">
            <div className="w-30 p-2 mr-auto">
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
