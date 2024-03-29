import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  Collapse,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
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
  const updateMeetup = useSelector((state) => state.meetup?.updateMeetup);

  const dispatch = useDispatch();
  const {
    id,
    date,
    time,
    meetup_link,
    status,
    attendance,
    team = [],
    remarks,
    getMeetupOfATeam,
    selectedTeamId,
    handleTabChange,
  } = props;
  const [isUpdateMeetupModalOpen, setIsUpdateMeetupModalOpen] = useState(false);

  useEffect(() => {
    if (updateMeetup) {
      dispatch(MeetupActions.setUpdateMeetup(false));
      getMeetupOfATeam(selectedTeamId);
      handleTabChange("2");
    }
  }, [updateMeetup]);

  const openUpdateMeetupForm = () => {
    if (currentUser.member_status_id === 3) showModal();
  };
  const studentIds = team.length > 0 && team.map((student) => student.nub_id);
  const convertTo12Hour = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };
  const onFinish = (values) => {
    setIsUpdateMeetupModalOpen(false);
    const body = {
      team_id: selectedTeamId,
      meetupId: id,
      remarks: values.remarks,
      attendance: JSON.stringify(values.attendance) || JSON.stringify([]),
    };
    dispatch(MeetupActions.updateMeetup({ body, token }));
  };
  const onFinishFailed = (errorInfo) => {
    //   message.error(errorInfo);
  };
  const showModal = () => {
    setIsUpdateMeetupModalOpen(true);
  };
  const handleCancel = () => {
    setIsUpdateMeetupModalOpen(false);
  };
  const onChange = (checkedValues) => {};
  return (
    <div
      onClick={() => {
        if (currentUser.member_status_id === 3 && status === Meetup.PENDING) {
          openUpdateMeetupForm();
        }
      }}
      className={`flex flex-col m-2 justify-betwee py-2 px-4 rounded-md shadow-lg w-50 ${
        currentUser.member_status_id === 3 &&
        status === Meetup.PENDING &&
        "cursor-pointer"
      } ${styles.meetupCard}`}
    >
      <p
        className={`text-center ${
          status === Meetup.PENDING ? "text-red-500" : "text-green-400"
        }`}
      >
        <b>{status}</b>
      </p>
      <p>
        <b>Type:</b> {meetup_link ? "Virtual" : "Onsite"}
      </p>
      <p>
        <b>Date:</b> {date.split("T")[0]}
      </p>
      <p>
        <b>Time:</b> {convertTo12Hour(time.split(".")[0].substr(0, 5))}
      </p>
      {meetup_link && (
        <Button
          type="primary"
          shape="round"
          size={"small"}
          onClick={(e) => {
            window.open(meetup_link, "_blank");
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <FontAwesomeIcon icon={faLink}></FontAwesomeIcon> Link
        </Button>
      )}
      {status === Meetup.COMPLETE && (
        <p>
          <b>Remarks:</b> {remarks}
        </p>
      )}
      {status === Meetup.COMPLETE && attendance.length > 0 ? (
        <p>
          <b>Present:</b>{" "}
          {attendance.map((id, index) => (
            <>
              <span>{id}</span>
              {index < attendance.length - 1 && <span>,</span>}
            </>
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
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
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
