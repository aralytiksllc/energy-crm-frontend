import React, { useCallback } from 'react';
import { useModalForm } from '@refinedev/antd';
import { Modal } from 'antd';

import { KanbanBoard, KanbanBoardContainer } from './kanban/board';
import { KanbanCard } from './kanban/card';
import { KanbanColumn } from './kanban/column';
import { KanbanItem } from './kanban/item';
import { KanbanAddCardButton } from './components/kanban-add-card-button';
import { TaskForm } from './components/task-form';
import { TaskViewModal } from './components/task-view-modal';

import { useTasksKanbanStyles } from './tasks-kanban.styles';
import { useTasksKanban } from './hooks/use-tasks-kanban';
import { useTaskViewModal } from './hooks/use-task-view-modal';
import { PageSkeleton } from './components/page-skeleton';

export const TasksKanban: React.FC = () => {
  const { styles } = useTasksKanbanStyles();
  const {
    sections,
    isLoading,
    users,
    projects,
    projectsLoading,
    canEditTasks,
    canCreateTasks,
    handleDragEnd,
    handleDeleteCard,
    transformTaskValues,
    updateAssignee,
    refetch,
  } = useTasksKanban();

  const {
    isViewModalVisible,
    selectedTask,
    actualHours,
    canEdit,
    canDelete,
    handleCardClick,
    handleCloseModal,
    handleActualHoursChange,
    handleSaveActualHours,
  } = useTaskViewModal(updateAssignee, refetch);

  const createModalFormProps = useModalForm({
    resource: 'tasks',
    action: 'create',
    syncWithLocation: true,
  });

  const editModalFormProps = useModalForm({
    resource: 'tasks',
    action: 'edit',
    syncWithLocation: true,
  });

  const createModalProps = {
    ...createModalFormProps.modalProps,
    form: createModalFormProps.formProps.form,
    onFinish: (values: any) => {
      const transformed = transformTaskValues(values);
      createModalFormProps.formProps.onFinish?.(transformed);
    },
  };

  const editModalProps = {
    ...editModalFormProps.modalProps,
    form: editModalFormProps.formProps.form,
    onFinish: (values: any) => {
      const transformed = transformTaskValues(values);
      editModalFormProps.formProps.onFinish?.(transformed);
    },
  };

  const handleAddCard = useCallback(
    (args: { id: string }) => {
      createModalFormProps.formProps.form?.setFieldsValue({ status: args.id });
      createModalFormProps.show();
    },
    [createModalFormProps],
  );

  const handleEditCard = useCallback(
    (taskId: string) => {
      editModalFormProps.show(taskId);
      handleCloseModal();
    },
    [editModalFormProps, handleCloseModal],
  );

  const handleDeleteCardFromModal = useCallback(
    (taskId: string) => {
      handleDeleteCard(taskId);
      handleCloseModal();
    },
    [handleDeleteCard, handleCloseModal],
  );

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className={styles.pageContainer}>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={canEditTasks ? handleDragEnd : () => void 0}>
          {sections.map((section) => (
            <KanbanColumn
              key={section.id}
              id={section.id}
              title={section.title}
              count={section.count}
              onAddClick={
                canCreateTasks
                  ? () => handleAddCard({ id: section.id })
                  : undefined
              }
            >
              {section.tasks.map((task: any) => (
                <KanbanItem
                  key={task.id}
                  id={task.id}
                  data={{ ...task, status: task.status || 'todo' }}
                >
                  <KanbanCard
                    task={task}
                    onClick={() => handleCardClick(task)}
                    onDelete={() => handleDeleteCard(task.id)}
                  />
                </KanbanItem>
              ))}
              {section.tasks.length === 0 && canCreateTasks && (
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ id: section.id })}
                />
              )}
            </KanbanColumn>
          ))}
        </KanbanBoard>
        {createModalFormProps.modalProps.open && (
          <Modal {...createModalProps}>
            <TaskForm
              formProps={{
                ...createModalFormProps.formProps,
                onFinish: createModalProps.onFinish,
              }}
              projects={projects}
              users={users}
              projectsLoading={projectsLoading}
            />
          </Modal>
        )}
        {editModalFormProps.modalProps.open && (
          <Modal {...editModalProps}>
            <TaskForm
              formProps={{
                ...editModalFormProps.formProps,
                onFinish: editModalProps.onFinish,
              }}
              projects={projects}
              users={users}
              projectsLoading={projectsLoading}
            />
          </Modal>
        )}
      </KanbanBoardContainer>
      <TaskViewModal
        isVisible={isViewModalVisible}
        selectedTask={selectedTask}
        canEdit={canEdit || false}
        canDelete={canDelete || false}
        actualHours={actualHours}
        onClose={handleCloseModal}
        onEdit={handleEditCard}
        onDelete={handleDeleteCardFromModal}
        onActualHoursChange={handleActualHoursChange}
        onSaveActualHours={handleSaveActualHours}
      />
    </div>
  );
};
