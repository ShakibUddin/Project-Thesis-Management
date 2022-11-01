import React, { useEffect, useState } from "react";
import styles from "./UserCard.module.css";
import defaultAvatar from "../../Assets/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as TeamActions from "../../State/Team/TeamActions";
import { makeApiCall } from "../../client";
import { METHODS, PATHS } from "../../Constants/ApiConstants";
import * as NotificationsActions from "../../State/Notifications/NotificationsActions";

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
  const [loadingAcceptRequest, setLoadingAcceptRequest] = useState(false);
  const [loadingRejectRequest, setloadingRejectRequest] = useState(false);
  const [data, setData] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [accepted, setAccepted] = useState(0);

  const disableButton = requestStatusId === 1 || data?.requestSent;
  const acceptedRequest = useSelector((state) => state?.team?.acceptedRequest);
  useEffect(() => {
    if (acceptedRequest === 2) {
      const body = {
        receiver_nub_id: currentUser?.nub_id,
      };
      dispatch(
        NotificationsActions.getAllMemberRequestNotifications({
          body,
          token,
        })
      );
    }
  }, [acceptedRequest]);

  const acceptMemberRequest = () => {
    setLoadingAcceptRequest(true);

    const body = {
      id: memberRequestId,
    };
    makeApiCall({
      method: METHODS.PUT,
      path: PATHS.ACCEPT_REQUEST,
      body,
      token,
    }).then((response) => {
      const { data, message, error } = response;
      setData(data);
      setMessage(message);
      setError(error);
      setLoadingAcceptRequest(false);
      dispatch(TeamActions.setAcceptedRequest(acceptedRequest + 1));
    });
  };

  const rejectMemberRequest = () => {
    setloadingRejectRequest(true);

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
      setloadingRejectRequest(false);
    });
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
            {!data?.memberRequestRejected && (
              <button
                onClick={acceptMemberRequest}
                className={[styles.actionButton, styles.acceptButton].join(" ")}
              >
                {loadingAcceptRequest ? (
                  <Spin indicator={antIcon} />
                ) : data?.memberRequestAccepted ? (
                  "Accepted"
                ) : (
                  "Accept"
                )}
              </button>
            )}
            {!data?.memberRequestAccepted && (
              <button
                onClick={rejectMemberRequest}
                className={[styles.actionButton, styles.rejectButton].join(" ")}
              >
                {loadingRejectRequest ? (
                  <Spin indicator={antIcon} />
                ) : data?.memberRequestRejected ? (
                  "Rejected"
                ) : (
                  "Reject"
                )}
              </button>
            )}
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
