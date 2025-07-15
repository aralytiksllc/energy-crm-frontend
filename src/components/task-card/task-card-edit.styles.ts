import { createStyles } from 'antd-style';

export const useTaskCardEditStyles = createStyles(({ css }) => ({
  card: css`
    .ant-card-body {
      padding: 16px;
    }
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  `,
  tag: css`
    margin: 0;
    cursor: pointer;
  `,
  title: css`
    margin: 0 0 8px 0;
    cursor: pointer;
    padding: 4px 0;
  `,
  description: css`
    margin: 0 0 16px 0;
    cursor: pointer;
    padding: 4px 0;
    min-height: 20px;
  `,
  descriptionEditor: css`
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    padding: 12px;
    min-height: 100px;
    background-color: #fff;
  `,
  editorToolbar: css`
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 8px;
    margin-bottom: 8px;
    display: flex;
    gap: 8px;
  `,
  toolbarDivider: css`
    border-left: 1px solid #d9d9d9;
    height: 20px;
    margin: 0 4px;
  `,
  textArea: css`
    resize: none;
  `,
  footer: css`
    width: 100%;
    justify-content: space-between;
  `,
  footerDivider: css`
    width: 1px;
    height: 16px;
    background-color: #f0f0f0;
  `,
  dateContainer: css`
    min-width: 150px;
  `,
  datePicker: css`
    width: 100%;
  `,
  dateDisplay: css`
    cursor: pointer;
    padding: 4px;
    border-radius: 4;
  `,
  dateIcon: css`
    color: #8c8c8c;
  `,
  dateText: css`
    color: #8c8c8c;
  `,
  assigneeContainer: css`
    min-width: 200px;
  `,
  assigneeDisplay: css`
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
  `,
  assigneeIcon: css`
    color: #8c8c8c;
  `,
  assigneeText: css`
    color: #8c8c8c;
    font-size: 12px;
  `,
  actionsContainer: css`
    margin-top: 16px;
    border-top: 1px solid #f0f0f0;
    padding-top: 12px;
  `,
  actionButtons: css`
    margin-top: 8px;
  `,
  typeSelect: css`
    width: 120px;
  `,
}));
