import React from "react";
import styles from "./UserCard.module.css";
import defaultAvatar from "../../Assets/avatar.jpg";

export default function UserCard({
  name,
  id,
  department,
  program,
  avatar = null,
  loading = null,
  requestStatus = null,
  requestStatusId = null,
  sendRequest = null,
}) {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.leftDiv}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={avatar || defaultAvatar}
              alt=""
            />
          </div>
        </div>
        <div className={styles.rightDiv}>
          <p className={styles.detailsText}>Name: {name}</p>
          <p className={styles.detailsText}>Id: {id}</p>
          <p className={styles.detailsText}>Department: {department}</p>
          <p className={styles.detailsText}>Program: {program}</p>
        </div>
      </div>
      <div className={styles.action}>
        <button
          disabled={requestStatusId === 1}
          onClick={sendRequest}
          className={[
            styles.actionButton,
            requestStatusId === 1 ? styles.disabled : styles.active,
          ].join(" ")}
        >
          {requestStatus}
        </button>
      </div>
    </div>
  );
}
