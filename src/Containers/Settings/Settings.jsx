import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import React, { useState } from "react";
import ImgCrop from "antd-img-crop";
import { BASE_URL, PATHS } from "../../Constants/ApiConstants";
import { useSelector } from "react-redux";
import axios from "axios";
const App = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const path = BASE_URL + PATHS.PROFILE_PICTURE_UPLOAD;

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("avatar", fileList[0].originFileObj);
    formData.append("nub_id", currentUser.nub_id);
    setUploading(true);
    // You can use any AJAX library you like
    axios({
      method: "post",
      url: path,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(function (response) {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const props = {
    listType: "picture-card",
    onPreview: async (file) => {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 < 500;
      if (!isLt2M) {
        message.error("Image must smaller than 500kb!");
      }
      if (isJpgOrPng && isLt2M) setFileList([file]);
      return false;
    },
    fileList,
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <>
      <ImgCrop rotate>
        <Upload onChange={onChange} {...props}>
          {fileList?.length < 1 && "Upload"}
        </Upload>
      </ImgCrop>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList?.length === 0}
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
