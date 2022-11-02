import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProposalCard from "../../Components/ProposalCard/ProposalCard";
import styles from "./Proposals.module.css";
import * as ProposalActions from "../../State/Proposal/ProposalActions.js";
import { Space, Spin } from "antd";

export default function Proposals() {
  const dispatch = useDispatch();
  const proposals = useSelector((state) => state?.proposal?.proposals);
  const proposalsLoading = useSelector(
    (state) => state?.proposal?.proposalsLoading
  );
  const token = useSelector((state) => state.auth?.user?.token);

  useEffect(() => {
    dispatch(
      ProposalActions.getProposals({
        token,
      })
    );
  }, []);
  return (
    <div className={styles.proposalContainer}>
      {proposalsLoading ? (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      ) : (
        proposals.map((proposal) => (
          <ProposalCard project={proposal.project} team={proposal.team} />
        ))
      )}
    </div>
  );
}
