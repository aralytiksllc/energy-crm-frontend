export interface TaskComment {
  id: string;
  content: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
  taskId?: string;
}

export interface TaskCommentsProps {
  comments?: TaskComment[];
  loading?: boolean;
  disabled?: boolean;
  currentUser?: {
    id: number;
    name: string;
    avatar?: string;
  };
  onAddComment?: (content: string) => Promise<void>;
  onEditComment?: (commentId: string, content: string) => Promise<void>;
  onDeleteComment?: (commentId: string) => Promise<void>;
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
}

export interface CreateCommentInput {
  content: string;
  taskId: string;
}

export interface UpdateCommentInput {
  id: string;
  content: string;
}

export interface CommentFormValues {
  content: string;
}
