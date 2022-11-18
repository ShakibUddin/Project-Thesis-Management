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
    <div>
      <div className="w-full mt-4">
        {Object.keys(meetups).length > 0 && (
          <Tabs
            defaultActiveKey={"1"}
            activeKey={activeKey}
            onChange={handleTabChange}
          >
            <Tabs.TabPane tab="Pending" key="1">
              <div className="w-full flex flex-wrap justify-start align-top">
                {meetups.pending.length > 0 ? (
                  meetups?.pending.map((meetup) => (
                    <MeetupCard
                      id={meetup.meetupId}
                      date={meetup.meetup_date}
                      time={meetup.meetup_time}
                      status={"PENDING"}
                      team={meetups.team}
                      handleTabChange={handleTabChange}
                      meetup_link={meetup.meetup_link}
                    />
                  ))
                ) : (
                  <>
                    <p className="text-center lg:text-2xl md:text-xl sm:text-lg mx-auto">
                      You don't have any pending meetups
                    </p>
                    <div className="w-full p-4 m-4">
                      <img
                        className="lg:w-3/5 md:w-4/5 sm:w-full mx-auto"
                        src={noPendingMeetups}
                        alt=""
                      />
                    </div>
                  </>
                )}
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Completed" key="2">
              <div className="w-full flex flex-wrap justify-start align-top">
                {meetups.complete.length > 0 ? (
                  meetups?.complete.map((meetup) => (
                    <MeetupCard
                      id={meetup.meetupId}
                      date={meetup.meetup_date}
                      time={meetup.meetup_time}
                      remarks={meetup.remarks}
                      status={"COMPLETE"}
                      attendance={JSON.parse(meetup?.attendance)}
                      meetup_link={meetup.meetup_link}
                    />
                  ))
                ) : (
                  <>
                    <p className="text-center lg:text-2xl md:text-xl sm:text-lg mx-auto">
                      You don't have any meetups yet
                    </p>
                    <div className="w-full p-4 m-4">
                      <img
                        className="lg:w-3/5 md:w-4/5 sm:w-full mx-auto"
                        src={noCompletedMeetups}
                        alt=""
                      />
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
