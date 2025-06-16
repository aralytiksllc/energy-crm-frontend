// External imports
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

// Internal imports
import { Item, Container } from '../types/kanban';

export function findContainer(
  itemId: UniqueIdentifier,
  containers: Container[],
): Container | undefined {
  return containers.find((container) =>
    container.items.some((item) => item.id === itemId),
  );
}

export function handleDragStart(
  event: DragStartEvent,
  containers: Container[],
  setActiveId: (id: UniqueIdentifier) => void,
  setActiveItem: (item: Item | null) => void,
) {
  setActiveId(event.active.id);
  const container = findContainer(event.active.id, containers);
  setActiveItem(
    container?.items.find((item) => item.id === event.active.id) || null,
  );
}

export function handleDragOver(
  event: DragOverEvent,
  containers: Container[],
  setContainers: (fn: (prev: Container[]) => Container[]) => void,
  setOverColumnId: (id: UniqueIdentifier | null) => void,
) {
  const { active, over } = event;
  if (!over) return;
  const overContainer =
    containers.find((container) => container.id === over.id) ||
    findContainer(over.id, containers);
  setOverColumnId(overContainer?.id || null);
  const activeContainer = findContainer(active.id, containers);
  if (!activeContainer || !overContainer || activeContainer === overContainer)
    return;

  if (overContainer.items.some((item) => item.id === active.id)) {
    return;
  }

  if (overContainer.items.length === 0 && activeContainer === overContainer) {
    return;
  }

  const activeIndex = activeContainer.items.findIndex(
    (item) => item.id === active.id,
  );
  const overIndex = overContainer.items.findIndex(
    (item) => item.id === over.id,
  );

  setContainers((containers) => {
    const newContainers = containers.map((container) => {
      if (container === activeContainer) {
        return {
          ...container,
          items: container.items.filter((item) => item.id !== active.id),
        };
      }
      if (container === overContainer) {
        const newItems = [...container.items];
        if (overIndex === -1) {
          newItems.push(activeContainer.items[activeIndex]);
        } else {
          newItems.splice(overIndex + 1, 0, activeContainer.items[activeIndex]);
        }
        return {
          ...container,
          items: newItems,
        };
      }
      return container;
    });
    return newContainers;
  });
}

export function handleDragEnd(
  event: DragEndEvent,
  containers: Container[],
  setContainers: (fn: (prev: Container[]) => Container[]) => void,
  setActiveId: (id: UniqueIdentifier | null) => void,
  setOverColumnId: (id: UniqueIdentifier | null) => void,
  setActiveItem: (item: Item | null) => void,
) {
  setActiveId(null);
  setOverColumnId(null);
  setActiveItem(null);
  const { active, over } = event;
  if (!over) {
    return;
  }
  const activeContainer = findContainer(active.id, containers);
  const overContainer =
    containers.find((container) => container.id === over.id) ||
    findContainer(over.id, containers);
  if (!activeContainer || !overContainer) {
    return;
  }
  if (activeContainer === overContainer) {
    const oldIndex = activeContainer.items.findIndex(
      (item) => item.id === active.id,
    );
    const newIndex = activeContainer.items.findIndex(
      (item) => item.id === over.id,
    );
    setContainers((containers) =>
      containers.map((container) =>
        container === activeContainer
          ? {
              ...container,
              items: arrayMove(container.items, oldIndex, newIndex),
            }
          : container,
      ),
    );
  }
}

export function getInitialContainers(
  projectId: number,
  stages: any[],
  containersForProject: Container[],
): Container[] {
  return stages.map((stage) => {
    const existingContainer = containersForProject.find(
      (c) => c.id === stage.id,
    );
    return (
      existingContainer || {
        projectId,
        id: stage.id,
        title: stage.title,
        items: [],
      }
    );
  });
}

export function handleDeleteCard(
  id: string,
  setContainers: React.Dispatch<React.SetStateAction<Container[]>>,
) {
  setContainers((prev) =>
    prev.map((container) => ({
      ...container,
      items: container.items.filter((item) => item.id !== id),
    })),
  );
}
