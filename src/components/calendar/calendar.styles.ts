import { createStyles as createAntdStyles, css } from 'antd-style';

export const useCalendarStyles = createAntdStyles(
  ({ token, css }, props: { minHeight: number }) => {
    return {
      calendarWrapper: css`
        min-height: ${props.minHeight}px;
      `,
      calendarContainer: css`
        background-color: ${token.colorBgContainer};
        border-radius: ${token.borderRadius}px;
        overflow: visible;
        position: relative;
        min-height: auto;

        & * {
          scrollbar-width: none;
          -ms-overflow-style: none;

          &::-webkit-scrollbar {
            display: none;
          }
        }

        & .ant-picker-calendar {
          background-color: ${token.colorBgContainer};
          border: none;
          border-radius: 0;
          overflow: visible;
          position: relative;
          height: auto;
        }

        & .ant-picker-calendar-header {
          padding: ${token.paddingMD}px ${token.paddingLG}px;
          border-bottom: 1px solid ${token.colorBorder};
          background-color: ${token.colorBgContainer};
          z-index: 20;
        }

        & .ant-picker-calendar-date {
          border: 1px solid ${token.colorBorderSecondary};
          border-radius: 0;
          margin: 0;
          min-height: 250px;
          height: auto;
          padding: 4px;
          background-color: ${token.colorBgContainer};
          position: relative;
          overflow: visible;
          z-index: 15;
          vertical-align: top;

          &:hover {
            background-color: ${token.colorBgTextHover};
            cursor: pointer;
            z-index: 16;
          }

          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 1px solid ${token.colorBorderSecondary};
            border-radius: 0;
            pointer-events: none;
            z-index: 12;
          }
        }

        & .ant-picker-calendar-date-today {
          border-color: ${token.colorPrimary};
          background-color: ${token.colorPrimary}08;

          &:hover {
            background-color: ${token.colorPrimary}15;
          }

          &::after {
            border-color: ${token.colorPrimary};
          }
        }

        & .ant-picker-calendar-date-selected {
          background-color: ${token.colorPrimaryBg};
          border-color: ${token.colorPrimary};

          &::after {
            border-color: ${token.colorPrimary};
          }
        }

        & .ant-picker-calendar-header th {
          background-color: ${token.colorBgContainer};
          border-bottom: 1px solid ${token.colorBorder};
          color: ${token.colorTextSecondary};
          font-weight: 500;
          padding: 12px 8px;
          text-align: center;
          z-index: 20;
        }

        & .ant-picker-calendar-date-content {
          height: auto;
          min-height: 200px;
          overflow: visible;
          position: relative;
          z-index: 13;
        }

        & .ant-picker-calendar-tbody > tr > td {
          position: relative;
          height: auto;
          vertical-align: top;
        }

        & .ant-picker-calendar-tbody > tr {
          height: auto;
        }

        & .ant-picker-calendar-tbody {
          height: auto;
        }

        & .ant-picker-calendar table {
          height: auto;
        }
      `,
      calendarHeader: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${token.paddingSM}px ${token.paddingMD}px;
        background-color: ${token.colorBgContainer};
        border-bottom: 1px solid ${token.colorBorder};
      `,
      calendarCell: css`
        height: auto;
        min-height: 180px;
        padding: 4px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        cursor: pointer;
        position: relative;
        overflow: visible;
        z-index: 13;

        &:hover {
          background-color: transparent;
        }
      `,
      singleDayAssignmentsContainer: css``,
      priorityIndicator: css`
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-left: auto;
      `,
      statusIndicator: css`
        width: 4px;
        height: 4px;
        border-radius: 50%;
        margin-left: auto;
        flex-shrink: 0;
      `,
      assignmentText: css`
        text-decoration: none;
      `,
      cancelledText: css`
        text-decoration: line-through;
      `,
      spanningAssignmentText: css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `,
      assignmentItem: css`
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: 6px;
        background-color: ${token.colorBgContainer};
        border: 1px solid ${token.colorBorderSecondary};
        margin-bottom: 2px;
        font-size: 11px;
        min-height: 22px;
        position: relative;
        z-index: 14;

        &:hover {
          background-color: ${token.colorPrimaryBg};
          border-color: ${token.colorPrimary};
          z-index: 17;
        }
      `,
      spanningAssignmentItem: css`
        position: absolute;
        top: 4px;
        left: 4px;
        right: -1px;
        height: 20px;
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 1px 4px;
        border-radius: 6px;
        background-color: ${token.colorPrimaryBg};
        border: 1px solid ${token.colorPrimary};
        font-size: 10px;
        font-weight: 500;
        z-index: 5;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

        &.assignment-start {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }

        &.assignment-middle {
          border-radius: 2px;
          border-left: none;
        }

        &.assignment-end {
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
          border-top-right-radius: 9px;
          border-bottom-right-radius: 9px;
          border-left: none;
          right: 4px;
        }
      `,
      loadingOverlay: css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 30;
      `,
      avatar: css`
        font-size: 8px;
        line-height: 16px;
        min-width: 16px;
        min-height: 16px;
        border-radius: 50%;
      `,
    };
  },
);

export const getSpanningAssignmentItemStyles = (
  userColor: string,
  textColor: string,
  opacity: number,
) => css`
  background-color: ${userColor};
  border-color: ${userColor};
  color: ${textColor};
  opacity: ${opacity};
`;

export const getAvatarStyles = (userColor: string, textColor: string) => css`
  background-color: ${userColor};
  color: ${textColor};
`;

export const getPriorityIndicatorStyles = (color: string) => css`
  background-color: ${color};
`;

export const getStatusIndicatorStyles = (color: string) => css`
  background-color: ${color};
`;

export const getSingleDayContainerStyles = (marginTop: number) => css`
  margin-top: ${marginTop}px;
`;

export const getAssignmentItemStyles = (
  userColor: string,
  textColor: string,
  priorityColor: string,
  opacity: number,
) => css`
  background-color: ${userColor};
  border-color: ${userColor};
  border-left-width: 3px;
  border-left-color: ${priorityColor};
  color: ${textColor};
  opacity: ${opacity};
`;

export const getCancelledTextStyles = (color: string) => css`
  color: ${color};
`;
