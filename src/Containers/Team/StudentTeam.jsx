import React, { useEffect } from "react";
import styles from "./StudentTeam.module.css";
import { Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as TeamActions from "../../State/Team/TeamActions";
import UserCard from "../../Components/UserCard/UserCard";
import { useState } from "react";

const { Search } = Input;

const openNotification = (message) => {
  notification.open({
    message,
    placement: "bottomLeft",
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

export default function StudentTeam() {
  const dispatch = useDispatch();
  const [receiverNubId, setReceiverNubId] = useState();
  const [requestSentIds, setRequestSentIds] = useState([]);
  const currentUser = useSelector((state) => state.auth?.user);
  const students = useSelector((state) => state.team?.students);
  const memberRequestSent = useSelector(
    (state) => state.team?.memberRequestSent
  );
  const memberRequestError = useSelector(
    (state) => state.team?.memberRequestError
  );
  const memberRequestLoading = useSelector(
    (state) => state.team?.memberRequestLoading
  );
  const token = useSelector((state) => state.auth?.user?.token);
  const totalTeamMembers = useSelector(
    (state) => state.auth?.user?.total_members
  );
  useEffect(() => {
    const body = {
      nub_id: currentUser?.nub_id,
    };
    dispatch(
      TeamActions.getAllStudents({
        body,
        token,
      })
    );
    dispatch(
      TeamActions.getTeamDetails({
        body,
        token,
      })
    );
  }, []);
  const sendMemberRequest = (receiverId) => {
    const body = {
      sender_nub_id: currentUser.nub_id,
      receiver_nub_id: receiverId,
    };
    dispatch(
      TeamActions.sendMemberRequest({
        body,
        token,
      })
    );
    setReceiverNubId(receiverId);
  };

  useEffect(() => {
    if (memberRequestError || memberRequestSent === false) {
      openNotification(memberRequestError);
    }
  }, [memberRequestError, memberRequestSent]);
  return (
    <div className={styles.container}>
      <div>
        <Search
          placeholder="Search team member"
          enterButton="Search"
          size="large"
          onSearch={(value) => console.log(value)}
        />
      </div>
      <div className={styles.studentContainer}>
        {students.map((student) => (
          <UserCard
            name={student.name}
            id={student.nub_id}
            department={student.department_name}
            program={student.program_name}
            requestStatus={student.request_status}
            requestStatusId={student.request_status_id}
            receiverNubId={receiverNubId}
            sendMemberRequest={() => {
              sendMemberRequest(student.nub_id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
