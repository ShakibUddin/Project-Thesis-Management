import React from 'react'
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
export default function MainLayout() {
    return (
        <Layout className='h-screen'>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        Notifications
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        Settings
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        <Link to="/signin">Logout</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        content
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Project and Thesis Management</Footer>
            </Layout>
        </Layout>
    )
}