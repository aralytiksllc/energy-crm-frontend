import React, { useState } from 'react';
import {
  List,
  Avatar,
  Typography,
  Input,
  Button,
  Space,
  Divider,
  Empty,
  Spin,
  Card,
  Tooltip,
  message,
} from 'antd';
import {
  UserOutlined,
  SendOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useTaskCommentsStyles } from './task-comments.styles';
import type { TaskComment, TaskCommentsProps } from './task-comments.types';

const { TextArea } = Input;
const { Text, Paragraph } = Typography;

export const TaskComments: React.FC<TaskCommentsProps> = ({
  comments = [],
  loading = false,
  disabled = false,
  currentUser,
  onAddComment,
  onEditComment,
  onDeleteComment,
  placeholder = 'Add a comment...',
  maxLength = 1000,
  showCount = true,
}) => {
  const { styles, cx } = useTaskCommentsStyles();
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      message.warning('Please enter a comment');
      return;
    }

    if (!currentUser) {
      message.error('User not authenticated');
      return;
    }

    setSubmitting(true);
    try {
      await onAddComment?.(newComment.trim());
      setNewComment('');
      message.success('Comment added successfully');
    } catch (error) {
      message.error('Failed to add comment');
      console.error('Error adding comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editingText.trim()) {
      message.warning('Please enter comment text');
      return;
    }

    setSubmitting(true);
    try {
      await onEditComment?.(commentId, editingText.trim());
      setEditingCommentId(null);
      setEditingText('');
      message.success('Comment updated successfully');
    } catch (error) {
      message.error('Failed to update comment');
      console.error('Error updating comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setSubmitting(true);
    try {
      await onDeleteComment?.(commentId);
      message.success('Comment deleted successfully');
    } catch (error) {
      message.error('Failed to delete comment');
      console.error('Error deleting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (comment: TaskComment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.content);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditingText('');
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const diff = now.getTime() - commentDate.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return commentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const canEditDelete = (comment: TaskComment) => {
    return currentUser && currentUser.id === comment.author.id;
  };

  const renderCommentActions = (comment: TaskComment) => {
    if (!canEditDelete(comment) || disabled) return null;

    return (
      <Space size="small">
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          onClick={() => startEdit(comment)}
          className={styles.actionButton}
          disabled={submitting}
        />
        <Button
          type="text"
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteComment(comment.id)}
          className={cx(styles.actionButton, styles.deleteButton)}
          disabled={submitting}
        />
      </Space>
    );
  };

  const renderComment = (comment: TaskComment) => {
    const isEditing = editingCommentId === comment.id;

    return (
      <List.Item
        key={comment.id}
        className={styles.commentItem}
        actions={!isEditing ? [renderCommentActions(comment)] : undefined}
      >
        <List.Item.Meta
          avatar={
            <Avatar
              src={comment.author.avatar}
              icon={<UserOutlined />}
              size="default"
              className={styles.authorAvatar}
            />
          }
          title={
            <Space align="center" className={styles.commentHeader}>
              <Text strong className={styles.authorName}>
                {comment.author.name}
              </Text>
              <Tooltip title={new Date(comment.createdAt).toLocaleString()}>
                <Text type="secondary" className={styles.timestamp}>
                  {formatTimestamp(comment.createdAt)}
                </Text>
              </Tooltip>
              {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
                <Text type="secondary" className={styles.editedLabel}>
                  (edited)
                </Text>
              )}
            </Space>
          }
          description={
            isEditing ? (
              <div className={styles.editContainer}>
                <TextArea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  placeholder="Edit your comment..."
                  maxLength={maxLength}
                  showCount={showCount}
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  className={styles.editTextArea}
                  disabled={submitting}
                />
                <Space className={styles.editActions}>
                  <Button
                    size="small"
                    onClick={cancelEdit}
                    disabled={submitting}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => handleEditComment(comment.id)}
                    loading={submitting}
                    className={styles.saveButton}
                  >
                    Save
                  </Button>
                </Space>
              </div>
            ) : (
              <Paragraph className={styles.commentContent}>
                {comment.content}
              </Paragraph>
            )
          }
        />
      </List.Item>
    );
  };

  return (
    <div className={styles.container}>
      <Spin spinning={loading}>
        {/* Comment Input */}
        {currentUser && !disabled && (
          <Card className={styles.inputCard} bordered={false}>
            <Space.Compact
              direction="vertical"
              className={styles.inputContainer}
            >
              <Space align="start" className={styles.inputHeader}>
                <Avatar
                  src={currentUser.avatar}
                  icon={<UserOutlined />}
                  size="default"
                  className={styles.currentUserAvatar}
                />
                <div className={styles.inputWrapper}>
                  <TextArea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    showCount={showCount}
                    autoSize={{ minRows: 3, maxRows: 6 }}
                    className={styles.commentInput}
                    disabled={submitting}
                  />
                </div>
              </Space>
              <div className={styles.inputActions}>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSubmitComment}
                  loading={submitting}
                  disabled={!newComment.trim()}
                  className={styles.submitButton}
                >
                  Comment
                </Button>
              </div>
            </Space.Compact>
          </Card>
        )}

        {/* Comments List */}
        {comments.length > 0 ? (
          <>
            <Divider className={styles.divider} />
            <List
              className={styles.commentsList}
              itemLayout="vertical"
              dataSource={comments}
              renderItem={renderComment}
              split={false}
            />
          </>
        ) : (
          !loading && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No comments yet"
              className={styles.emptyState}
            />
          )
        )}
      </Spin>
    </div>
  );
};

export default TaskComments;
