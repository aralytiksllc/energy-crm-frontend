import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Modal, Input, DatePicker, Select, Form } from 'antd';
import { DragEndEvent } from '@dnd-kit/core';
import { projectStages } from './constants/projects';
import { defaultContainers, mockUser } from './constants/kanban';
import { KanbanBoard } from '../../components/kanban/kanban-board';
import { KanbanColumn } from '../../components/kanban/column';
import { KanbanItem } from '../../components/kanban/kanban-item';
import { ProjectCardMemo } from '../../components/kanban/card';
import { Container, Item } from './types/kanban';
import { TaskType } from '../tasks';
import dayjs, { Dayjs } from 'dayjs';
import { DayjsForm } from '../../helpers/dayjs-form/dayjs-form';
import {
  getInitialContainers,
  handleDeleteCard,
} from './utils/kanbanDndHandlers';
import { AddCardButton } from './components/AddCardButton';
import styles from './styles/kanbanColumn.module.css';
import { rules } from './constants/validation';

const { Option } = Select;

type CardFormValues = {
  title: string;
  description?: string;
  dueDate?: Dayjs | null;
  users?: number[];
};

function handleDragEndFn(
  containers: Container[],
  setContainers: React.Dispatch<React.SetStateAction<Container[]>>,
) {
  return (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeContainer = containers.find((container) =>
      container.items.find((item) => item.id === active.id),
    );
    const overContainer = containers.find(
      (container) =>
        container.items.find((item) => item.id === over.id) ||
        container.id === over.id,
    );
    if (!activeContainer || !overContainer) return;
    if (activeContainer.id === overContainer.id) return;
    setContainers((prev) => {
      const activeItems = [...activeContainer.items];
      const overItems = [...overContainer.items];
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id,
      );
      const [removed] = activeItems.splice(activeIndex, 1);
      const overIndex = overItems.findIndex((item) => item.id === over.id);
      if (overIndex >= 0) {
        overItems.splice(overIndex, 0, removed);
      } else {
        overItems.push(removed);
      }
      return prev.map((container) => {
        if (container.id === activeContainer.id) {
          return {
            ...container,
            items: activeItems,
          };
        }
        if (container.id === overContainer.id) {
          return {
            ...container,
            items: overItems,
          };
        }
        return container;
      });
    });
  };
}

export default function MultipleContainers() {
  const { id } = useParams();
  const projectId = Number(id);
  const stages = projectStages[String(projectId)] || [];
  const containersForProject = defaultContainers.filter(
    (container) => container.projectId === projectId,
  );
  const [containers, setContainers] = useState<Container[]>(
    getInitialContainers(projectId, stages, containersForProject),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<Item | null>(null);
  const [form] = Form.useForm<CardFormValues>();

  const onAddClick = (column: { id: string }) => {
    setModalMode('add');
    setActiveColumnId(column.id);
    setActiveCard(null);
    form.resetFields();
    setModalVisible(true);
  };

  const onEditCard = (id: string) => {
    const found = containers
      .flatMap((c) => c.items)
      .find((item) => item.id === id);
    if (!found) return;
    setModalMode('edit');
    setActiveCard(found);
    setActiveColumnId(null);
    form.setFieldsValue({
      title: found.content,
      description: found.description,
      dueDate: found.task.dueDate ? dayjs(found.task.dueDate) : undefined,
      users: found.task.assignedTo.map((u) => u.id),
    });
    setModalVisible(true);
  };

  const onDeleteCard = (id: string) => handleDeleteCard(id, setContainers);
  const onDragEnd = handleDragEndFn(containers, setContainers);

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (modalMode === 'add' && activeColumnId) {
        setContainers((prev) =>
          prev.map((container) => {
            if (container.id === activeColumnId) {
              const newId = `${activeColumnId}-${Date.now()}`;
              const newItem: Item = {
                id: newId,
                content: values.title,
                description: values.description || '',
                task: {
                  id: Date.now(),
                  title: values.title,
                  type: TaskType.OTHER,
                  isCompleted: false,
                  description: values.description || '',
                  dueDate: values.dueDate
                    ? values.dueDate.toDate()
                    : new Date(),
                  project: { id: projectId, name: '' },
                  assignedTo: [],
                  createdBy: mockUser,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              };
              return {
                ...container,
                items: [newItem, ...container.items],
              };
            }
            return container;
          }),
        );
      } else if (modalMode === 'edit' && activeCard) {
        setContainers((prev) =>
          prev.map((container) => ({
            ...container,
            items: container.items.map((item) =>
              item.id === activeCard.id
                ? {
                    ...item,
                    content: values.title,
                    description: values.description || '',
                    task: {
                      ...item.task,
                      title: values.title,
                      description: values.description || '',
                      dueDate: values.dueDate
                        ? values.dueDate.toDate()
                        : item.task.dueDate,
                      assignedTo: values.users
                        ? values.users.map((id: number) => ({
                            id,
                            name: `User ${id}`,
                          }))
                        : item.task.assignedTo,
                    },
                  }
                : item,
            ),
          })),
        );
      }
      setModalVisible(false);
    });
  };

  const handleModalCancel = () => setModalVisible(false);

  return (
    <>
      <KanbanBoard onDragEnd={onDragEnd}>
        {containers.map((container) => (
          <KanbanColumn
            key={container.id}
            id={container.id}
            title={container.title}
            count={container.items.length}
            onAddClick={onAddClick}
          >
            {container.items.map((item: Item) => (
              <KanbanItem key={item.id} id={item.id}>
                <ProjectCardMemo
                  id={item.id}
                  title={item.content}
                  description={item.description}
                  dueDate={
                    item.task?.dueDate
                      ? item.task.dueDate.toISOString()
                      : undefined
                  }
                  users={item.task?.assignedTo?.map((user) => ({
                    id: user.id.toString(),
                    name: user.name,
                    avatarUrl: user.avatar,
                  }))}
                  onEdit={onEditCard}
                  onDelete={onDeleteCard}
                />
              </KanbanItem>
            ))}
            <AddCardButton
              columnId={container.id}
              items={container.items}
              onAddClick={onAddClick}
              className={styles.addCardBtn}
            />
          </KanbanColumn>
        ))}
      </KanbanBoard>
      <Modal
        open={modalVisible}
        title={modalMode === 'add' ? 'Add new card' : 'Edit card'}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        okText={modalMode === 'add' ? 'Save' : 'Update'}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={rules.title}>
            <Input placeholder="Enter card title" />
          </Form.Item>
          {modalMode === 'edit' && (
            <>
              <Form.Item name="description" label="Description">
                <Input.TextArea placeholder="Enter description" />
              </Form.Item>
              <Form.Item
                name="dueDate"
                label="Due Date"
                getValueProps={DayjsForm.getValueProps}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="users" label="Assign to users">
                <Select mode="multiple" placeholder="Select users">
                  <Option value={mockUser.id}>{mockUser.name}</Option>
                </Select>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
}
