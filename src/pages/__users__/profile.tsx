import React from "react";
import {
  Layout,
  Menu,
  Typography,
  Avatar,
  Button,
  Form,
  Input,
  Divider,
  Switch,
  Row,
  Col,
  Space,
  theme,
} from "antd";
import {
  AppstoreOutlined,
  BellOutlined,
  GlobalOutlined,
  TeamOutlined,
  CreditCardOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const items: any[] = [
  {
    type: "group",
    label: <Text type="secondary" style={{ fontSize: 12, letterSpacing: 0.2 }}>GENERAL SETTINGS</Text>,
    children: [
      { key: "apps", icon: <AppstoreOutlined />, label: "Apps" },
      { key: "account", icon: <UserOutlined />, label: "Account" },
      { key: "notification", icon: <BellOutlined />, label: "Notification" },
      { key: "language", icon: <GlobalOutlined />, label: "Language & Region" },
    ],
  },
  {
    type: "group",
    label: <Text type="secondary" style={{ fontSize: 12, letterSpacing: 0.2 }}>WORKSPACE SETTINGS</Text>,
    children: [
      { key: "general", icon: <AppstoreOutlined />, label: "General", disabled: true },
      { key: "members", icon: <TeamOutlined />, label: "Members", disabled: true },
      { key: "billing", icon: <CreditCardOutlined />, label: "Billing", disabled: true },
    ],
  },
];

const AccountSettingsMinimal: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <Sider
        theme="light"
        width={260}
        style={{ borderInlineEnd: `1px solid ${token.colorSplit}` }}
      >
        <Menu
          mode="inline"
          selectedKeys={["account"]}
          items={items}
          style={{ padding: 8, borderInlineEnd: 0 }}
        />
      </Sider>

      <Content style={{ padding: 16 }}>
        <Title level={3} style={{ marginBottom: 16 }}>
          Account Settings
        </Title>

        {/* My Profile */}
        <Title level={4} style={{ marginTop: 0 }}>My Profile</Title>

        <Space align="start" size="large" style={{ marginBottom: 12 }}>
          <Avatar size={56} src="https://i.pravatar.cc/112?img=5" />
          <Space direction="vertical" size={8}>
            <Space>
              <Button size="small" type="default" shape="round">+ Change Image</Button>
              <Button size="small" shape="round" ghost>Remove Image</Button>
            </Space>
            <Text type="secondary" style={{ fontSize: 12 }}>
              We support PNGs, JPEGs and GIFs under 2MB
            </Text>
          </Space>
        </Space>

        <Form layout="vertical">
          <Row gutter={12}>
            <Col xs={24} md={12}>
              <Form.Item label="First Name">
                <Input defaultValue="Brian" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Last Name">
                <Input defaultValue="Frederin" />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Divider />

        {/* Account Security */}
        <Title level={4}>Account Security</Title>

        {/* Email row */}
        <Row gutter={12} align="top">
          <Col xs={24} md={16}>
            <Form layout="vertical">
              <Form.Item label="Email">
                <Input disabled defaultValue="brianfrederin@email.com" />
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button size="small" shape="round">Change email</Button>
          </Col>
        </Row>

        {/* Password row */}
        <Row gutter={12} align="top">
          <Col xs={24} md={16}>
            <Form layout="vertical">
              <Form.Item label="Password">
                <Input.Password disabled defaultValue="********" />
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button size="small" shape="round">Change password</Button>
          </Col>
        </Row>

        {/* 2FA */}
        <Form layout="vertical">
          <Form.Item
            label="2-Step Verifications"
            extra="Add an additional layer of security to your account during login."
          >
            <Switch />
          </Form.Item>
        </Form>

        <Divider />

        {/* Support Access */}
        <Title level={4}>Support Access</Title>

        <Form layout="vertical">
          <Form.Item
            label="Support access"
            extra="You have granted us to access your account for support purposes until Aug 31, 2023, 9:40 PM."
          >
            <Switch />
          </Form.Item>
        </Form>

        {/* Logout all devices */}
        <Row gutter={12} align="middle">
          <Col xs={24} md={16}>
            <Form layout="vertical">
              <Form.Item
                label="Log out of all devices"
                extra="Log out of all other active sessions on other devices besides this one."
              />
            </Form>
          </Col>
          <Col xs={24} md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button size="small" shape="round">Log out</Button>
          </Col>
        </Row>

        {/* Delete account */}
        <Row gutter={12} align="middle">
          <Col xs={24} md={16}>
            <Form layout="vertical">
              <Form.Item
                label={<Text type="danger">Delete my account</Text>}
                extra="Permanently delete the account and remove access from all workspaces."
              />
            </Form>
          </Col>
          <Col xs={24} md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button danger size="small" shape="round">Delete Account</Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AccountSettingsMinimal;
