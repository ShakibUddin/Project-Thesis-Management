import React from "react";
import { Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function Loader() {
  return (
    <div className="w-10 mr-auto mb-auto">
      <Space size="middle" indicator={antIcon}>
        <Spin size="large" />
      </Space>
    </div>
  );
}
