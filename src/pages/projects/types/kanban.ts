import { Task } from '../../tasks/types';

export interface Item {
  id: string;
  content: string;
  description: string;
  task: Task; // Task.dueDate is already a Date
  dueDate?: string;
  users?: {
    id: string;
    name: string;
    avatarUrl?: string;
  }[];
}

export interface Container {
  id: string;
  title: string;
  items: Item[];
}

export interface MultipleContainersProps {
  containerStyle?: React.CSSProperties;
  itemCount?: number;
  scrollable?: boolean;
  projects?: Container[];
}
