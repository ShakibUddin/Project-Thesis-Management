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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const meetupsData = {
  labels,
  datasets: [
    {
      label: "Pending Meetups",
      data: [10, 20, 10, 15, 16, 20, 30],
      backgroundColor: "rgb(255, 68, 51)",
    },
  ],
};

export default function Home() {
  const user = useSelector((state) => state.auth?.user);
  const upcomingMeetups = useSelector(
    (state) => state.auth?.user?.upcoming_meetup_date
  );
  useEffect(() => {
    if (upcomingMeetups?.length > 0) {
      const labels = [];
      const data = [];
      upcomingMeetups.forEach((meetup) => {
        labels.push(meetup.meetup_date);
        data.push(meetup.total);
      });
    }
  }, [upcomingMeetups]);
  return (
    <div className="flex w-full h-screen">
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
                value={user?.percentage === 0 ? "100%" : `${user?.percentage}%`}
              />
            )}
          </div>
        )}
        {(user?.member_status_id === 2 || user?.member_status_id === 5) && (
          <div className="w-full flex flex-wrap mb-10">
            <DataCard title={"Total Students"} icon={faUserGroup} value={15} />
            <DataCard title={"Total Supervisors"} icon={faUser} value={5} />
            <DataCard title={"Total Teams"} icon={faPeopleGroup} value={5} />
          </div>
        )}
        {/* {(user?.member_status_id === 3 || user?.member_status_id === 1) && (
          <div>
            <p className="text-center font-bold text-2xl m-0">Meetups</p>

            <div className="h-96 w-full">
              <Bar options={options} data={meetupsData} />;
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
