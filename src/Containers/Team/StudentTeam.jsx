import React, { useEffect } from "react";
import styles from "./StudentTeam.module.css";
import { Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as TeamActions from "../../State/Team/TeamActions";
import UserCard from "../../Components/UserCard/UserCard";
import { Tabs, Space, Spin } from "antd";

const { Search } = Input;

const openNotification = (message) => {
  notification.open({
    message,
    placement: "bottomLeft",
    onClick: () => {},
  });
};

export default function StudentTeam() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.user);
  const students = useSelector((state) => state.team?.students);
  const memberRequestSent = useSelector(
    (state) => state.team?.memberRequestSent
  );
  const memberRequestError = useSelector(
    (state) => state.team?.memberRequestError
  );
  const teamDetails = useSelector((state) => state.team?.teamDetails);
  const teamDetailsLoading = useSelector(
    (state) => state.team?.teamDetailsLoading
  );
  const token = useSelector((state) => state.auth?.user?.token);
  const body = {
    nub_id: currentUser?.nub_id,
  };
  useEffect(() => {
    dispatch(
      TeamActions.getTeamDetails({
        body,
        token,
      })
    );
  }, []);

  useEffect(() => {
    if (memberRequestError || memberRequestSent === false) {
      openNotification(memberRequestError);
    }
  }, [memberRequestError, memberRequestSent]);
  return (
    <div className={styles.container}>
      <Tabs
        defaultActiveKey="1"
        onChange={(key) => {
          if (key === "2" && teamDetails.length < 3) {
            dispatch(
              TeamActions.getAllStudents({
                body,
                token,
              })
            );
          }
        }}
      >
        <Tabs.TabPane tab="My Team" key="1">
          {teamDetails.length > 0 ? (
            <div className={styles.studentContainer}>
              {teamDetails.map((teammate) => (
                <UserCard
                  name={teammate.name}
                  id={teammate.nub_id}
                  department={teammate.department_name}
                  program={teammate.program_name}
                />
              ))}
            </div>
          ) : (
            <div>
              {teamDetailsLoading ? (
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              ) : (
                <p>You don't have any team mates yet!</p>
              )}
            </div>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Get Teammates" key="2">
          {teamDetails.length < 3 && (
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
                    showRequestActions
                  />
                ))}
              </div>
            </div>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
