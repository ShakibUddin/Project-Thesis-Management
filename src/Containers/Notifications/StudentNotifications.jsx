import React, { useEffect } from "react";
import styles from "./StudentNotifications.module.css";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../../Components/UserCard/UserCard";
import noRequests from "../../Assets/noRequests.webp";
import * as NotificationsActions from "../../State/Notifications/NotificationsActions.js";
import Loader from "../../Components/Loader/Loader";
const { Search } = Input;

export default function StudentNotifications() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.user);
  const memberRequestNotifications = useSelector(
    (state) => state.notifications?.memberRequestNotifications
  );
  const memberRequestNotificationsLoading = useSelector(
    (state) => state.notifications?.memberRequestNotificationsLoading
  );
  const token = useSelector((state) => state.auth?.user?.token);

  const getAllMemberNotifications = () => {
    const body = {
      receiver_nub_id: currentUser?.nub_id,
    };
    dispatch(
      NotificationsActions.getAllMemberRequestNotifications({
        body,
        token,
      })
    );
  };
  return (
    <div className={styles.container}>
      <div className="w-full">
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
                getAllMemberNotifications={getAllMemberNotifications}
              />
            ))
          ) : memberRequestNotificationsLoading ? (
            <Loader />
          ) : (
            <>
              <p className="text-center lg:text-2xl md:text-xl sm:text-lg mr-auto ml-auto">
                You don't have any member requests at this moment!
              </p>
              <div className="w-full p-4 m-4">
                <img
                  className="lg:w-3/5 md:w-4/5 sm:w-full mx-auto"
                  src={noRequests}
                  alt=""
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
