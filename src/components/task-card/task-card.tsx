import React, { useState } from 'react';
import { TaskCardView } from './task-card-view';
import { TaskCardEdit } from './task-card-edit';
import type { TaskCardProps } from './task-card.types';

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  users = [],
  onUpdate,
  onClick,
  disabled = false,
  loading = false,
  className,
  style,
  editMode: controlledEditMode,
  onEditModeChange,
}) => {
  const [internalEditMode, setInternalEditMode] = useState(false);
  const [editingField, setEditingField] = useState<keyof typeof task | null>(
    null,
  );

  const editMode = controlledEditMode ?? internalEditMode;

  const handleEditModeChange = (newEditMode: boolean) => {
    if (onEditModeChange) {
      onEditModeChange(newEditMode);
    } else {
      setInternalEditMode(newEditMode);
    }

    if (!newEditMode) {
      setEditingField(null);
    }
  };

  const handleEdit = () => {
    handleEditModeChange(true);
  };

  const handleFieldEdit = (field: keyof typeof task) => {
    setEditingField(field);
    handleEditModeChange(true);
  };

  const handleSave = (updatedTask: Partial<typeof task>) => {
    if (onUpdate) {
      onUpdate(updatedTask);
    }
    handleEditModeChange(false);
  };

  const handleCancel = () => {
    handleEditModeChange(false);
  };

  const handleCardClick = () => {
    if (onClick && !editMode) {
      onClick();
    }
  };

  if (editMode) {
    return (
      <TaskCardEdit
        task={task}
        users={users}
        onSave={handleSave}
        onCancel={handleCancel}
        disabled={disabled}
        loading={loading}
        editingField={editingField}
        className={className}
        style={style}
      />
    );
  }

  return (
    <div onClick={handleCardClick}>
      <TaskCardView
        task={task}
        onEdit={handleEdit}
        onFieldEdit={handleFieldEdit}
        disabled={disabled}
        className={className}
        style={style}
      />
    </div>
  );
};
