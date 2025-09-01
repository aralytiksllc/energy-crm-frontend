// External
import { Space, Tag, Tooltip, Typography } from 'antd';
import { FileOutlined, LinkOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { EditButton } from '@refinedev/antd';

// Internal
import type { IDocument } from '@/interfaces/documents';
import { DeleteButton } from '@/components/delete-button';

const { Text } = Typography;

const formatBytes = (bytes?: number) => {
  if (bytes == null || isNaN(bytes)) return '-';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const val = bytes / Math.pow(k, i);
  return `${val.toFixed(val >= 100 ? 0 : val >= 10 ? 1 : 2)} ${sizes[i]}`;
};

const topLevelFromMime = (mime?: string | null) =>
  mime ? mime.split('/')[0] : undefined;

export const columns: ColumnsType<IDocument> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 90,
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    render: (name: string, record) => (
      <Space size="small">
        <FileOutlined />
        <a
          href={record.path}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label="Open file"
        >
          <Text ellipsis style={{ maxWidth: 260 }}>
            {name}
          </Text>
        </a>
        <LinkOutlined />
      </Space>
    ),
  },
  {
    title: 'Original name',
    dataIndex: 'originalName',
    key: 'originalName',
    ellipsis: true,
    responsive: ['lg'],
    render: (text?: string) => (text ? <Text ellipsis>{text}</Text> : '-'),
  },
  {
    title: 'Type',
    dataIndex: 'documentType',
    key: 'documentType',
    width: 130,
    render: (docType: string | null, record) => {
      const top = topLevelFromMime(record.mimeType);
      const colorMap: Record<
        string,
        'blue' | 'green' | 'purple' | 'orange' | 'red' | 'default'
      > = {
        image: 'green',
        video: 'purple',
        audio: 'orange',
        application: 'blue',
        text: 'blue',
      };
      const color = (top && colorMap[top]) || 'default';
      const label = docType || top || 'unknown';
      return <Tag color={color}>{label}</Tag>;
    },
  },
  {
    title: 'MIME',
    dataIndex: 'mimeType',
    key: 'mimeType',
    width: 160,
    responsive: ['md'],
    render: (mime?: string) => mime ?? '-',
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
    width: 110,
    sorter: (a, b) => (a.size ?? 0) - (b.size ?? 0),
    render: (size?: number) => formatBytes(size),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
    responsive: ['lg'],
    render: (desc?: string | null) =>
      desc ? (
        <Tooltip title={desc}>
          <Text ellipsis style={{ maxWidth: 260 }}>
            {desc}
          </Text>
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Actions',
    key: 'actions',
    fixed: 'right',
    width: 100,
    render: (_value, record) => (
      <Space size="small" key={`actions-${record.id}`}>
        <EditButton
          recordItemId={record.id}
          resource="documents"
          size="small"
          hideText
        />
        <DeleteButton
          confirmTitle={`Are you sure you want to delete "${record.name}"?`}
          confirmMessage="This action cannot be undone."
          recordItemId={record.id}
          resource="documents"
          size="small"
        />
      </Space>
    ),
  },
];
