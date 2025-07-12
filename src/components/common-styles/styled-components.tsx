import React from 'react';
import { Space, Typography, Row, Col, Tag } from 'antd';
import { useCommonStyles } from './common-styles';
import { COLORS, FONT_SIZES } from '../../styles/constants';

const { Text, Title } = Typography;

export const StyledSpace: React.FC<{
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  size?: number;
  className?: string;
}> = ({ children, direction = 'vertical', size = 8, className }) => {
  const { styles, cx } = useCommonStyles();

  return (
    <Space
      direction={direction}
      size={size}
      className={cx(styles.fullWidth, className)}
    >
      {children}
    </Space>
  );
};

export const SecondaryText: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { styles, cx } = useCommonStyles();

  return (
    <Text className={cx(styles.textSecondary, className)}>{children}</Text>
  );
};

export const SmallText: React.FC<{
  children: React.ReactNode;
  color?: string;
  className?: string;
}> = ({ children, color = COLORS.text.secondary, className }) => {
  const { styles, cx } = useCommonStyles();

  return (
    <Text className={cx(styles.textSmall, className)} style={{ color }}>
      {children}
    </Text>
  );
};

export const NoMarginTitle: React.FC<{
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
  className?: string;
}> = ({ children, level = 4, className }) => {
  const { styles, cx } = useCommonStyles();

  return (
    <Title level={level} className={cx(styles.noMargin, className)}>
      {children}
    </Title>
  );
};

export const SpacedRow: React.FC<{
  children: React.ReactNode;
  gutter?: number | [number, number];
  className?: string;
}> = ({ children, gutter = 24, className }) => {
  const { styles, cx } = useCommonStyles();

  return (
    <Row gutter={gutter} className={cx(styles.marginBottom, className)}>
      {children}
    </Row>
  );
};

export const FullWidthCol: React.FC<{
  children: React.ReactNode;
  span?: number;
  className?: string;
}> = ({ children, span = 24, className }) => {
  const { styles, cx } = useCommonStyles();

  return (
    <Col span={span} className={cx(styles.fullWidth, className)}>
      {children}
    </Col>
  );
};

export const SmallTag: React.FC<{
  children: React.ReactNode;
  color?: string;
  className?: string;
}> = ({ children, color = 'default', className }) => {
  const { styles, cx } = useCommonStyles();

  return (
    <Tag color={color} className={cx(styles.tagSmall, className)}>
      {children}
    </Tag>
  );
};

export const FlexBetween: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { styles, cx } = useCommonStyles();

  return <div className={cx(styles.flexBetween, className)}>{children}</div>;
};

export const FlexCenter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { styles, cx } = useCommonStyles();

  return <div className={cx(styles.flexCenter, className)}>{children}</div>;
};
