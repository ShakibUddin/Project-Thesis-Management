import React, { useEffect } from "react";
import styles from "./Team.module.css";
import { Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as TeamActions from "../../State/Team/TeamActions";
import UserCard from "../../Components/UserCard/UserCard";
import { Tabs } from "antd";
import Loader from "../../Components/Loader/Loader";
import StudentNotifications from "../Notifications/StudentNotifications";
import ProposalCard from "../../Components/ProposalCard/ProposalCard";
import * as NotificationsActions from "../../State/Notifications/NotificationsActions";
import noTeamMate from "../../Assets/noTeamMate.png";
import noRequests from "../../Assets/noRequests.webp";
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
  const totalTeamMmbers = useSelector(
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
            if (key === "1" && totalTeamMmbers > 1) {
              getTeamDetailsForCurrentMember();
            } else if (key === "2" && totalTeamMmbers < 3) {
              getAllStudents();
            } else if (key === "3" && totalTeamMmbers < 3) {
              getAllMemberRequests();
            }
          }}
        >
          <Tabs.TabPane tab="My Team" key="1">
            {currentUser.member_status_id === 1 &&
            totalTeamMmbers > 1 &&
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
                        <p className="text-center text-2xl">
                          You don't have any team mates yet!
                        </p>
                        <div className="w-full p-4 m-4">
                          <img className="w-full" src={noTeamMate} alt="" />
                        </div>
                      </>
                    )}
              </div>
            )}
            {currentUser.member_status_id === 3 &&
            supervisorTeamDetails.length > 0 ? (
              supervisorTeamDetails.map((proposal) => (
                <ProposalCard
                  projectDetails={proposal.project}
                  teamDetails={proposal.team}
                />
              ))
            ) : (
              <div>
                {supervisorTeamDetailsLoading
                  ? currentUser.member_status_id === 3 && (
                      <Loader size="large" />
                    )
                  : currentUser.member_status_id === 3 && (
                      <>
                        <p className="text-center text-2xl">
                          You don't have any team mates yet!
                        </p>
                        <div className="w-full p-4 m-4">
                          <img className="w-full" src={noRequests} alt="" />
                        </div>
                      </>
                    )}
              </div>
            )}
          </Tabs.TabPane>
          {currentUser.member_status_id === 1 && (
            <Tabs.TabPane tab="Get Teammates" key="2">
              {totalTeamMmbers < 3 ? (
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
                    {students.map((student) => (
                      <UserCard
                        name={student.name}
                        id={student.nub_id}
                        department={student.department_name}
                        program={student.program_name}
                        requestStatus={student.request_status}
                        requestStatusId={student.request_status_id}
                        avatar={student.avatar}
                        leader={student.team_leader}
                        showRequestActions
                      />
                    ))}
                  </div>
                </div>
              ) : (
                "You can not have anymore team mates"
              )}
            </Tabs.TabPane>
          )}
          {currentUser.member_status_id === 1 && (
            <Tabs.TabPane tab="My Requests" key="3">
              <StudentNotifications />
            </Tabs.TabPane>
          )}
        </Tabs>
      </div>
    </div>
  );
}
