import React, { useMemo, useState } from 'react';
import {
  Table,
  Input,
  Button,
  Tag,
  Space,
  Dropdown,
  Avatar,
  Typography,
  Popover,
  Checkbox,
  Divider,
  theme,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
  MoreOutlined,
} from '@ant-design/icons';

import { List } from '@/components/list';

// ——— Types
interface UserRow {
  key: string;
  name: string;
  email: string;
  avatar?: string;
  access: ('Admin' | 'Data Export' | 'Data Import')[];
  lastActive: string; // e.g., "Mar 4, 2024"
  dateAdded: string; // e.g., "July 4, 2022"
}

// ——— Mock data (replace with your API data)
const USERS: UserRow[] = [
  {
    key: '1',
    name: 'Florence Shaw',
    email: 'florence@untitledui.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Florence%20Shaw',
    access: ['Admin', 'Data Export', 'Data Import'],
    lastActive: 'Mar 4, 2024',
    dateAdded: 'July 4, 2022',
  },
  {
    key: '2',
    name: 'Amélie Laurent',
    email: 'amelie@untitledui.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Amelie%20Laurent',
    access: ['Admin', 'Data Export', 'Data Import'],
    lastActive: 'Mar 4, 2024',
    dateAdded: 'July 4, 2022',
  },
  {
    key: '3',
    name: 'Ammar Foley',
    email: 'ammar@untitledui.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ammar%20Foley',
    access: ['Data Export', 'Data Import'],
    lastActive: 'Mar 2, 2024',
    dateAdded: 'July 4, 2022',
  },
  {
    key: '4',
    name: 'Caitlyn King',
    email: 'caitlyn@untitledui.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Caitlyn%20King',
    access: ['Data Export', 'Data Import'],
    lastActive: 'Mar 6, 2024',
    dateAdded: 'July 4, 2022',
  },
  {
    key: '5',
    name: 'Sienna Hewitt',
    email: 'sienna@untitledui.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sienna%20Hewitt',
    access: ['Data Export', 'Data Import'],
    lastActive: 'Mar 4, 2024',
    dateAdded: 'July 4, 2022',
  },
  {
    key: '6',
    name: 'Olly Shroeder',
    email: 'olly@untitledui.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Olly%20Shroeder',
    access: ['Data Export', 'Data Import'],
    lastActive: 'Mar 6, 2024',
    dateAdded: 'July 4, 2022',
  },
  {
    key: '7',
    name: 'Mathilde Lewis',
    email: 'mathilde@untitledui.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Mathilde%20Lewis',
    access: ['Data Export', 'Data Import'],
    lastActive: 'Mar 4, 2024',
    dateAdded: 'July 4, 2022',
  },
  {
    key: '8',
    name: 'Jaya Willis',
    email: 'jaya@untitledui.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Jaya%20Willis',
    access: ['Data Export', 'Data Import'],
    lastActive: 'Mar 4, 2024',
    dateAdded: 'July 4, 2022',
  },
  {
    key: '9',
    name: 'Ravi Patel',
    email: 'ravi@untitledui.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ravi%20Patel',
    access: ['Data Export'],
    lastActive: 'Mar 5, 2024',
    dateAdded: 'Aug 12, 2022',
  },
  {
    key: '10',
    name: 'Lena Hoff',
    email: 'lena@untitledui.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Lena%20Hoff',
    access: ['Admin'],
    lastActive: 'Feb 28, 2024',
    dateAdded: 'Sep 1, 2022',
  },
  {
    key: '11',
    name: 'Diego Martín',
    email: 'diego@untitledui.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Diego%20Martin',
    access: ['Data Import'],
    lastActive: 'Mar 3, 2024',
    dateAdded: 'Oct 7, 2022',
  },
  {
    key: '12',
    name: 'Maya Lee',
    email: 'maya@untitledui.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Maya%20Lee',
    access: ['Data Export', 'Data Import'],
    lastActive: 'Mar 2, 2024',
    dateAdded: 'Nov 11, 2022',
  },
];

