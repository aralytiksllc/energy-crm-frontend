// External
import * as React from 'react';
import { Card, Tag, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';

// Internal
import { Avatar } from '@/components/avatar';
import { useStyles } from './customer-card.styles';
import type { CustomerItemProps } from './customer-card.types';

const { Text } = Typography;

export const CustomerCard: React.FC<CustomerItemProps> = React.memo((props) => {
  const { customer, isActive, onEdit } = props;

  const { styles, cx } = useStyles();

  const className = cx(styles.base, isActive && styles.active);

  const handleCardClick = React.useCallback(
    () => onEdit?.(customer.id),
    [customer.id, onEdit],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick();
      }
    },
    [handleCardClick],
  );

  return (
    <Card
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className={className}
      hoverable={true}
      tabIndex={0}
      role="button"
      size="small"
      type="inner"
    >
      <div className={styles.row}>
        <div className={styles.avatar}>
          <Avatar size={36} name={customer.companyName} />
        </div>

        <div className={styles.body}>
          <div className={styles.topRow}>
            <Text className={styles.company} strong ellipsis>
              {customer.companyName}
            </Text>
            <Tag className={styles.tag} color={'blue'}>
              {customer.companyStatus ?? '-'}
            </Tag>
          </div>
          <div className={styles.bottomRow}>
            <Text type="secondary" className={styles.business} ellipsis>
              {`Business No: ${customer.registrationNumber}`}
            </Text>
          </div>
        </div>

        <div className={styles.icon}>
          <RightOutlined />
        </div>
      </div>
    </Card>
  );
});
