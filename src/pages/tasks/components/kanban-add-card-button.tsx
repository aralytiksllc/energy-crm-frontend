import React from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useKanbanAddCardButtonStyles } from './kanban-add-card-button.styles';

interface Props {
  onClick: () => void;
}

export const KanbanAddCardButton = ({
  children,
  onClick,
}: React.PropsWithChildren<Props>) => {
  const { styles } = useKanbanAddCardButtonStyles();

  return (
    <Button
      size="large"
      icon={<PlusSquareOutlined className="md" />}
      className={styles.button}
      onClick={onClick}
    >
      {children ?? 'Add new card'}
    </Button>
  );
};
