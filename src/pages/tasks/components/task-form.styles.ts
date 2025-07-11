import { createStyles } from 'antd-style';

export const useStyles = createStyles(() => ({
  form: {
    maxWidth: 1000,
  },

  formItem: {
    marginBottom: 24,
  },

  datePicker: {
    width: '100%',
  },
}));

export const useTaskFormStyles = createStyles(({ css }) => ({
  hiddenField: css`
    display: none;
  `,
  fullWidthDatePicker: css`
    width: 100%;
  `,
}));
