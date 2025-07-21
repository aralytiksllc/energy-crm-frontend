import React from 'react';
import { Card, List, Typography } from 'antd';
import { cx } from '@emotion/css';
import { useScrollableListCardStyles } from './scrollable-list-card.styles';

const { Text } = Typography;

interface ListItem {
  id: string | number;
  title: string;
  subtitle?: string;
  tag?: {
    text: string;
    color: string;
  };
  rightContent?: React.ReactNode;
}

interface ScrollableListCardProps {
  title: string;
  data: ListItem[];
  height?: number;
  emptyMessage?: string;
}

export const ScrollableListCard: React.FC<ScrollableListCardProps> = ({
  title,
  data,
  emptyMessage = 'No data available',
}) => {
  const { styles } = useScrollableListCardStyles();

  return (
    <Card title={title} className={styles.cardContainer}>
      <div className={styles.contentContainer}>
        {data.length > 0 ? (
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <div className={styles.itemContainer}>
                  <div className={styles.itemContent}>
                    <div>
                      <Text strong>{item.title}</Text>
                      {item.subtitle && (
                        <>
                          <br />
                          <Text type="secondary" className={styles.subtitle}>
                            {item.subtitle}
                          </Text>
                        </>
                      )}
                    </div>
                    <div className={styles.tagContainer}>
                      {item.tag && (
                        <Text
                          className={cx(styles.tag, styles.tagWithColor)}
                          style={{ backgroundColor: item.tag.color }}
                        >
                          {item.tag.text}
                        </Text>
                      )}
                      {item.rightContent}
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <div className={styles.emptyContainer}>
            <Text type="secondary">{emptyMessage}</Text>
          </div>
        )}
      </div>
    </Card>
  );
};
