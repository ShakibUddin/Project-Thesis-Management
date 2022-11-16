import React, { useEffect } from "react";
import { Button, Form, notification, Select, Spin, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as MeetupsActions from "../../State/Meetup/MeetupActions";
import MeetupCard from "../../Components/MeetupCard/MeetupCard";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import Loader from "../../Components/Loader/Loader";
import noPendingMeetups from "../../Assets/noPendingMeetups.webp";
import noCompletedMeetups from "../../Assets/noCompletedMeetups.jpg";

export default function StudentMeetups() {
  const token = useSelector((state) => state.auth?.user?.token);
  const currentUser = useSelector((state) => state.auth?.user);
  const meetups = useSelector((state) => state.meetup?.meetups);

  const [activeKey, setActiveKey] = React.useState("1");

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.member_status_id === 1) {
      const getMeetupsBody = {
        team_id: currentUser.team_id,
      };
      console.log("getMeetupsBody", getMeetupsBody);
      dispatch(
        MeetupsActions.getMeetups({
          body: getMeetupsBody,
          token,
        })
      );
    }
  }, [currentUser]);

  const handleTabChange = (key) => {
    console.log("change tab to ", key);
    setActiveKey(key);
  };

  return (
    <div className="h-screen">
      <div className="w-full">
        {Object.keys(meetups).length > 0 && (
          <Tabs
            defaultActiveKey={"1"}
            activeKey={activeKey}
            onChange={handleTabChange}
          >
            <Tabs.TabPane tab="Pending" key="1">
              <div className="w-full flex flex-wrap justify-start align-top">
                {Object.keys(meetups).length > 0 ? (
                  meetups?.pending.map((meetup) => (
                    <MeetupCard
                      id={meetup.meetupId}
                      date={meetup.meetup_date}
                      time={meetup.meetup_time}
                      status={"PENDING"}
                      team={meetups.team}
                      handleTabChange={handleTabChange}
                    />
                  ))
                ) : (
                  <>
                    <p className="text-center text-2xl">
                      You don't have any pending meetups
                    </p>
                    <div className="w-full p-4 m-4">
                      <img className="w-full" src={noPendingMeetups} alt="" />
                    </div>
                  </>
                )}
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Completed" key="2">
              <div className="w-full flex flex-wrap justify-start align-top">
                {Object.keys(meetups).length > 0 ? (
                  meetups?.complete.map((meetup) => (
                    <MeetupCard
                      id={meetup.meetupId}
                      date={meetup.meetup_date}
                      time={meetup.meetup_time}
                      remarks={meetup.remarks}
                      status={"COMPLETE"}
                      attendance={JSON.parse(meetup?.attendance)}
                    />
                  ))
                ) : (
                  <>
                    <p className="text-center text-2xl">
                      You don't have any completed meetups
                    </p>
                    <div className="w-full p-4 m-4">
                      <img className="w-full" src={noCompletedMeetups} alt="" />
                    </div>
                  </>
                )}
              </div>
            </Tabs.TabPane>
          </Tabs>
        )}
      </div>
    </div>
  );
}
