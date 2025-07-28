import React from 'react';
import {
  FormProps,
  Typography,
  Empty,
  List,
  Card,
  Space,
  Tag,
  Button,
} from 'antd';
import {
  FileTextOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { IDocument } from '@modules/projects/types/types';

const { Title, Text } = Typography;

export interface ProjectPagesFormProps {
  formProps: FormProps;
}
const mockPages: IDocument[] = [
  { id: 1, name: 'Project Requirements' },
  { id: 2, name: 'Technical Specifications' },
  { id: 3, name: 'User Guide' },
];

export const ProjectPagesForm: React.FC<ProjectPagesFormProps> = ({
  formProps,
}) => {
  const projectId = formProps.form?.getFieldValue('id');
  const pages = projectId ? mockPages : [];

  return (
    <div style={{ padding: '16px 0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Project Pages
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {}}
          disabled={!projectId}
        >
          Create Page
        </Button>
      </div>

      <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
        Documentation and pages related to this project will appear here
        automatically.
      </Text>

      {pages.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>
              {projectId
                ? 'No pages found for this project'
                : 'Save the project first to view and manage pages'}
            </span>
          }
        />
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={pages}
          renderItem={(page) => (
            <List.Item>
              <Card
                size="small"
                actions={[
                  <Button
                    key="edit"
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => {}}
                  >
                    Edit
                  </Button>,
                  <Button
                    key="delete"
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {}}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <Card.Meta
                  avatar={
                    <FileTextOutlined
                      style={{
                        fontSize: '20px',
                        color: 'var(--color-primary)',
                      }}
                    />
                  }
                  title={page.name}
                  description={
                    <Space>
                      <Tag color="blue">Document</Tag>
                      <Text type="secondary">Last updated: Today</Text>
                    </Space>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
