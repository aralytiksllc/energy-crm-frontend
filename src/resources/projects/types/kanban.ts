import { Task } from '../../tasks/types/types';

export interface Item {
  id: string;
  content: string;
  description: string;
  task: Task;
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
