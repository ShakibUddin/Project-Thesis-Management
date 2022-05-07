import React from 'react'
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import StudentHome from '../Home/StudentHome';
import StudentTeam from '../Team/StudentTeam';
import { useState } from 'react';
import StudentProjectThesis from '../ProjectThesis/StudentProjectThesis';
import StudentMeetups from '../Meetups/StudentMeetups';
import StudentNotifications from '../Notifications/StudentNotifications';
import StudentSettings from '../Settings/StudentSettings';
import useWindowDimensions from '../../Hooks/useWindowDimensions';

const { Header, Content, Footer, Sider } = Layout;
export default function MainLayout() {
    const [currentItem, setCurrentItem] = useState('1');
    const { width, height } = useWindowDimensions();
    console.log(width)
    return (
        <Layout className='h-full'>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={e => setCurrentItem(e.key)}>
                    <p className='mt-10 text-lg font-bold text-center'>Md Shakib Uddin Bhuiyan</p>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        My Team
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        Project/Thesis
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        Meetups
                    </Menu.Item>
                    <Menu.Item key="5" icon={<UserOutlined />}>
                        Notifications
                    </Menu.Item>
                    <Menu.Item key="6" icon={<UserOutlined />}>
                        Settings
                    </Menu.Item>
                    <Menu.Item key="7" icon={<UserOutlined />}>
                        <Link to="/signin">Logout</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout
                className="site-layout"
                style={{
                    marginLeft: 200,
                }}
            >
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                />
                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                        }}
                    >
                        {currentItem === '1' && <StudentHome />}
                        {currentItem === '2' && <StudentTeam />}
                        {currentItem === '3' && <StudentProjectThesis />}
                        {currentItem === '4' && <StudentMeetups />}
                        {currentItem === '5' && <StudentNotifications />}
                        {currentItem === '6' && <StudentSettings />}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}
