import { Button, Form, message, Upload } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MeetupCard from "../../Components/MeetupCard/MeetupCard";
import UserCard from "../../Components/UserCard/UserCard";
import { BASE_URL, PATHS } from "../../Constants/ApiConstants.js";
import "./Home.module.css";
import {
  UploadOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import DataCard from "../../Components/DataCard/DataCard";
import {
  faHandshake,
  faUserGroup,
  faHandshakeSimple,
  faUser,
  faClipboardUser,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import { useState } from "react";
import BarChartCard from "../../Components/BarChartCard/BarChartCard";
import { data } from "autoprefixer";
import * as NotificationsActions from "../../State/Notifications/NotificationsActions.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.user?.token);
  const upcomingMeetups = useSelector(
    (state) => state.auth?.user?.upcoming_meetup_date
  );

  useEffect(() => {
    if (user.member_status_id === 1) {
      const body = {
        receiver_nub_id: user?.nub_id,
      };
      dispatch(
        NotificationsActions.getAllMemberRequestNotifications({
          body,
          token,
        })
      );
    }
  }, [user]);
  return (
    <div className="flex w-full">
      <div className="w-full">
        {(user?.member_status_id === 1 || user?.member_status_id === 3) && (
          <div className="w-full flex flex-wrap mb-10">
            <DataCard
              title={"Total Meetups"}
              icon={faHandshakeSimple}
              value={user?.total_meetup}
            />
            <DataCard
              title={"Upcoming Meetups"}
              icon={faHandshake}
              value={user?.upcoming_meetup === null ? 0 : user?.upcoming_meetup}
            />
            <DataCard
              title={"Complete Meetups"}
              icon={faHandshake}
              value={user?.complete_meetup === null ? 0 : user?.complete_meetup}
            />
            {user?.member_status_id === 1 && (
              <DataCard
                title={"Attendance"}
                icon={faClipboardUser}
                value={`${user?.percentage}%`}
              />
            )}
          </div>
        )}
        {(user?.member_status_id === 4 || user?.member_status_id === 5) && (
          <div className="w-full flex flex-wrap mb-10">
            <DataCard
              title={"Total Students"}
              icon={faUserGroup}
              value={user?.total_students}
            />
            <DataCard
              title={"Total Supervisors"}
              icon={faUser}
              value={user?.total_supervisors}
            />
            <DataCard
              title={"Total Teams"}
              icon={faPeopleGroup}
              value={user?.total_teams}
            />
          </div>
        )}
        {user?.member_status_id === 3 && upcomingMeetups.length > 0 && (
          <div>
            <p className="text-center font-bold text-2xl m-0">Meetups</p>

            <BarChartCard options={options} data={upcomingMeetups} />
          </div>
        )}
      </div>
    </div>
  );
}
