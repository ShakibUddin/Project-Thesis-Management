import React, { useEffect } from "react";
import { Button, Form, Select, Spin, Tabs } from "antd";
import CreateMeetup from "./CreateMeetup/CreateMeetup";
import { useDispatch, useSelector } from "react-redux";
import * as MeetupsActions from "../../State/Meetup/MeetupActions";
import MeetupCard from "../../Components/MeetupCard/MeetupCard";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import Loader from "../../Components/Loader/Loader";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function Meetups() {
  const token = useSelector((state) => state.auth?.user?.token);
  const currentUser = useSelector((state) => state.auth?.user);
  const meetups = useSelector((state) => state.meetup?.meetups);
  const teamsUnderSupervisorLoading = useSelector(
    (state) => state.meetup?.teamsUnderSupervisorLoading
  );
  const teamsUnderSupervisor = useSelector(
    (state) => state.meetup.teamsUnderSupervisor
  );
  const [teamOptions, setTeamOptions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const body = {
      supervisor_nub_id: currentUser.nub_id,
    };
    dispatch(
      MeetupsActions.getTeamsUnderSupervisor({
        body,
        token,
      })
    );
  }, []);
  const getMeetupOfATeam = (teamId) => {
    const body = {
      team_id: teamId,
    };
    console.log(body);
    dispatch(
      MeetupsActions.getMeetups({
        body,
        token,
      })
    );
  };
  useEffect(() => {
    if (currentUser.member_status_id === 1) {
      const getMeetupsBody = {
        team_id: currentUser.team_id,
      };
      dispatch(
        MeetupsActions.getMeetups({
          getMeetupsBody,
          token,
        })
      );
    }
  }, [currentUser]);

  useEffect(() => {
    if (teamsUnderSupervisor?.length > 0) {
      setTeamOptions(
        teamsUnderSupervisor.map((item) => ({
          value: item.project.teamId,
          label: (
            <div className="bg-indigo-300 shadow-lg px-2 pb-2">
              <p className="m-0 font-bold">Project: {item.project.title}</p>
              <p className="m-0 font-bold">
                Total Meetup: {item.project.total_meetup}
              </p>
              <p className="m-0 font-bold">Team Members:</p>
              <p className="m-0">
                {item.team[0].name}
                {item.team[0].team_leader ? "(Team Leader)" : ""}
              </p>
              <p className="m-0">
                {item.team[1].name}
                {item.team[1].team_leader ? "(Team Leader)" : ""}
              </p>
              <p className="m-0">
                {item.team[2].name}
                {item.team[2].team_leader ? "(Team Leader)" : ""}
              </p>
            </div>
          ),
        }))
      );
    }
  }, [teamsUnderSupervisor]);
  const onTeamSelectionFinish = (values) => {
    getMeetupOfATeam(values.teamId);
  };
  const onChangeTeam = (value) => {};
  const onTeamSelectionFinishFailed = (errorInfo) => {
    //   message.error(errorInfo);
  };
  const onSearch = (value) => {};

  return (
    <div className="h-screen">
      {teamsUnderSupervisor.length > 0 ? (
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onTeamSelectionFinish}
          onFinishFailed={onTeamSelectionFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="teamId"
            label="Team"
            rules={[
              {
                required: true,
                message: "Please select a team",
              },
            ]}
          >
            <Select
              size={"large"}
              showSearch
              placeholder="Select a team"
              optionFilterProp="children"
              loading={teamsUnderSupervisorLoading}
              onChange={onChangeTeam}
              onSearch={onSearch}
              listHeight={300}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={teamOptions}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      ) : teamsUnderSupervisorLoading ? (
        <Loader />
      ) : (
        <p>You are not assigned any teams yet</p>
      )}
      {Object.keys(meetups).length > 0 && (
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Pending" key="1">
            <div className="w-full flex flex-wrap justify-start align-top">
              {Object.keys(meetups).length > 0 &&
                meetups?.pending.map((meetup) => (
                  <MeetupCard
                    id={meetup.meetupId}
                    date={meetup.meetup_date}
                    time={meetup.meetup_time}
                    status={"PENDING"}
                    team={meetups.team}
                  />
                ))}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Completed" key="2">
            <div className="w-full flex flex-wrap justify-start align-top">
              {Object.keys(meetups).length > 0 &&
                meetups?.complete.map((meetup) => (
                  <MeetupCard
                    id={meetup.meetupId}
                    date={meetup.meetup_date}
                    time={meetup.meetup_time}
                    status={"COMPLETE"}
                    attendance={JSON.parse(meetup?.attendance)}
                  />
                ))}
            </div>
          </Tabs.TabPane>
          {currentUser.member_status_id === 3 && (
            <Tabs.TabPane tab="Create" key="3">
              <CreateMeetup />
            </Tabs.TabPane>
          )}
        </Tabs>
      )}
    </div>
  );
}
