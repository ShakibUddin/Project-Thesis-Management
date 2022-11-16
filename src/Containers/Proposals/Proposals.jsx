import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProposalCard from "../../Components/ProposalCard/ProposalCard";
import styles from "./Proposals.module.css";
import * as ProposalActions from "../../State/Proposal/ProposalActions.js";
import { Checkbox, notification } from "antd";
import Loader from "../../Components/Loader/Loader";
import noMoreProposals from "../../Assets/noMoreProposals.webp";
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
      dispatch(ProposalActions.removeProposalError());
    }
  }, [approveProposalError]);

  return (
    <div className="w-full m-4">
      <div className="w-full">
        <div className={styles.proposalContainer}>
          {proposalsLoading ? (
            <Loader />
          ) : proposals.length ? (
            <div className="w-full flex flex-col justify-start align-top">
              <div className="w-64 p-2 mr-auto  align-middle">
                <input
                  className="w-5 h-5"
                  type="checkbox"
                  onChange={onChange}
                />
                <label> Auto assign supervisor</label>
                <br></br>
              </div>
              {proposals.map((proposal) => (
                <ProposalCard
                  projectDetails={proposal.project}
                  teamDetails={proposal.team}
                  handleRejectOrApproveProjectProposal={
                    handleRejectOrApproveProjectProposal
                  }
                  autoAssignSupervisor={autoAssignSupervisor}
                />
              ))}
            </div>
          ) : (
            <>
              <p className="text-center lg:text-2xl md:text-xl sm:text-lg mx-auto">
                You don't have any pending proposals at this moment
              </p>
              <div className="w-full p-4 m-4">
                <img
                  className="lg:w-3/5 md:w-4/5 sm:w-full mx-auto"
                  src={noMoreProposals}
                  alt=""
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
