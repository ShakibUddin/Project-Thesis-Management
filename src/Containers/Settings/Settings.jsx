import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, notification, Upload } from "antd";
import React, { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { BASE_URL, PATHS } from "../../Constants/ApiConstants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styles from "./settings.module.css";
import * as SettingsAction from "../../State/Setings/SettingsActions.js";
import * as AuthActions from "../../State/Auth/AuthActions.js";
import { useNavigate } from "react-router-dom";

const App = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const resetPassword = useSelector((state) => state.settings.resetPassword);
  const resetPasswordError = useSelector(
    (state) => state.settings.resetPasswordError
  );
  const token = useSelector((state) => state.auth.user.token);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadable, setUploadable] = useState(false);
  const path = BASE_URL + PATHS.PROFILE_PICTURE_UPLOAD;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    console.log(values);
    dispatch(
      SettingsAction.resetPassword({
        body: {
          new_password: values.new_password,
          old_password: values.old_password,
          nub_id: currentUser.nub_id,
        },
        token,
      })
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const cleanAuthData = () => {
    dispatch(AuthActions.logout());
  };

  useEffect(() => {
    if (resetPassword) {
      cleanAuthData();
      notification.open({
        message: `${resetPasswordError}, Please Login Again`,
        placement: "bottomLeft",
        onClick: () => {},
      });
      navigate("/login", { replace: true });
    } else if (resetPassword === false) {
      notification.open({
        message: `${resetPasswordError}`,
        placement: "bottomLeft",
        onClick: () => {},
      });
    }
  }, [resetPassword, resetPasswordError]);

  return (
    <div className="w-full overflow-x-hidden">
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
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Current Password"
            name="old_password"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
              {
                max: 20,
                message: "You can not enter more than 20 characters",
              },
              {
                min: 7,
                message: "Minimum 7 characters is reqired",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="new_password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                max: 20,
                message: "You can not enter more than 20 characters",
              },
              {
                min: 8,
                message: "Minimum 8 characters is reqired",
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
              {
                max: 20,
                message: "You can not enter more than 20 characters",
              },
              {
                min: 8,
                message: "Minimum 8 characters is reqired",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
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
