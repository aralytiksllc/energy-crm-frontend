import React from 'react';
import { Table, Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { COLORS, BORDER_RADIUS } from '../../../../styles/theme';

interface DataType {
  key: string;
  info1: string;
  info2: string;
  info3: string;
  info4: string;
  info5: string;
  info6: string;
}

export const ConsumptionTable: React.FC = () => {
  const data: DataType[] = [
    {
      key: '1',
      info1: 'Info',
      info2: 'Info',
      info3: 'Info',
      info4: 'Info',
      info5: 'Info',
      info6: 'Info',
    },
    {
      key: '2',
      info1: 'Info',
      info2: 'Info',
      info3: 'Info',
      info4: 'Info',
      info5: 'Info',
      info6: 'Info',
    },
    {
      key: '3',
      info1: 'Info',
      info2: 'Info',
      info3: 'Info',
      info4: 'Info',
      info5: 'Info',
      info6: 'Info',
    },
    {
      key: '4',
      info1: 'Info',
      info2: 'Info',
      info3: 'Info',
      info4: 'Info',
      info5: 'Info',
      info6: 'Info',
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Checkbox />
      ),
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 50,
      render: () => <Checkbox />,
    },
    {
      title: 'Header',
      dataIndex: 'info1',
      key: 'info1',
      render: (text) => <span style={{ color: COLORS.text.secondary }}>{text}</span>,
    },
    {
      title: 'Header',
      dataIndex: 'info2',
      key: 'info2',
      render: (text) => <span style={{ color: COLORS.text.secondary }}>{text}</span>,
    },
    {
      title: 'Header',
      dataIndex: 'info3',
      key: 'info3',
      render: (text) => <span style={{ color: COLORS.text.secondary }}>{text}</span>,
    },
    {
      title: 'Header',
      dataIndex: 'info4',
      key: 'info4',
      render: (text) => <span style={{ color: COLORS.text.secondary }}>{text}</span>,
    },
    {
      title: 'Header',
      dataIndex: 'info5',
      key: 'info5',
      render: (text) => <span style={{ color: COLORS.text.secondary }}>{text}</span>,
    },
    {
      title: 'Header',
      dataIndex: 'info6',
      key: 'info6',
      render: (text) => <span style={{ color: COLORS.text.secondary }}>{text}</span>,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="middle"
      style={{
        border: `1px solid ${COLORS.border.light}`,
        borderRadius: BORDER_RADIUS.lg,
      }}
    />
  );
};
