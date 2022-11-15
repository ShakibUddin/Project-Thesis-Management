import { Button, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL, PATHS } from "../../Constants/ApiConstants.js";
import styles from "./ManageSupervisor.module.css";
import { UploadOutlined } from "@ant-design/icons";
import MUIDataTable from "mui-datatables";
import * as ACADActions from "../../State/ACAD/ACADActions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const columns = ["Name", "NUB ID", "Department", "Program", "Email"];

const options = {
  filter: "false",
  sort: "true",
  selectableRows: false,
  pagination: false,
  downloadOptions: {
    filename: "supervisors.csv",
    separator: ",",
  },
  setCellProps: () => ({
    style: { textAlign: "center" },
  }),
  print: false,
};
const supervisorDetailsUploadPath = BASE_URL + PATHS.UPLAOD_SUPERVISORS_DATA;

const supervisorUploadProps = {
  name: "excelFile",
  action: supervisorDetailsUploadPath,
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const beforeUpload = (file) => {
  const isExcelFile = file.name.split(".").at(-1) === "xlsx";
  if (!isExcelFile) {
    message.error("You can only upload xlsx file!");
  }
  const isLt2M = file.size / 1024 < 200;
  if (!isLt2M) {
    message.error("File must smaller than 200kb!");
  }
  return isExcelFile && isLt2M;
};

export default function ManageSupervisor() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.user?.token);
  const supervisors = useSelector((state) => state.acad?.supervisors);
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("caling");
    dispatch(ACADActions.getAllSupervisorsDetails({ token }));
  }, []);

  useEffect(() => {
    const supervisorData = [];
    supervisors.forEach((supervisor) => {
      supervisorData.push([
        supervisor.name,
        supervisor.id,
        supervisor.department_name,
        supervisor.program_name,
        supervisor.email,
      ]);
    });
    setData([...supervisorData]);
  }, [supervisors]);
  return (
    <div className="flex w-full h-screen">
      <div className="w-full">
        <div className="flex flex-col justify-start align-middle  w-1/2">
          <span className="mb-2 text-lg">Supervisor Details:</span>
          <span className="mb-2 text-sm text-blue-500">
            Please upload .xlsx file under 200 kb
          </span>
          <Upload beforeUpload={beforeUpload} {...supervisorUploadProps}>
            <button className={styles.buttonStyle}>
              <icon>
                <FontAwesomeIcon icon={faUpload} />
              </icon>{" "}
              Click to Upload
            </button>
          </Upload>
        </div>
        <div className={`w-full mt-10 ${styles.customTable}`}>
          <MUIDataTable
            title={"Supervisors List"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}
