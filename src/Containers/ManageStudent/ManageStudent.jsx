import { Button, message, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, PATHS } from "../../Constants/ApiConstants.js";
import styles from "./ManageStudent.module.css";
import { UploadOutlined } from "@ant-design/icons";
import MUIDataTable from "mui-datatables";
import { useEffect } from "react";
import * as ACADActions from "../../State/ACAD/ACADActions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function ManageStudent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.user?.token);
  const students = useSelector((state) => state.acad?.students);
  const [data, setData] = useState([]);
  const columns = ["Name", "NUB ID", "Department", "Program", "Email"];

  const options = {
    filter: "false",
    sort: "true",
    selectableRows: false,
    responsive: "scroll",
    print: false,
    pagination: false,
    downloadOptions: {
      filename: "students.csv",
      separator: ",",
    },
  };
  const studentDetailsUploadPath =
    BASE_URL + PATHS.UPLAOD_ENROLLED_STUDENTS_DATA;
  const studentUploadProps = {
    name: "excelFile",
    action: studentDetailsUploadPath,
    headers: {
      authorization: `Bearer ${token}`,
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
  useEffect(() => {
    dispatch(ACADActions.getAllStudentsDetails({ token }));
  }, []);

  useEffect(() => {
    const studentData = [];
    students.forEach((student) => {
      studentData.push([
        student.name,
        student.id,
        student.department_name,
        student.program_name,
        student.email,
      ]);
    });
    setData([...studentData]);
  }, [students]);
  return (
    <div className="flex w-full h-screen">
      <div className="w-full mt-8">
        <div className="flex flex-col justify-start align-middle w-1/2">
          <span className="mb-2 text-lg">Enrolled Student Details:</span>
          <span className="mb-2 text-sm text-blue-500">
            Please upload .xlsx file under 200 kb
          </span>

          <Upload beforeUpload={beforeUpload} {...studentUploadProps}>
            <button className={styles.buttonStyle} icon={<UploadOutlined />}>
              <icon>
                <FontAwesomeIcon icon={faUpload} />
              </icon>{" "}
              Click to Upload
            </button>
          </Upload>
        </div>
        <div className={`w-full mt-10 ${styles.customTable}`}>
          <MUIDataTable
            title={"Students List"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}
