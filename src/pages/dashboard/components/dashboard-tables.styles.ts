import { createStyles } from 'antd-style';
import { DASHBOARD_TABLES_CONSTANTS } from '../constants/dashboard-tables.constants';

export const useDashboardTablesStyles = createStyles(() => ({
  container: {
    '.ant-row': {
      margin: 0,
    },
  },
  card: {
    borderRadius: DASHBOARD_TABLES_CONSTANTS.STYLES.CARD_BORDER_RADIUS,
    boxShadow: DASHBOARD_TABLES_CONSTANTS.STYLES.CARD_SHADOW,
    border: `1px solid ${DASHBOARD_TABLES_CONSTANTS.COLORS.BORDER}`,
    '.ant-card-body': {
      padding: DASHBOARD_TABLES_CONSTANTS.SPACING.CARD_PADDING,
    },
  },
  cardHeader: {
    marginBottom: DASHBOARD_TABLES_CONSTANTS.SPACING.SECTION_MARGIN,
  },
  cardTitle: {
    margin: 0,
    color: DASHBOARD_TABLES_CONSTANTS.COLORS.TEXT_PRIMARY,
  },
  cardDescription: {
    color: DASHBOARD_TABLES_CONSTANTS.COLORS.TEXT_SECONDARY,
    fontSize: DASHBOARD_TABLES_CONSTANTS.TYPOGRAPHY.DESCRIPTION_FONT_SIZE,
  },
  avatar: {
    backgroundColor: DASHBOARD_TABLES_CONSTANTS.COLORS.PRIMARY,
    fontSize: DASHBOARD_TABLES_CONSTANTS.TYPOGRAPHY.AVATAR_FONT_SIZE,
    fontWeight: 'bold',
  },
  leadName: {
    color: DASHBOARD_TABLES_CONSTANTS.COLORS.TEXT_PRIMARY,
  },
  leadSource: {
    color: DASHBOARD_TABLES_CONSTANTS.COLORS.TEXT_SECONDARY,
  },
  leadDate: {
    color: DASHBOARD_TABLES_CONSTANTS.COLORS.TEXT_SECONDARY,
    fontSize: DASHBOARD_TABLES_CONSTANTS.TYPOGRAPHY.SECONDARY_FONT_SIZE,
  },
  statusTag: {
    borderRadius: DASHBOARD_TABLES_CONSTANTS.STYLES.TAG_BORDER_RADIUS,
    fontSize: DASHBOARD_TABLES_CONSTANTS.TYPOGRAPHY.TAG_FONT_SIZE,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  taskName: {
    color: DASHBOARD_TABLES_CONSTANTS.COLORS.TEXT_PRIMARY,
    display: 'block',
  },
  taskDate: {
    color: DASHBOARD_TABLES_CONSTANTS.COLORS.TEXT_SECONDARY,
    fontSize: DASHBOARD_TABLES_CONSTANTS.TYPOGRAPHY.SECONDARY_FONT_SIZE,
  },
  taskPriority: {
    color: DASHBOARD_TABLES_CONSTANTS.COLORS.TEXT_SECONDARY,
    fontSize: DASHBOARD_TABLES_CONSTANTS.TYPOGRAPHY.SECONDARY_FONT_SIZE,
    display: 'block',
  },
  taskItem: {
    padding: DASHBOARD_TABLES_CONSTANTS.SPACING.ITEM_PADDING,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskItemBorder: {
    borderBottom: `1px solid ${DASHBOARD_TABLES_CONSTANTS.COLORS.BORDER_LIGHT}`,
  },
  taskItemRight: {
    textAlign: 'right',
  },
  taskItemLeft: {
    flex: 1,
  },
  emptyState: {
    textAlign: 'center',
    padding: DASHBOARD_TABLES_CONSTANTS.SPACING.EMPTY_PADDING,
    color: DASHBOARD_TABLES_CONSTANTS.COLORS.TEXT_SECONDARY,
  },
  calendarIcon: {
    color: DASHBOARD_TABLES_CONSTANTS.COLORS.TEXT_SECONDARY,
    fontSize: DASHBOARD_TABLES_CONSTANTS.TYPOGRAPHY.SECONDARY_FONT_SIZE,
  },
  taskTag: {
    borderRadius: DASHBOARD_TABLES_CONSTANTS.STYLES.TAG_BORDER_RADIUS,
    fontSize: DASHBOARD_TABLES_CONSTANTS.TYPOGRAPHY.TAG_FONT_SIZE,
    fontWeight: 'bold',
    marginTop: 4,
  },
  taskDateContainer: {
    marginTop: 4,
  },
}));
