import React from "react";
import { useSelector } from "react-redux";
import MeetupCard from "../../Components/MeetupCard/MeetupCard";
import UserCard from "../../Components/UserCard/UserCard";
import * as Meetup from "../../Constants/MeetupConstants";

export default function Home() {
  const user = useSelector((state) => state.auth?.user);

  return (
    <div className="flex flex-col w-full">
      <p>Welcome to NUB Project Thesis Management System</p>
    </div>
  );
}
