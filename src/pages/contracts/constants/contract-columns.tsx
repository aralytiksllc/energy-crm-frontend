// External
import { Space, Tag } from 'antd';
import { EditButton } from '@refinedev/antd';
import type { ColumnsType } from 'antd/es/table';

// Internal
import type { IContract } from '@/interfaces/contracts';
import { DeleteButton } from '@/components/delete-button';
import { DownloadContractButton } from './DownloadContractButton';

const fmtDate = (d?: Date) =>
  d ? new Date(d).toLocaleDateString('en-GB') : '-';

const fmtNum = (n?: number, opts?: Intl.NumberFormatOptions) =>
  n == null
    ? '-'
    : new Intl.NumberFormat('en-GB', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        ...opts,
      }).format(n);

export const columns: ColumnsType<IContract> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: 'Contract No.',
    dataIndex: 'contractNumber',
    key: 'contractNumber',
    ellipsis: true,
  },
  {
    title: 'Customer',
    key: 'customer',
    render: (_, record) => record.customer?.companyName ?? '-',
  },
  {
    title: 'Effective',
    dataIndex: 'effectiveDate',
    key: 'effectiveDate',
    render: (v: IContract['effectiveDate']) => fmtDate(v),
  },
  {
    title: 'Supply Start',
    dataIndex: 'supplyStartDate',
    key: 'supplyStartDate',
    render: (v: IContract['supplyStartDate']) => fmtDate(v),
  },
  {
    title: 'Maturity',
    dataIndex: 'maturityDate',
    key: 'maturityDate',
    render: (v: IContract['maturityDate']) => fmtDate(v),
  },
  {
    title: 'Initial Term (y)',
    dataIndex: 'initialTermYears',
    key: 'initialTermYears',
    render: (v: number | undefined) => fmtNum(v),
  },
  {
    title: 'Renewal Term (y)',
    dataIndex: 'renewalTermYears',
    key: 'renewalTermYears',
    render: (v: number | undefined) => fmtNum(v),
  },
  {
    title: 'Price / MWh',
    dataIndex: 'pricePerMwh',
    key: 'pricePerMwh',
    render: (v: number | undefined) =>
      v == null
        ? '-'
        : fmtNum(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    title: 'Payment Terms (d)',
    dataIndex: 'paymentTermsDays',
    key: 'paymentTermsDays',
    render: (v: number | undefined) => fmtNum(v),
  },
  {
    title: 'Includes',
    key: 'includes',
    render: (_, r) => {
      const tags: string[] = [];
      if (r.includesNetworkTariffs) tags.push('Network Tariffs');
      if (r.includesVat) tags.push('VAT');
      return tags.length ? tags.map((t) => <Tag key={t}>{t}</Tag>) : '-';
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    fixed: 'right',
    render: (_value, record) => (
      <Space size="small" key={`actions-${record.id}`}>
        <EditButton
          recordItemId={record.id}
          resource="contracts"
          size="small"
          hideText
        />
        <DeleteButton
          recordItemId={record.id}
          confirmTitle={`Are you sure you want to delete "${record.contractNumber}"?`}
          confirmMessage="This action cannot be undone."
          resource="contracts"
          size="small"
        />
        <DownloadContractButton id={record.id} />
      </Space>
    ),
  },
];
