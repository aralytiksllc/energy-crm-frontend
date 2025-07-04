import { createStyles as createAntdStyles } from 'antd-style';

export const createStyles = createAntdStyles(({ token }) => ({
  avatar: {
    fontSize: '8px',
    lineHeight: '16px',
    minWidth: '16px',
    minHeight: '16px',
    borderRadius: '50%',
  },
  planningContainer: {
    padding: token.paddingLG,
    backgroundColor: token.colorBgLayout,
    minHeight: '100vh',
  },

  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: token.marginLG,
    backgroundColor: token.colorBgContainer,
    padding: `${token.paddingMD}px ${token.paddingLG}px`,
    borderRadius: token.borderRadius,
    boxShadow: token.boxShadowTertiary,
  },

  pageTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: token.marginSM,
    margin: 0,
    color: token.colorText,
    fontWeight: 600,
  },

  filtersContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: token.marginMD,
    marginBottom: token.marginLG,
    padding: `${token.paddingMD}px ${token.paddingLG}px`,
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadius,
    boxShadow: token.boxShadowTertiary,
  },

  filterItem: {
    minWidth: '200px',
  },

  calendarWrapper: {
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadius,
    boxShadow: token.boxShadowTertiary,
    overflow: 'hidden',
  },

  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: token.marginLG,
  },

  drawerTitle: {
    margin: 0,
    color: token.colorText,
    fontWeight: 600,
  },

  assignmentCard: {
    marginBottom: token.marginMD,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    overflow: 'hidden',

    '&:hover': {
      boxShadow: token.boxShadowSecondary,
      borderColor: token.colorPrimary,
    },
  },

  assignmentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: token.marginSM,
    marginBottom: token.marginSM,
  },

  assignmentContent: {
    padding: token.paddingMD,
  },

  assignmentMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: token.marginSM,
    marginTop: token.marginSM,
  },

  assignmentTags: {
    display: 'flex',
    gap: token.marginXS,
    marginTop: token.marginSM,
  },

  createButton: {
    borderRadius: token.borderRadius,
    fontWeight: 500,
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: token.marginXS,
  },

  deleteButton: {
    borderRadius: token.borderRadius,
    fontWeight: 500,
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: token.marginXS,
  },

  emptyState: {
    textAlign: 'center',
    padding: `${token.paddingXL}px ${token.paddingLG}px`,
    color: token.colorTextSecondary,
  },

  formDrawer: {
    '& .ant-drawer-content': {
      backgroundColor: token.colorBgLayout,
    },

    '& .ant-drawer-body': {
      padding: 0,
    },
  },

  formContainer: {
    padding: token.paddingLG,
    backgroundColor: token.colorBgContainer,
    height: '100%',
  },

  formTitle: {
    marginBottom: token.marginLG,
    color: token.colorText,
    fontWeight: 600,
    borderBottom: `1px solid ${token.colorBorder}`,
    paddingBottom: token.paddingSM,
  },

  formActions: {
    display: 'flex',
    gap: token.marginSM,
    justifyContent: 'flex-end',
    marginTop: token.marginLG,
    paddingTop: token.paddingMD,
    borderTop: `1px solid ${token.colorBorder}`,
  },
}));
