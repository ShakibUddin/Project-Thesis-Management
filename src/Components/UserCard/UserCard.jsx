import React, { useEffect, useState } from "react";
import styles from "./UserCard.module.css";
import defaultAvatar from "../../Assets/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import * as TeamActions from "../../State/Team/TeamActions";
import { makeApiCall } from "../../client";
import { METHODS, PATHS } from "../../Constants/ApiConstants";
import * as NotificationsActions from "../../State/Notifications/NotificationsActions";
import Loader from "../Loader/Loader";
import * as AuthActions from "../../State/Auth/AuthActions.js";
import { AVATAR_BASE } from "../../Constants/ImageConstants.js";
import { Button, notification, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdBadge,
  faBuilding,
  faShieldHalved,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import CardRow from "./CardRow/CardRow";

export default function UserCard({
  name,
  id,
  department,
  program,
  leader = null,
  avatar = null,
  requestStatus = null,
  requestStatusId = null,
  requestSent = false,
  showingNotification = false,
  showRequestActions = false,
  memberRequestId = null,
  showDeleteOption = false,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.user?.token);
  const currentUser = useSelector((state) => state.auth?.user);
  const [loading, setLoading] = useState(false);
  const [loadingAcceptRequest, setLoadingAcceptRequest] = useState(false);
  const [loadingRejectRequest, setLoadingRejectRequest] = useState(false);
  const [loadingRemoveTeammate, setLoadingRemoveTeammate] = useState(false);
  const [data, setData] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [accepted, setAccepted] = useState(0);

  const disableButton =
    requestStatusId === 1 || data?.requestSent || data?.memberDeleted;
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
      if (!data.memberRequestAccepted) {
        notification.open({
          message,
          placement: "bottomLeft",
          onClick: () => {},
        });
      }
      setData(data);
      setMessage(message);
      setError(error);
      setLoadingAcceptRequest(false);
      dispatch(TeamActions.setAcceptedRequest(acceptedRequest + 1));
    });
  };

  const rejectMemberRequest = () => {
    setLoadingRejectRequest(true);

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
      if (!data.memberRequestRejected) {
        notification.open({
          message,
          placement: "bottomLeft",
          onClick: () => {},
        });
      }
      setData(data);
      setMessage(message);
      setError(error);
      setLoadingRejectRequest(false);
    });
  };
  const removeTeammate = () => {
    setLoadingRemoveTeammate(true);

    const body = {
      team_leader_id: currentUser.nub_id,
      team_member_id: id,
    };
    makeApiCall({
      method: METHODS.DELETE,
      path: PATHS.REMOVE_TEAM_MATE,
      body,
      token,
    }).then((response) => {
      const { data, message, error } = response;
      console.log("error", error);
      if (data.memberDeleted) {
        dispatch(AuthActions.decreaseTotalTeamMembers());
      } else {
        notification.open({
          message,
          placement: "bottomLeft",
          onClick: () => {},
        });
      }
      setData(data);
      setMessage(message);
      setError(error);
      setLoadingRemoveTeammate(false);
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
        <div className={styles.topDiv}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={avatar ? `${AVATAR_BASE}${avatar}` : defaultAvatar}
              alt=""
            />
            {leader === 1 && (
              <span className={styles.leaderTitle}>Team Leader</span>
            )}
            <p className="text-lg font-bold text-center text-white">{name}</p>
          </div>
        </div>
        <div className={styles.bottomDiv}>
          <CardRow icon={faIdBadge} title={"NUB Id"} details={id} />
          <CardRow
            icon={faBuilding}
            title={"Department"}
            details={department}
          />
          <CardRow icon={faGear} title={"Program"} details={program} />
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
                  <Loader />
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
                  <Loader />
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
            {loading ? <Loader /> : disableButton ? "Pending" : requestStatus}
          </button>
        )}
        {showDeleteOption && id !== currentUser.nub_id && (
          <button
            disabled={disableButton}
            onClick={removeTeammate}
            className={[
              styles.actionButton,
              disableButton ? styles.disabled : styles.active,
            ].join(" ")}
          >
            {loadingRemoveTeammate ? (
              <Loader />
            ) : disableButton ? (
              "Removed"
            ) : (
              "Remove"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
