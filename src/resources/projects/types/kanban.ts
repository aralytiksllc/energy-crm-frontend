export interface Item {
  id: string;
  content: string;
  description?: string;
  extra?: React.ReactNode;
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
