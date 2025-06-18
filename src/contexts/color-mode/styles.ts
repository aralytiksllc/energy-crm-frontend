import { createStyles } from 'antd-style';

export const useColorModeStyles = createStyles(({ css, token }) => ({
  light: css`
    :root {
      --color-bg-base: ${token.colorBgBase};
      --color-bg-container: ${token.colorBgContainer};
      --color-border: ${token.colorBorder};
      --color-text: ${token.colorText};

      --color-black: #000000;

      --color-card-bg: ${token.colorBgContainer};
      --color-card-border: #e0e0e0;
      --color-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      --color-column-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

      --color-text-primary: ${token.colorText};
      --color-text-secondary: #666;

      --color-primary: ${token.colorPrimary};
      --color-primary-hover: ${token.colorPrimaryHover};
      --color-primary-active: ${token.colorPrimaryActive};
      --color-plus-icon: #222;

      --color-success: ${token.colorSuccess};
      --color-warning: ${token.colorWarning};
      --color-error: ${token.colorError};
      --color-info: ${token.colorInfo};

      --color-badge-bg: #00b3a4;
      --color-badge-text: #fff;
      --color-avatar-orange: #f56a00;
      --color-avatar-orange-bg: #fde3cf;
      --color-avatar-blue: #1677ff;

      --border-radius: ${token.borderRadius}px;
    }
  `,

  dark: css`
    :root {
      --color-bg-base: #23232b;
      --color-bg-container: #292933;
      --color-border: #44444a;
      --color-text: #f4f4f4;

      --color-card-bg: #292933;
      --color-card-border: #44444a;
      --color-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      --color-column-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

      --color-text-primary: #f4f4f4;
      --color-text-secondary: #666;

      --color-primary: ${token.colorPrimary};
      --color-primary-hover: ${token.colorPrimaryHover};
      --color-primary-active: ${token.colorPrimaryActive};
      --color-plus-icon: #fff;

      --color-success: ${token.colorSuccess};
      --color-warning: ${token.colorWarning};
      --color-error: ${token.colorError};
      --color-info: ${token.colorInfo};

      --color-badge-bg: #00b3a4;
      --color-badge-text: #fff;
      --color-avatar-orange: #f56a00;
      --color-avatar-orange-bg: #fde3cf;
      --color-avatar-blue: #1677ff;

      --border-radius: ${token.borderRadius}px;
    }
  `,
}));
