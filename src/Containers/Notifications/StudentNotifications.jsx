import React, { useEffect } from "react";
import styles from "./StudentNotifications.module.css";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as NotificationsActions from "../../State/Notifications/NotificationsActions";
import UserCard from "../../Components/UserCard/UserCard";

const { Search } = Input;

export default function StudentNotifications() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.user);
  const memberRequestNotifications = useSelector(
    (state) => state.notifications?.memberRequestNotifications
  );
  const token = useSelector((state) => state.auth?.user?.token);
  useEffect(() => {
    const body = {
      receiver_nub_id: currentUser?.nub_id,
    };
    dispatch(
      NotificationsActions.getAllMemberRequestNotifications({
        body,
        token,
      })
    );
  }, []);

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
        {memberRequestNotifications.map((notification) => (
          <UserCard
            name={notification.name}
            id={notification.nub_id}
            department={notification.department_name}
            program={notification.program_name}
          />
        ))}
      </div>
    </div>
  );
}
