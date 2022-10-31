import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import useWindowDimensions from "../../Hooks/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { makeApiCall } from "../../client";
import * as AuthActions from "../../State/Auth/AuthActions";
import styles from "./MainLayout.module.css";

const { Header, Content, Footer, Sider } = Layout;

export default function MainLayout() {
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const cleanAuthData = () => {
    dispatch(AuthActions.logout());
  };
  return (
    <Layout hasSider>
      <Sider
        className={styles.sider}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className={styles.logo} />
        <Menu className={styles.menu} theme="dark" mode="inline">
          <p className="mt-10 text-lg font-bold text-center">{user?.name}</p>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UsergroupDeleteOutlined />}>
            <Link to="/team">My Team</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/project">Project/Thesis</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
            <Link to="/notifications">Notifications</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            <Link to="/meetup">Meetups</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<UserOutlined />}>
            <Link to="/meetup">Settings</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<UserOutlined />}>
            <Link to="/login" onClick={cleanAuthData}>
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          className={styles.site_layout_sub_header_background}
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            className={styles.site_layout_background}
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
