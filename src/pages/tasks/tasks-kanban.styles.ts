import { createStyles } from 'antd-style';

export const useTasksKanbanStyles = createStyles(() => ({
  pageContainer: {
    height: '85vh',
  },
  viewModalFooter: {
    justifyContent: 'space-between',
    width: '100%',
  },
  editTag: {
    cursor: 'pointer',
  },
  deleteTag: {
    cursor: 'pointer',
  },
  skeletonContainer: {
    height: '85vh',
  },
  skeletonCard: {
    height: '80px',
    background: '#f0f0f0',
    borderRadius: '8px',
    marginBottom: '8px',
  },
  viewModalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  viewModalBody: {
    padding: 16,
  },
  modalRow: {
    marginBottom: 16,
  },
  modalColumn: {
    width: '100%',
  },
  modalSectionText: {
    color: '#8c8c8c',
    fontSize: 13,
  },
  modalDivider: {
    margin: '16px 0',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionContent: {
    background: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    fontSize: 15,
  },
  assigneeHeader: {
    marginBottom: 8,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assigneeTitle: {
    margin: 0,
  },
  assigneeHours: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  assigneeCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    border: '1px solid #f0f0f0',
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  assigneeAvatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: '#1890ff',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  assigneeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  assigneeEmail: {
    fontSize: 12,
    color: '#888',
  },
  assigneeHoursContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  tagSmall: {
    fontSize: 12,
    padding: '3px 10px',
    fontWeight: 500,
  },
  actualHoursInput: {
    width: 100,
  },
  viewModalHeaderActions: {
    marginRight: '30px',
  },
}));
