import React, { useEffect } from "react";
import styles from "./StudentNotifications.module.css";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../../Components/UserCard/UserCard";
import noRequests from "../../Assets/noRequests.webp";

const { Search } = Input;

export default function StudentNotifications() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.user);
  const memberRequestNotifications = useSelector(
    (state) => state.notifications?.memberRequestNotifications
  );
  const token = useSelector((state) => state.auth?.user?.token);

  return (
    <div className={styles.container}>
      <div>
        {/* <div>
        <Search
          placeholder="Search team member"
          enterButton="Search"
          size="large"
          onSearch={(value) => console.log(value)}
        />
      </div> */}
        <div className={styles.studentContainer}>
          {memberRequestNotifications.length > 0 ? (
            memberRequestNotifications.map((notification) => (
              <UserCard
                name={notification.name}
                id={notification.nub_id}
                department={notification.department_name}
                program={notification.program_name}
                showingNotification={true}
                memberRequestId={notification.id}
                avatar={notification.avatar}
              />
            ))
          ) : (
            <>
              <p className="text-center text-2xl mr-auto ml-auto">
                You don't have any member requests at this moment!
              </p>
              <div className="w-full p-4 m-4">
                <img className="w-full" src={noRequests} alt="" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
