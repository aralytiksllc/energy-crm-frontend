import { ColumnsType } from 'antd/es/table';
import { createActions } from '@/components/actions/create-actions';
import { IProject } from '../types/types';

export const columns: ColumnsType<IProject> = [
  { dataIndex: 'id', title: 'ID', sorter: true },
  { dataIndex: 'name', title: 'Name', sorter: true },
  { dataIndex: 'stage', title: 'Stages', sorter: true },
  { dataIndex: 'functionalArea', title: 'Functional Area', sorter: true },
  { dataIndex: 'commercialRegion', title: 'Region', sorter: true },
  { dataIndex: 'commercialCountry', title: 'Country', sorter: true },
  { dataIndex: 'customerType', title: 'Customer Type', sorter: true },
  { dataIndex: 'pWin', title: 'PWin', sorter: true },
  { dataIndex: 'pGo', title: 'PGo', sorter: true },
  { dataIndex: 'totalContractValue', title: 'Total Value', sorter: true },
  { dataIndex: 'division', title: 'Division', sorter: true },
  { dataIndex: 'expectedRfpDate', title: 'RFP Date', sorter: true },
  { dataIndex: 'expectedRfqDate', title: 'RFQ Date', sorter: true },
  {
    dataIndex: 'expectedSubmissionDate',
    title: 'Submission Date',
    sorter: true,
  },
  { dataIndex: 'expectedAwardDate', title: 'Award Date', sorter: true },
  {
    dataIndex: 'expectedContractStartDate',
    title: 'Contract Start',
    sorter: true,
  },
  { dataIndex: 'description', title: 'Description', sorter: false },
  {
    dataIndex: 'owner',
    title: 'Owner',
    sorter: false,
    render: (owner) => owner?.name,
  },
  {
    dataIndex: 'createdBy',
    title: 'Created By',
    sorter: false,
    render: (createdBy) => createdBy?.name,
  },
  { dataIndex: 'createdAt', title: 'Created At', sorter: true },
  { dataIndex: 'updatedAt', title: 'Updated At', sorter: true },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    sorter: false,
    render: createActions({
      showButton: {},
      editButton: {},
      deleteButton: {},
    }),
  },
];
