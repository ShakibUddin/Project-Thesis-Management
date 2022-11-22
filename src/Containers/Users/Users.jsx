import { Button, Switch, Tabs } from "antd";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Users.module.css";
import * as UserActions from "../../State/User/UserActions.js";
import confirm from "antd/lib/modal/confirm";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.user?.token);
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [acadMembers, setAcadMembers] = useState([]);
  const [inactiveMembers, setInactiveMembers] = useState([]);
  const [checked, setChecked] = useState(true);

  const columns = [
    "Name",
    "NUB ID",
    "Department",
    "Program",
    "Email",
    {
      label: "",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Switch
              checkedChildren="Active"
              unCheckedChildren="Inactive"
              checked={tableMeta.rowData[5] === 1}
              onClick={(e) => {
                confirm({
                  icon: <ExclamationCircleOutlined />,
                  content: (
                    <p>
                      {tableMeta.rowData[5] === 1
                        ? `Are you sure you want to disable ${tableMeta.rowData[0]}?`
                        : `Are you sure you want to enable ${tableMeta.rowData[0]}?`}
                    </p>
                  ),
                  onOk() {
                    console.log("OK");
                    if (tableMeta.rowData[5] === 1) {
                      const body = {
                        nub_id: tableMeta.rowData[1],
                        active: 0,
                      };
                      dispatch(UserActions.setNubId(tableMeta.rowData[1]));
                      dispatch(UserActions.updateActiveStatus({ body, token }));
                    } else {
                      const body = {
                        nub_id: tableMeta.rowData[1],
                        active: 1,
                      };
                      dispatch(UserActions.setNubId(tableMeta.rowData[1]));
                      dispatch(UserActions.updateActiveStatus({ body, token }));
                    }
                  },
                  onCancel() {
                    console.log("Cancel");
                  },
                });
                console.log(e);
              }}
            />
          );
        },
      },
    },
  ];
  const options = {
    filter: "false",
    sort: "true",
    selectableRows: false,
    responsive: "scroll",
    print: false,
    pagination: true,
    download: false,
  };
  useEffect(() => {
    if (users?.length) {
      const studentsData = [];
      const supervisorsData = [];
      const acadMembersData = [];
      const inactiveMembersData = [];
      users.forEach((user) => {
        if (user.member_status_id === 1 && user.active === 1) {
          studentsData.push([
            user.name,
            user.nub_id,
            user.department_name,
            user.program_name,
            user.email,
            user.active,
          ]);
        }
        if (user.member_status_id === 3 && user.active === 1) {
          supervisorsData.push([
            user.name,
            user.nub_id,
            user.department_name,
            user.program_name,
            user.email,
            user.active,
          ]);
        }
        if (user.member_status_id === 5 && user.active === 1) {
          acadMembersData.push([
            user.name,
            user.nub_id,
            user.department_name,
            user.program_name,
            user.email,
            user.active,
          ]);
        }
        if (user.active === 0) {
          inactiveMembersData.push([
            user.name,
            user.nub_id,
            user.department_name,
            user.program_name,
            user.email,
            user.active,
          ]);
        }
      });
      setStudents([...studentsData]);
      setSupervisors([...supervisorsData]);
      setAcadMembers([...acadMembersData]);
      setInactiveMembers([...inactiveMembersData]);
    }
  }, [users]);

  useEffect(() => {
    if (user.member_status_id === 4) {
      dispatch(
        UserActions.getAllUsers({
          token,
        })
      );
    }
  }, []);

  return (
    <div className="flex w-full">
      <div className="w-full mt-8">
        <Tabs>
          <Tabs.TabPane tab="Students" key="1">
            <div className={`w-full mt-10 ${styles.customTable}`}>
              <MUIDataTable
                title={"Students List"}
                data={students}
                columns={columns}
                options={options}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Supervisors" key="2">
            <div className={`w-full mt-10 ${styles.customTable}`}>
              <MUIDataTable
                title={"Supervisors List"}
                data={supervisors}
                columns={columns}
                options={options}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="ACAD" key="3">
            <div className={`w-full mt-10 ${styles.customTable}`}>
              <MUIDataTable
                title={"ACAD Members List"}
                data={acadMembers}
                columns={columns}
                options={options}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Inactive Users" key="4">
            <div className={`w-full mt-10 ${styles.customTable}`}>
              <MUIDataTable
                title={"Inactive Members List"}
                data={inactiveMembers}
                columns={columns}
                options={options}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