// ——— Helpers
const ACCESS_COLORS: Record<UserRow['access'][number], string> = {
  Admin: 'blue',
  'Data Export': 'cyan',
  'Data Import': 'purple',
};

const AccessTags: React.FC<{ values: UserRow['access'] }> = ({ values }) => (
  <Space wrap size={6}>
    {values.map((v) => (
      <Tag key={v} color={ACCESS_COLORS[v]} style={{ marginInlineEnd: 0 }}>
        {v}
      </Tag>
    ))}
  </Space>
);

// ——— Component
export function UsersList() {
  const { token } = theme.useToken();

  const [query, setQuery] = useState('');
  const [accessFilter, setAccessFilter] = useState<UserRow['access'][number][]>(
    [],
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const filtered: UserRow[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return USERS.filter((u) => {
      const matchesQuery = !q
        ? true
        : u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchesAccess = accessFilter.length
        ? accessFilter.some((t) => u.access.includes(t))
        : true;
      return matchesQuery && matchesAccess;
    });
  }, [query, accessFilter]);

  const accessFilterContent = (
    <div style={{ width: 220 }}>
      <Typography.Text strong>Access</Typography.Text>
      <Divider style={{ margin: '8px 0' }} />
      <Checkbox.Group
        style={{ width: '100%' }}
        value={accessFilter}
        onChange={(vals) => setAccessFilter(vals as any)}
      >
        <Space direction="vertical" size={8}>
          <Checkbox value="Admin">Admin</Checkbox>
          <Checkbox value="Data Export">Data Export</Checkbox>
          <Checkbox value="Data Import">Data Import</Checkbox>
        </Space>
      </Checkbox.Group>
      <Divider style={{ margin: '12px 0' }} />
      <Space>
        <Button size="small" onClick={() => setAccessFilter([])}>
          Reset
        </Button>
        <Button size="small" type="primary" onClick={() => null}>
          Apply
        </Button>
      </Space>
    </div>
  );

  const actionItems = [
    { key: 'view', label: 'View profile' },
    { key: 'edit', label: 'Edit' },
    { type: 'divider' as const },
    { key: 'disable', label: 'Disable' },
    {
      key: 'remove',
      label: <span style={{ color: token.colorError }}>Remove</span>,
    },
  ];

  const columns: ColumnsType<UserRow> = [
    {
      title: 'User name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (_value, record) => (
        <Space size={12}>
          <Avatar size={32} src={record.avatar}>
            {record.name[0]}
          </Avatar>
          <div style={{ lineHeight: 1.15 }}>
            <Typography.Text strong>{record.name}</Typography.Text>
            <br />
            <Typography.Text type="secondary">{record.email}</Typography.Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Access',
      dataIndex: 'access',
      key: 'access',
      render: (values: UserRow['access']) => <AccessTags values={values} />,
      responsive: ['md'],
    },
    {
      title: 'Last active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      sorter: (a, b) =>
        new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime(),
      defaultSortOrder: undefined,
      width: 140,
      align: 'right' as const,
      responsive: ['lg'],
    },
    {
      title: 'Date added',
      dataIndex: 'dateAdded',
      key: 'dateAdded',
      sorter: (a, b) =>
        new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime(),
      width: 140,
      align: 'right' as const,
      responsive: ['lg'],
    },
    {
      key: 'actions',
      width: 56,
      align: 'center' as const,
      render: (_, record) => (
        <Dropdown
          trigger={['click']}
          menu={{
            items: actionItems as any,
            onClick: ({ key }) => console.log(key, record),
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <List
      title={
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            User management
          </Typography.Title>
          <Typography.Text type="secondary">
            Manage your team members and their account permissions here.
          </Typography.Text>
        </div>
      }
    >
      <Table<UserRow>
        rowKey={(r) => r.key}
        size="middle"
        sticky
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        columns={columns}
        dataSource={filtered}
        pagination={{ position: ['bottomCenter'] }}
      />
    </List>
  );
}
