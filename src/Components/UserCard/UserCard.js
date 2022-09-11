import React from "react";
import { Button } from "antd";
import styles from "./UserCard.module.css";

export default function UserCard({
  name,
  id,
  department,
  requestStatus = null,
  requestStatusId = null,
  sendRequest = null,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <p className={styles.detailsText}>Name: {name}</p>
        <p className={styles.detailsText}>Id: {id}</p>
        <p className={styles.detailsText}>Department: {department}</p>
      </div>
      <div className={styles.action}>
        <Button type="primary" onClick={requestStatusId && sendRequest}>
          {requestStatus}
        </Button>
      </div>
    </div>
  );
}
