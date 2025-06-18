import React from 'react';
import { Button } from 'antd';
import { Item } from '../types/kanban';

interface AddCardButtonProps {
  columnId: string;
  items: Item[];
  onAddClick: (column: { id: string }) => void;
  className?: string;
}

export const AddCardButton: React.FC<AddCardButtonProps> = ({
  columnId,
  items,
  onAddClick,
  className,
}) => {
  if (items.length === 0) {
    return (
      <Button
        type="primary"
        block
        className={className}
        onClick={() => onAddClick({ id: columnId })}
      >
        + Add new card
      </Button>
    );
  }
  return null;
};
