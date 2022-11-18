import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
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
  const [selectedMeetupType, setSelectedMeetupType] = useState("Onsite");
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
      meetup_link: values.meetup_link,
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
          layout="vertical"
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
            name="meetupType"
            label="Radio.Group"
            onChange={(e) => {
              console.log("radio checked", e.target.value);
              setSelectedMeetupType(e.target.value);
            }}
          >
            <Radio.Group layout="vertical" defaultValue={"Onsite"}>
              <div className="flex">
                <div className="mr-10">
                  <Radio value="Onsite">Onsite</Radio>
                </div>
                <div className="mr-10">
                  <Radio value="Virtual">Virtual</Radio>
                </div>
              </div>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Link"
            name="meetup_link"
            hidden={selectedMeetupType === "Onsite"}
            rules={[
              {
                required: selectedMeetupType === "Virtual",
                message: "Please enter meetup link for virtual meetups!",
              },
            ]}
          >
            <Input placeholder="https://meet.google.com....." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
