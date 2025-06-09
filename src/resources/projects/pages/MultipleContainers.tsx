import React, { useState, useCallback } from 'react';
import { Typography } from 'antd';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Item, Container, MultipleContainersProps } from '../types/kanban';
import SortableItem from '../components/SortableItem';
import DroppableColumn from '../components/DroppableColumn';
import styles from './kanbanBoard.module.css';
import { defaultContainers } from '../constants/kanban';
import { ProjectCard } from '../components/ProjectCard';
import {
  handleDragStart,
  handleDragOver,
  handleDragEnd,
} from '../utils/kanbanDndHandlers';

const { Title } = Typography;

export default function MultipleContainers({
  itemCount,
  projects,
}: MultipleContainersProps) {
  const base =
    projects && Array.isArray(projects) ? projects : defaultContainers;
  const containersWithItemCount =
    typeof itemCount === 'number'
      ? base.map((container) => ({
          ...container,
          items: container.items.slice(0, itemCount),
        }))
      : base;

  const [containers, setContainers] = useState<Container[]>(
    containersWithItemCount,
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overColumnId, setOverColumnId] = useState<UniqueIdentifier | null>(
    null,
  );
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragStart = useCallback(
    (event: DragStartEvent) =>
      handleDragStart(event, containers, setActiveId, setActiveItem),
    [containers],
  );
  const onDragOver = useCallback(
    (event: DragOverEvent) =>
      handleDragOver(event, containers, setContainers, setOverColumnId),
    [containers],
  );
  const onDragEnd = useCallback(
    (event: DragEndEvent) =>
      handleDragEnd(
        event,
        containers,
        setContainers,
        setActiveId,
        setOverColumnId,
        setActiveItem,
      ),
    [containers],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className={styles['kanban-board']}>
        {containers.map((container) => {
          if (container.items.length === 0) {
            return (
              <DroppableColumn
                key={container.id}
                id={container.id}
                isOver={overColumnId === container.id}
              >
                <div className={styles['kanban-column__header']}>
                  <Title level={5} style={{ margin: 0, fontSize: 15 }}>
                    {container.title}
                  </Title>
                </div>
              </DroppableColumn>
            );
          }
          return (
            <SortableContext
              key={container.id}
              items={container.items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className={styles['kanban-column']}>
                <div className={styles['kanban-column__header']}>
                  <Title level={5} style={{ margin: 0, fontSize: 15 }}>
                    {container.title}
                  </Title>
                </div>
                <div className={styles['kanban-column__body']}>
                  {container.items.map((item) => (
                    <SortableItem
                      key={item.id}
                      id={item.id}
                      content={item.content}
                      description={item.description}
                      extra={item.extra}
                      isDragging={activeId === item.id}
                    />
                  ))}
                </div>
              </div>
            </SortableContext>
          );
        })}
      </div>
      <DragOverlay>
        {activeItem ? (
          <ProjectCard
            title={activeItem.content}
            description={activeItem.description}
            extra={activeItem.extra}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
