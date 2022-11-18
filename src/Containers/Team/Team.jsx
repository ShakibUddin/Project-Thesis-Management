import React, { useEffect } from "react";
import styles from "./Team.module.css";
import { Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as TeamActions from "../../State/Team/TeamActions";
import UserCard from "../../Components/UserCard/UserCard";
import { Tabs } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Loader from "../../Components/Loader/Loader";
import StudentNotifications from "../Notifications/StudentNotifications";
import ProposalCard from "../../Components/ProposalCard/ProposalCard";
import * as NotificationsActions from "../../State/Notifications/NotificationsActions";
import noTeamMate from "../../Assets/noTeamMate.png";
import noRequests from "../../Assets/noRequests.webp";
import noMoreTeamMates from "../../Assets/noMoreTeamMates.webp";

import { useState } from "react";
const { Search } = Input;

const openNotification = (message) => {
  notification.open({
    message,
    placement: "bottomLeft",
    onClick: () => {},
  });
};

export default function Team() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.user);
  const totalTeamMembers = useSelector(
    (state) => state.auth?.user?.total_members
  );
  const students = useSelector((state) => state.team?.students);
  const supervisorTeamDetails = useSelector(
    (state) => state.team?.supervisorTeamDetails
  );
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
  const supervisorTeamDetailsLoading = useSelector(
    (state) => state.team?.supervisorTeamDetailsLoading
  );
  const memberRequestNotifications = useSelector(
    (state) => state.notifications?.memberRequestNotifications
  );

  const memberRequestNotificationsLoading = useSelector(
    (state) => state.notifications?.memberRequestNotificationsLoading
  );

  const token = useSelector((state) => state.auth?.user?.token);
  const getTeamDetailsForCurrentMember = () => {
    if (currentUser.member_status_id === 1) {
      const body = {
        nub_id: currentUser?.nub_id,
      };
      dispatch(
        TeamActions.getTeamDetails({
          body,
          token,
        })
      );
    } else if (currentUser.member_status_id === 3) {
      const body = {
        supervisor_nub_id: currentUser?.nub_id,
      };
      dispatch(
        TeamActions.getSupervisorTeamDetails({
          body,
          token,
        })
      );
    }
  };
  const getAllStudents = () => {
    const body = {
      nub_id: currentUser.nub_id,
    };
    dispatch(TeamActions.getAllStudents({ body, token }));
  };

  const getAllMemberRequests = () => {
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

  useEffect(() => {
    getTeamDetailsForCurrentMember();
  }, []);
  useEffect(() => {
    if (memberRequestError || memberRequestSent === false) {
      openNotification(memberRequestError);
    }
  }, [memberRequestError, memberRequestSent]);
  return (
    <div className={styles.container}>
      <div>
        <Tabs
          defaultActiveKey="1"
          onChange={(key) => {
            // setSelectedKey(key);
            console.log("key", key);
            if (key === "1" || key === "4" || key === "5") {
              getTeamDetailsForCurrentMember();
            } else if (key === "2" && totalTeamMembers < 3) {
              getAllStudents();
            } else if (key === "3" && totalTeamMembers < 3) {
              getAllMemberRequests();
            }
          }}
        >
          {/* for students */}
          {currentUser.member_status_id === 1 && (
            <Tabs.TabPane tab="My Team" key="1">
              {currentUser.member_status_id === 1 &&
              totalTeamMembers > 1 &&
              teamDetails.length ? (
                <div className={styles.studentContainer}>
                  {teamDetails.map((teammate) => {
                    return (
                      <UserCard
                        name={teammate.name}
                        id={teammate.nub_id}
                        department={teammate.department_name}
                        program={teammate.program_name}
                        avatar={teammate.avatar}
                        leader={teammate.team_leader}
                        showDeleteOption={currentUser.team_leader === 1}
                        memberStatusId={teammate.member_status_id}
                      />
                    );
                  })}
                </div>
              ) : (
                <div>
                  {teamDetailsLoading
                    ? currentUser.member_status_id === 1 && (
                        <Loader size="large" />
                      )
                    : currentUser.member_status_id === 1 && (
                        <>
                          <p className="text-center lg:text-2xl md:text-xl sm:text-lg">
                            You don't have any team mates yet!
                          </p>
                          <div className="w-full p-4 m-4">
                            <img
                              className="lg:w-3/5 md:w-4/5 sm:w-full mx-auto"
                              src={noTeamMate}
                              alt=""
                            />
                          </div>
                        </>
                      )}
                </div>
              )}
            </Tabs.TabPane>
          )}
          {currentUser.member_status_id === 1 && (
            <Tabs.TabPane tab="Get Teammates" key="2">
              {totalTeamMembers < 3 ? (
                <div className={styles.container}>
                  {/* <div>
                  <Search
                    placeholder="Search team member"
                    enterButton="Search"
                    size="large"
                    onSearch={(value) => console.log(value)}
                  />
                </div> */}
                  <div className={styles.studentContainer}>
                    {students
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((student) => (
                        <UserCard
                          name={student.name}
                          id={student.nub_id}
                          department={student.department_name}
                          program={student.program_name}
                          requestStatus={student.request_status}
                          requestStatusId={student.request_status_id}
                          avatar={student.avatar}
                          leader={student.team_leader}
                          memberStatusId={student.member_status_id}
                          showRequestActions
                        />
                      ))}
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-center lg:text-2xl md:text-xl sm:text-lg">
                    You can not have anymore team mates
                  </p>
                  <div className="w-full p-4 m-4 h-64">
                    <img
                      className="lg:w-3/5 md:w-4/5 sm:w-full mx-auto"
                      src={noMoreTeamMates}
                      alt=""
                    />
                  </div>
                </>
              )}
            </Tabs.TabPane>
          )}
          {currentUser.member_status_id === 1 && (
            <Tabs.TabPane
              tab={
                <span>
                  My Requests
                  {memberRequestNotifications?.length > 0 && (
                    <span className="text-white px-2 ml-2 text-lg bg-red-500 rounded-full">
                      {memberRequestNotificationsLoading
                        ? 0
                        : memberRequestNotifications?.length}
                    </span>
                  )}
                </span>
              }
              key="3"
            >
              <StudentNotifications />
            </Tabs.TabPane>
          )}
          {/* for supervisor */}
          {currentUser.member_status_id === 3 && (
            <Tabs.TabPane tab="Ongoing" key="4">
              {currentUser.member_status_id === 3 &&
              supervisorTeamDetails?.ongoing?.length > 0 ? (
                supervisorTeamDetails.ongoing.map((item) => {
                  if (item.project.project_status_id === 2) {
                    return (
                      <ProposalCard
                        projectDetails={item.project}
                        teamDetails={item.team}
                      />
                    );
                  }
                })
              ) : (
                <div>
                  {supervisorTeamDetailsLoading
                    ? currentUser.member_status_id === 3 && (
                        <Loader size="large" />
                      )
                    : currentUser.member_status_id === 3 && (
                        <>
                          <p className="text-center lg:text-2xl md:text-xl sm:text-lg">
                            You don't have any teams!
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
              )}
            </Tabs.TabPane>
          )}
          {currentUser.member_status_id === 3 && (
            <Tabs.TabPane tab="Complete" key="5">
              {currentUser.member_status_id === 3 &&
              supervisorTeamDetails?.complete?.length > 0 ? (
                supervisorTeamDetails.complete.map((item) => {
                  if (item.project.project_status_id === 3) {
                    return (
                      <ProposalCard
                        projectDetails={item.project}
                        teamDetails={item.team}
                      />
                    );
                  }
                })
              ) : (
                <div>
                  {supervisorTeamDetailsLoading
                    ? currentUser.member_status_id === 3 && (
                        <Loader size="large" />
                      )
                    : currentUser.member_status_id === 3 && (
                        <>
                          <p className="text-center lg:text-2xl md:text-xl sm:text-lg">
                            None of your teams have completed their project or
                            thesis
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
              )}
            </Tabs.TabPane>
          )}
        </Tabs>
      </div>
    </div>
  );
}
