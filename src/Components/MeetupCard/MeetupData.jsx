import React from "react";

export default function MeetupData(props) {
  const { id, date, time, status } = props;
  return (
    <div className="flex flex-col m-2 justify-betwee py-2 px-4 w-40 rounded-md shadow-lg">
      <div className="w-100 d-flex flex-col text-center">
        <p>
          <b>Date:</b> {date}
        </p>
        <p>
          <b>TIme:</b> {time}
        </p>
        <p
          className={`${
            status === Meetup.UPCOMING ? "text-green-500" : "text-gray-400"
          }`}
        >
          <b>{status}</b>
        </p>
      </div>
    </div>
  );
}
