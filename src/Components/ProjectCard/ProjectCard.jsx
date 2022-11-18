import React from "react";
import styles from "./ProjectCard.module.css";
import { Alert, Button } from "antd";
import { EditFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
const editIcon = <EditFilled style={{ fontSize: 24 }} />;

export default function ProjectCard({
  title,
  description,
  technologies,
  status,
  statusId,
  feedback,
  handleEdit,
}) {
  return (
    <div className="w-full">
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
        <div className="w-full mt-4 flex flex-row justify-between align-middle ">
          <div className="flex">
            <span className="mr-2 font-bold">{title}</span>
            {statusId === 4 && (
              <icon>
                <FontAwesomeIcon
                  className="mr-4 cursor-pointer"
                  icon={faEdit}
                  onClick={handleEdit}
                ></FontAwesomeIcon>
              </icon>
            )}
          </div>
          <span
            className={
              statusId === 4 ? styles.rejectedStatus : styles.pendingStatus
            }
          >
            <b>{status}</b>
          </span>
        </div>
        <p className={styles.projectTools}>{technologies}</p>
        <p className={styles.projectDescription}>{description}</p>
      </div>
    </div>
  );
}
