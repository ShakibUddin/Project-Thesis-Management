import React from "react";
import styles from "./UserCard.module.css";
import defaultAvatar from "../../Assets/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as TeamActions from "../../State/Team/TeamActions";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function UserCard({
  name,
  id,
  department,
  program,
  avatar = null,
  receiverNubId = null,
  requestStatus = null,
  requestStatusId = null,
  sendMemberRequest = null,
  requestSent = false,
  showingNotification = false,
  showRequestActions = false,
  memberRequestId = null,
  requestSentIds,
  setRequestSentIds,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.user?.token);

  const memberRequestLoading = useSelector(
    (state) => state.team?.memberRequestLoading
  );
  const acceptmemberRequestLoading = useSelector(
    (state) => state.team?.acceptmemberRequestLoading
  );
  const rejectmemberRequestLoading = useSelector(
    (state) => state.team?.rejectmemberRequestLoading
  );
  const memberRequestRejected = useSelector(
    (state) => state.team?.memberRequestRejected
  );
  const memberRequestAccepted = useSelector(
    (state) => state.team?.memberRequestAccepted
  );
  const memberRequestSent = useSelector(
    (state) => state.team?.memberRequestSent
  );

  const disableButton =
    requestStatusId === 1 || (memberRequestSent && receiverNubId === id);

  const acceptMemberRequest = () => {
    const body = {
      id: memberRequestId,
    };
    dispatch(
      TeamActions.acceptMemberRequest({
        body,
        token,
      })
    );
  };

  const rejectMemberRequest = () => {
    const body = {
      id: memberRequestId,
    };
    dispatch(
      TeamActions.rejectMemberRequest({
        body,
        token,
      })
    );
  };
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
        {showingNotification && (
          <div className={styles.memberRequestActionButtonDiv}>
            <button
              onClick={acceptMemberRequest}
              className={[styles.actionButton, styles.acceptButton].join(" ")}
            >
              {acceptmemberRequestLoading ? (
                <Spin indicator={antIcon} />
              ) : memberRequestAccepted ? (
                "Accepted"
              ) : (
                "Accept"
              )}
            </button>
            <button
              onClick={rejectMemberRequest}
              className={[styles.actionButton, styles.rejectButton].join(" ")}
            >
              {rejectmemberRequestLoading ? (
                <Spin indicator={antIcon} />
              ) : memberRequestRejected ? (
                "Rejected"
              ) : (
                "Reject"
              )}
            </button>
          </div>
        )}
        {showRequestActions && (
          <button
            disabled={disableButton}
            onClick={sendMemberRequest}
            className={[
              styles.actionButton,
              disableButton ? styles.disabled : styles.active,
            ].join(" ")}
          >
            {memberRequestLoading && receiverNubId === id ? (
              <Spin indicator={antIcon} />
            ) : disableButton ? (
              "Pending"
            ) : (
              requestStatus
            )}
          </button>
        )}
      </div>
    </div>
  );
}
