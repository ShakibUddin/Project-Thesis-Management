import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload } from "antd";
import React, { useState } from "react";
import ImgCrop from "antd-img-crop";
import { BASE_URL, PATHS } from "../../Constants/ApiConstants";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./settings.module.css";
const App = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadable, setUploadable] = useState(false);
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
      if (isJpgOrPng && isLt2M) {
        setUploadable(true);
        setFileList([file]);
      } else {
        setUploadable(false);
      }
      return false;
    },
    fileList,
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="w-full h-screen overflow-x-hidden">
      <div className={styles.container}>
        <p className="text-xl font-semibold">Upload Profile Picture</p>
        <ImgCrop rotate>
          <Upload onChange={onChange} {...props}>
            {fileList?.length < 1 && "Upload"}
          </Upload>
        </ImgCrop>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList?.length === 0 || !uploadable}
          loading={uploading}
          style={{
            marginTop: 16,
          }}
        >
          {uploading ? "Uploading" : "Start Upload"}
        </Button>
      </div>
      <div className={styles.container}>
        <p className="text-xl font-semibold">Reset Password</p>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your password again!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          ></Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default App;
