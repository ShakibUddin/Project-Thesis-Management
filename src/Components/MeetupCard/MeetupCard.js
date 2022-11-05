import { Collapse } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import * as Meetup from "../../Constants/MeetupConstants";
import UserCard from "../UserCard/UserCard";
import styles from "./MeetupCard.modle.css";
import MeetupData from "./MeetupData";
const { Panel } = Collapse;

export default function MeetupCard(props) {
  const onChange = (key) => {};
  const currentUser = useSelector((state) => state.auth?.user);
  const { id, date, time, status, team } = props;
  return (
    <div>
      {currentUser.member_status_id === 1 ? (
        <MeetupData {...props} />
      ) : (
        <Collapse defaultActiveKey={["1"]} onChange={onChange}>
          <Panel header="Meetup" key="1">
            <MeetupData {...props} />
          </Panel>
          <Panel header="Team" key="2">
            <div className={styles.studentContainer}>
              {team.map((member) => (
                <UserCard
                  name={member.name}
                  id={member.nub_id}
                  department={member.department_name}
                  program={member.program_name}
                  leader={member.team_leader}
                />
              ))}
            </div>
          </Panel>
        </Collapse>
      )}
    </div>
  );
}
