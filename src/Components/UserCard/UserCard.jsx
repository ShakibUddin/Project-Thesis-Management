import React, { useState } from "react";
import styles from "./UserCard.module.css";
import defaultAvatar from "../../Assets/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as TeamActions from "../../State/Team/TeamActions";
import { makeApiCall } from "../../client";
import { METHODS, PATHS } from "../../Constants/ApiConstants";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function UserCard({
  name,
  id,
  department,
  program,
  avatar = null,
  requestStatus = null,
  requestStatusId = null,
  requestSent = false,
  showingNotification = false,
  showRequestActions = false,
  memberRequestId = null,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.user?.token);
  const currentUser = useSelector((state) => state.auth?.user);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
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
  const requestSentIds = useSelector((state) => state.team?.requestSentIds);

  const disableButton = requestStatusId === 1 || data?.requestSent;

  const acceptMemberRequest = () => {
    setLoading(true);

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
    setLoading(true);

    const body = {
      id: memberRequestId,
    };
    makeApiCall({
      method: METHODS.DELETE,
      path: PATHS.REJECT_REQUEST,
      body,
      token,
    }).then((response) => {
      const { data, message, error } = response;
      setData(data);
      setMessage(message);
      setError(error);
      setLoading(false);
    });
    dispatch(
      TeamActions.rejectMemberRequest({
        body,
        token,
      })
    );
  };

  const sendMemberRequest = async () => {
    setLoading(true);
    const body = {
      sender_nub_id: currentUser.nub_id,
      receiver_nub_id: id,
    };
    makeApiCall({
      method: METHODS.POST,
      path: PATHS.SEND_REQUEST,
      body,
      token,
    }).then((response) => {
      const { data, message, error } = response;
      setData(data);
      setMessage(message);
      setError(error);
      setLoading(false);
    });
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
            {loading ? (
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
