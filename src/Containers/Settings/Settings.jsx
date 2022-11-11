import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import React, { useState } from "react";
import ImgCrop from "antd-img-crop";
import { BASE_URL, PATHS } from "../../Constants/ApiConstants";
import { useSelector } from "react-redux";
const App = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const path = BASE_URL + PATHS.PROFILE_PICTURE_UPLOAD;

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("avatar", fileList[0]);
    formData.append("nub_id", currentUser.nub_id);
    setUploading(true);
    // You can use any AJAX library you like
    fetch(path, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <>
      <ImgCrop rotate>
        <Upload {...props}>
          {fileList.length < 1 && (
            <Button icon={<UploadOutlined />}>Select File</Button>
          )}
        </Upload>
      </ImgCrop>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
};
export default App;
