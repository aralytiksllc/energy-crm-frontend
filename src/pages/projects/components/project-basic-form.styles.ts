import { createStyles } from 'antd-style';

export const useProjectBasicFormStyles = createStyles(({ token }) => ({
  container: {
    padding: '24px',
    width: '100%',
  },

  formGrid: {
    display: 'grid',
    gap: '16px',
    width: '100%',
  },

  // Full width fields
  fullWidthField: {
    gridColumn: '1 / -1',
  },

  // Two column fields
  twoColumnRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    gridColumn: '1 / -1',
  },

  // Single column in two column row
  halfWidthField: {
    margin: 0,
  },

  // Form items
  formItem: {
    marginBottom: '16px',

    '.ant-form-item-label > label': {
      fontWeight: 500,
      color: token.colorTextHeading,
      fontSize: '14px',
    },
  },

  // Input styling
  input: {
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '14px',

    '&:focus': {
      boxShadow: `0 0 0 2px ${token.colorPrimary}20`,
    },
  },

  textArea: {
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '14px',
    minHeight: '80px',
    resize: 'vertical',

    '&:focus': {
      boxShadow: `0 0 0 2px ${token.colorPrimary}20`,
    },
  },

  select: {
    borderRadius: '6px',

    '.ant-select-selector': {
      borderRadius: '6px !important',
      padding: '6px 12px !important',
      fontSize: '14px',
    },

    '&.ant-select-focused .ant-select-selector': {
      boxShadow: `0 0 0 2px ${token.colorPrimary}20 !important`,
    },
  },

  datePicker: {
    width: '100%',
    borderRadius: '6px',

    '.ant-picker-input input': {
      fontSize: '14px',
    },

    '&.ant-picker-focused': {
      boxShadow: `0 0 0 2px ${token.colorPrimary}20`,
    },
  },

  inputNumber: {
    width: '100%',
    borderRadius: '6px',

    '.ant-input-number-input': {
      fontSize: '14px',
    },

    '&.ant-input-number-focused': {
      boxShadow: `0 0 0 2px ${token.colorPrimary}20`,
    },
  },

  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 0',
  },

  switchLabel: {
    fontSize: '14px',
    color: token.colorText,
    margin: 0,
  },
}));
