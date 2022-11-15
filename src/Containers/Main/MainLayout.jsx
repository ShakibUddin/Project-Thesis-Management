import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import useWindowDimensions from "../../Hooks/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { makeApiCall } from "../../client";
import * as AuthActions from "../../State/Auth/AuthActions";
import styles from "./MainLayout.module.css";
import defaultAvatar from "../../Assets/avatar.jpg";
import { AVATAR_BASE } from "../../Constants/ImageConstants";

const { Header, Content, Footer, Sider } = Layout;

export default function MainLayout() {
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const cleanAuthData = () => {
    dispatch(AuthActions.logout());
  };
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          position: "fixed",
          height: "100vh",
          zIndex: "1000",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <div className="w-full flex flex-col justify-center align-middle">
            <div className="w-full mt-4 flex justify-center align-middle">
              <img
                className={styles.avatar}
                src={
                  user.avatar ? `${AVATAR_BASE}${user.avatar}` : defaultAvatar
                }
                alt="avatar"
              />
            </div>
            <p className="mt-2 text-lg font-bold text-center">{user?.name}</p>
          </div>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          {(user.member_status_id === 1 || user.member_status_id === 3) && (
            <Menu.Item key="2" icon={<UsergroupDeleteOutlined />}>
              <Link to="/team">My Team</Link>
            </Menu.Item>
          )}
          {user.member_status_id === 2 && (
            <Menu.Item key="2" icon={<UsergroupDeleteOutlined />}>
              <Link to="/proposals">Proposals</Link>
            </Menu.Item>
          )}
          {user.member_status_id === 1 && (
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/project">Project/Thesis</Link>
            </Menu.Item>
          )}
          {user.member_status_id === 1 ||
            (user.member_status_id === 3 && (
              <Menu.Item key="5" icon={<UserOutlined />}>
                <Link to="/meetup">Meetups</Link>
              </Menu.Item>
            ))}
          {user.member_status_id === 5 && (
            <Menu.Item key="8" icon={<UploadOutlined />}>
              <Link to="/manage_students">Manage Students</Link>
            </Menu.Item>
          )}
          {user.member_status_id === 5 && (
            <Menu.Item key="9" icon={<UploadOutlined />}>
              <Link to="/manage_supervisors">Manage Supervisors</Link>
            </Menu.Item>
          )}
          <Menu.Item key="6" icon={<UserOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<UserOutlined />}>
            <Link to="/login" onClick={cleanAuthData}>
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.layoutStyle}>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
