import React, { useEffect } from "react";
import { Tabs } from "antd";
import CreateMeetup from "./CreateMeetup/CreateMeetup";
import { useDispatch, useSelector } from "react-redux";
import * as MeetupsActions from "../../State/Meetup/MeetupActions";
import UpdateMeetup from "./UpdateMeetup/UpdateMeetup";
import MeetupCard from "../../Components/MeetupCard/MeetupCard";

export default function Meetups() {
  const token = useSelector((state) => state.auth?.user?.token);
  const currentUser = useSelector((state) => state.auth?.user);
  const meetups = useSelector((state) => state.meetup?.meetups);
  const dispatch = useDispatch();
  useEffect(() => {
    const body = {
      supervisor_nub_id: currentUser.nub_id, //TODO:check body here, need to update according to user
    };
    dispatch(
      MeetupsActions.getTeamsUnderSupervisor({
        body,
        token,
      })
    );
    dispatch(
      MeetupsActions.getMeetups({
        body,
        token,
      })
    );
  }, []);
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Pending" key="1">
          {meetups.pending.map(
            (
              meetup //TODO: check these params, check response from api
            ) => (
              <MeetupCard
                id={meetup.id}
                date={meetup.date}
                time={meetup.time}
                status={"PENDING"}
                team={meetup?.team}
              />
            )
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Completed" key="2">
          {meetups.pending.map((meetup) => (
            <MeetupCard
              id={meetup.id}
              date={meetup.date}
              time={meetup.time}
              status={"PENDING"}
              team={meetup?.team}
            />
          ))}
        </Tabs.TabPane>
        {currentUser.member_status_id === 3 && (
          <Tabs.TabPane tab="Create" key="3">
            <CreateMeetup />
          </Tabs.TabPane>
        )}
      </Tabs>
    </div>
  );
}
