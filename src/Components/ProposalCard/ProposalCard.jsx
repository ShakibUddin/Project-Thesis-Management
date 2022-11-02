import React from "react";
import UserCard from "../UserCard/UserCard";
import styles from "./ProposalCard.module.css";
import { Collapse } from "antd";
const { Panel } = Collapse;
export default function ProposalCard({ project, team }) {
  const { title, description, technologies } = project;
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div
      className={`flex flex-col justify-start align-top w-full h-auto p-4 ${styles.proposalCard}`}
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
              />
            ))}
          </div>
        </Panel>
      </Collapse>

      <div className="flex justify-center align-middle flex-wrap">
        <button
          className={[styles.actionButton, styles.acceptButton].join(" ")}
        >
          Approve
        </button>
        <button
          className={[styles.actionButton, styles.rejectButton].join(" ")}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
