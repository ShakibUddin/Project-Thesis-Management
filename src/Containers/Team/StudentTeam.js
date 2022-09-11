import React, { useEffect } from "react";
import styles from "./StudentTeam.module.css";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as TeamActions from "../../State/Team/TeamActions";
import UserCard from "../../Components/UserCard/UserCard";

const { Search } = Input;

export default function StudentTeam() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.user);
  const students = useSelector((state) => state.team?.students);
  const token = useSelector((state) => state.auth?.user?.token);
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
  }, []);
  const sendRequest = (receiverId) => {
    const body = {
      sender_nub_id: currentUser.nub_id,
      receiver_nub_id: receiverId,
    };
    dispatch(
      TeamActions.sendRequest({
        body,
        token,
      })
    );
    console.log("sending request");
  };

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
            requestStatus={student.request_status}
            requestStatusId={student.request_status_id}
            sendRequest={() => {
              sendRequest(student.nub_id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
