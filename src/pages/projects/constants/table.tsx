import { ColumnsType } from 'antd/es/table';
import { Progress, Space, Input, Button, Select, Form } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { DateField, NumberField, TagField, TextField } from '@refinedev/antd';
import type { IProject } from '@interfaces/project';
import { EditButton } from '@components/edit-button';
import { DeleteButton } from '@components/delete-button';
import { ColumnType as AntColumnType } from 'antd/es/table';

function isDataColumn<T>(
  col: AntColumnType<T>,
): col is AntColumnType<T> & { dataIndex: string | string[] } {
  return 'dataIndex' in col;
}

const filterOperators = [
  { label: 'Equals', value: 'eq' },
  { label: 'Not Equals', value: 'ne' },
  { label: 'Like (case-sensitive)', value: 'like' },
  { label: 'Ilike (case-insensitive)', value: 'ilike' },
  { label: 'Greater Than', value: 'gt' },
  { label: 'Less Than', value: 'lt' },
  { label: 'Greater Than or Equal', value: 'gte' },
  { label: 'Less Than or Equal', value: 'lte' },
  { label: 'In', value: 'in' },
  { label: 'Range', value: 'range' },
];

const getAdvancedFilterProps = (
  defaultField: string | string[],
  allColumns: ColumnsType<IProject>,
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: any) => {
    const filterableColumns = allColumns
      .filter(isDataColumn)
      .filter((c) => c.key !== 'actions');

    const initialValues = selectedKeys[0] || { field: defaultField };

    return (
      <div style={{ padding: 8, width: 480 }}>
        <Form
          onFinish={(values) => {
            setSelectedKeys(values.field ? [values] : []);
            confirm();
          }}
          initialValues={initialValues}
          layout="inline"
        >
          <Form.Item name="field" style={{ flex: 1 }}>
            <Select placeholder="Column">
              {filterableColumns.map((col: any) => (
                <Select.Option
                  key={col.key}
                  value={
                    Array.isArray(col.dataIndex)
                      ? col.dataIndex.join('.')
                      : col.dataIndex
                  }
                >
                  {col.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="operator" style={{ flex: 1 }}>
            <Select placeholder="Operator">
              {filterOperators.map((op) => (
                <Select.Option key={op.value} value={op.value}>
                  {op.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="value" style={{ flex: 1 }}>
            <Input placeholder="Value" />
          </Form.Item>
          <div style={{ marginTop: 8, textAlign: 'right', width: '100%' }}>
            <Space>
              <Button
                onClick={() => {
                  clearFilters();
                  confirm();
                }}
                size="small"
              >
                Reset
              </Button>
              <Button type="primary" htmlType="submit" size="small">
                Filter
              </Button>
            </Space>
          </div>
        </Form>
      </div>
    );
  },
  filterIcon: (filtered: boolean) => (
    <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  onFilter: (value: any, record: IProject) => true,
});

const projectColumns: ColumnsType<IProject> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    sorter: true,
    render: (value) => <NumberField value={value} />,
  },
  {
    title: 'Project Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    sorter: true,
    ellipsis: true,
    render: (value) => <TextField value={value} strong />,
  },
  {
    title: 'Client',
    dataIndex: ['customer', 'name'],
    key: 'customerName',
    width: 150,
    sorter: true,
    ellipsis: true,
    render: (value) => <TextField value={value || '-'} />,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    sorter: true,
    render: (value) => <TagField value={value || 'Unknown'} />,
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    width: 100,
    sorter: true,
    render: (value) => <TagField value={value || 'Medium'} />,
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress',
    width: 120,
    sorter: true,
    render: (value: number) => <Progress percent={value || 0} size="small" />,
  },
  {
    title: 'Budget',
    dataIndex: 'budget',
    key: 'budget',
    width: 120,
    sorter: true,
    render: (value) => (
      <NumberField
        value={value || 0}
        options={{ style: 'currency', currency: 'EUR' }}
      />
    ),
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
    width: 120,
    sorter: true,
    render: (value) => <DateField value={value} format="MMM DD, YYYY" />,
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline',
    width: 120,
    sorter: true,
    render: (value) => <DateField value={value} format="MMM DD, YYYY" />,
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
    sorter: true,
    render: (value) => <DateField value={value} format="MMM DD, YYYY" />,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    width: 100,
    fixed: 'right',
    render: (_, record) => (
      <Space size="middle">
        <EditButton
          resource="projects"
          resourceId={record.id}
          type="default"
          size="small"
        />
        <DeleteButton
          resource="projects"
          resourceId={record.id}
          confirmTitle={`Delete project "${record.name}"?`}
          type="primary"
          size="small"
        />
      </Space>
    ),
  },
];

export const columns: ColumnsType<IProject> = projectColumns.map((col) => {
  if (!isDataColumn(col)) {
    return col;
  }

  const field = col.dataIndex || String(col.key);

  return {
    ...col,
    ...getAdvancedFilterProps(field, projectColumns),
  };
});
