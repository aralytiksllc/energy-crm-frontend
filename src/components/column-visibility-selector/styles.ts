import { createStyles } from 'antd-style';

export const useColumnVisibilitySelectorStyles = createStyles(({ token }) => ({
  dropdownContainer: {
    backgroundColor: 'white',
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  },

  dropdownHeader: {
    padding: token.paddingXS,
    borderBottom: `1px solid ${token.colorBorder}`,
  },

  selectAllContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: token.paddingXS,
    padding: `${token.paddingXXS}px 0`,
  },

  optionsContainer: {
    maxHeight: '200px',
    overflowY: 'auto' as const,
  },

  optionItem: {
    padding: `${token.paddingXS}px ${token.paddingSM}px`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: token.paddingXS,
    transition: `background-color ${token.motionDurationSlow}`,

    '&:hover': {
      backgroundColor: token.colorFillTertiary,
    },
  },

  button: {
    minWidth: 150,
  },
}));
