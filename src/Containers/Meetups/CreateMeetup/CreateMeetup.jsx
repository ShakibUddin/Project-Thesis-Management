import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as MeetupsActions from "../../../State/Meetup/MeetupActions.js";
export default function CreateMeetup() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.user?.token);
  const currentUser = useSelector((state) => state.auth?.user);

  const [teamOptions, setTeamOptions] = useState([]);
  const teamsUnderSupervisor = useSelector(
    (state) => state.meetup.teamsUnderSupervisor
  );
  const teamsUnderSupervisorLoading = useSelector(
    (state) => state.meetup.teamsUnderSupervisorLoading
  );
  const onFinish = (values) => {
    console.log("meetup values:", values);
    const body = {
      team_id: values.team,
      supervisor_nub_id: currentUser.nub_id,
      meetup_date: values.meetupDate,
      meetup_time: values.meetupTime,
    };
    dispatch(
      MeetupsActions.getTeamsUnderSupervisor({
        body,
        token,
      })
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (value) => {};
  const onSearch = (value) => {};
  useEffect(() => {
    if (teamsUnderSupervisor?.length > 0) {
      setTeamOptions(
        teamsUnderSupervisor.map((team) => ({
          value: team.teamId, //TODO: check if its teamId or team_id or even if it exists in team
          label: `${team[0].name}, ${team[1].name}, ${team[2].name}`,
        }))
      );
    }
  }, [teamsUnderSupervisor]);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-auto ">
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="team"
            label="Select Team"
            rules={[
              {
                required: true,
                message: "Please select a team",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a team"
              optionFilterProp="children"
              loading={teamsUnderSupervisorLoading}
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={teamOptions}
            />
          </Form.Item>
          <Form.Item
            name="meetupDate"
            label="Select Date"
            rules={[
              {
                type: "object",
                required: true,
                message: "Please select date!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="meetupTime"
            label="Select time"
            rules={[
              {
                type: "object",
                required: true,
                message: "Please select time!",
              },
            ]}
          >
            <TimePicker use12Hours format="h:mm a" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
