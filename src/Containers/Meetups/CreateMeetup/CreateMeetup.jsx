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
import moment from "moment";
export default function CreateMeetup({ selectedTeamId, handleTabChange }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.user?.token);
  const currentUser = useSelector((state) => state.auth?.user);
  const createMeetup = useSelector((state) => state.meetup?.createMeetup);
  const convertTo24Hour = (time) => {
    var hours = parseInt(time.substr(0, 2));
    if (time.indexOf("AM") != -1 && hours == 12) {
      time = time.replace("12", "0");
    }
    if (time.indexOf("PM") != -1 && hours < 12) {
      time = time.replace(hours, hours + 12);
    }
    return time.replace(/(AM|PM)/, "");
  };
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      meetupDate: fieldsValue["meetupDate"].format("YYYY-MM-DD"),

      meetupTime: fieldsValue["meetupTime"].format("HH:mm:ss"),
    };
    const body = {
      team_id: selectedTeamId,
      supervisor_nub_id: currentUser.nub_id,
      meetup_date: values.meetupDate,
      meetup_time: convertTo24Hour(values.meetupTime),
    };
    dispatch(
      MeetupsActions.createMeetup({
        body,
        token,
      })
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (createMeetup) {
      handleTabChange("1");
    }
  }, [createMeetup]);
  return (
    <div className="w-full">
      <div className="w-full h-auto ">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
            <DatePicker
              disabledDate={(current) => {
                return moment().add(0, "days") >= current;
              }}
            />
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
            <TimePicker use12Hours format="h:mm A" />
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
