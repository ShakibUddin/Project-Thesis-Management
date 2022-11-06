import {
  Button,
  Checkbox,
  Collapse,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
} from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Meetup from "../../Constants/MeetupConstants";
import * as MeetupActions from "../../State/Meetup/MeetupActions";
import styles from "./MeetupCard.modle.css";

export default function MeetupCard(props) {
  const currentUser = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.user?.token);
  const dispatch = useDispatch();
  const { id, date, time, status, attendance, team = [] } = props;
  const [isUpdateMeetupModalOpen, setIsUpdateMeetupModalOpen] = useState(false);
  useEffect(() => {
    console.log(isUpdateMeetupModalOpen);
  }, [isUpdateMeetupModalOpen]);

  const openUpdateMeetupForm = () => {
    showModal();
  };
  const studentIds = team.length > 0 && team.map((student) => student.nub_id);

  const onFinish = (values) => {
    setIsUpdateMeetupModalOpen(false);
    console.log(values);
    console.log(values.attendance);
    const body = {
      team_id: 72,
      meetupId: id,
      remarks: values.remarks,
      attendance: values.attendance || [],
    };
    console.log("body", body);
    dispatch(MeetupActions.updateMeetup({ body, token }));
  };
  const onFinishFailed = (errorInfo) => {
    //   message.error(errorInfo);
  };
  const showModal = () => {
    setIsUpdateMeetupModalOpen(true);
  };
  const handleCancel = () => {
    console.log("cancel");
    setIsUpdateMeetupModalOpen(false);
    console.log("canceled");
  };
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  return (
    <div
      onClick={openUpdateMeetupForm}
      className={`flex flex-col m-2 justify-betwee py-2 px-4 rounded-md shadow-lg w-50 cursor-pointer ${styles.meetupCard}`}
    >
      <p
        className={`text-center ${
          status === Meetup.PENDING ? "text-red-500" : "text-green-400"
        }`}
      >
        <b>{status}</b>
      </p>
      <p>
        <b>Meetup Id:</b> {id}
      </p>
      <p>
        <b>Date:</b> {date}
      </p>
      <p>
        <b>TIme:</b> {time}
      </p>
      {status === Meetup.COMPLETE && attendance.length > 0 ? (
        <p>
          <b>Present:</b>{" "}
          {attendance.map((id) => (
            <span>{id},</span>
          ))}
        </p>
      ) : (
        status === Meetup.COMPLETE && (
          <p className="text-red-500">Whole team was absent</p>
        )
      )}
      <Modal
        title="Update Meetup"
        visible={isUpdateMeetupModalOpen}
        footer={null}
        onCancel={() => {
          setIsUpdateMeetupModalOpen(false);
        }}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label="Remarks"
            name="remarks"
            rules={[
              {
                required: true,
                message: "Please enter any remarks",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Attendance" name="attendance">
            <Checkbox.Group options={studentIds} onChange={onChange} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
