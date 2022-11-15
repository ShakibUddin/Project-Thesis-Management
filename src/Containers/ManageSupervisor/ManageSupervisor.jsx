import { Button, message, Upload } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { BASE_URL, PATHS } from "../../Constants/ApiConstants.js";
import "./ManageSupervisor.module.css";
import { UploadOutlined } from "@ant-design/icons";

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
  const user = useSelector((state) => state.auth?.user);
  return (
    <div className="flex w-full h-screen">
      <div>
        <div className="flex flex-col justify-start align-middle  w-1/2">
          <span className="mb-2 text-lg">Supervisor Details:</span>
          <span className="mb-2 text-sm text-blue-500">
            Please upload .xlsx file under 200 kb
          </span>
          <Upload beforeUpload={beforeUpload} {...supervisorUploadProps}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
      </div>
    </div>
  );
}
