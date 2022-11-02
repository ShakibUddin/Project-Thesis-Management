import React from "react";
import styles from "./ProjectCard.module.css";
import { Alert, Button } from "antd";
import { EditFilled } from "@ant-design/icons";

const editIcon = <EditFilled style={{ fontSize: 24 }} />;

export default function ProjectCard({
  title,
  description,
  technologies,
  status,
  statusId,
  feedback,
}) {
  return (
    <div className={styles.projectCardContainer}>
      {feedback && (
        <Alert
          message="Feedback"
          className="w-full"
          description={feedback}
          type="warning"
          showIcon
        />
      )}
      <div className="w-full my-4 flex flex-row justify-between align-center">
        <span className="mr-4">
          <b>Title:</b> {title}
        </span>

        <span
          className={
            statusId === 4 ? styles.rejectedStatus : styles.pendingStatus
          }
        >
          <b>{status}</b>
        </span>
        {feedback && (
          <Button
            className="ml-4"
            space={{ py: 2 }}
            icon={editIcon}
            type="primary"
            htmlType="submit"
          >
            Edit
          </Button>
        )}
      </div>
      <p>
        <b>Description:</b> {description}
      </p>
      <p>
        <b>Technologies:</b> {technologies}
      </p>
    </div>
  );
}
