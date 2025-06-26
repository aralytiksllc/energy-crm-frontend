import React, { useState } from 'react';
import {
  FormProps,
  Typography,
  Button,
  Input,
  List,
  Avatar,
  Space,
  Card,
  Empty,
} from 'antd';
import { CommentOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

export interface ProjectCommentsFormProps {
  formProps: FormProps;
}

interface Comment {
  id: number;
  content: string;
  author: string;
  authorAvatar?: string;
  createdAt: Date;
  projectId?: number;
}
const mockComments: Comment[] = [
  {
    id: 1,
    content:
      'This project looks great! Looking forward to the final deliverables.',
    author: 'John Doe',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    createdAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: 2,
    content:
      'Can we schedule a meeting to discuss the technical requirements in more detail?',
    author: 'Sarah Smith',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    createdAt: new Date('2024-01-15T14:45:00'),
  },
  {
    id: 3,
    content:
      'I have uploaded the latest design mockups. Please review and let me know your thoughts.',
    author: 'Mike Johnson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    createdAt: new Date('2024-01-16T09:15:00'),
  },
];

export const ProjectCommentsForm: React.FC<ProjectCommentsFormProps> = ({
  formProps,
}) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(mockComments);

  const projectId = formProps.form?.getFieldValue('id');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      content: newComment.trim(),
      author: 'Current User',
      authorAvatar:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
      createdAt: new Date(),
      projectId,
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <div style={{ padding: '16px 0' }}>
      <Title level={4} style={{ marginBottom: '16px' }}>
        Project Comments
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
        Collaborate with your team by leaving comments and feedback on this
        project.
      </Text>
      <Card size="small" style={{ marginBottom: '24px' }}>
        <Space.Compact style={{ width: '100%' }} direction="vertical">
          <TextArea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment... (Ctrl+Enter to submit)"
            autoSize={{ minRows: 3, maxRows: 6 }}
            onKeyDown={handleKeyPress}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '8px',
            }}
          >
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              Add Comment
            </Button>
          </div>
        </Space.Compact>
      </Card>
      {comments.length === 0 ? (
        <Empty
          image={
            <CommentOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
          }
          description="No comments yet. Be the first to comment!"
        />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={comments}
          renderItem={(comment) => (
            <List.Item key={comment.id}>
              <Card size="small" style={{ backgroundColor: '#fafafa' }}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={comment.authorAvatar}
                      icon={<UserOutlined />}
                      size={40}
                    />
                  }
                  title={
                    <Space>
                      <Text strong>{comment.author}</Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {dayjs(comment.createdAt).format('MMM DD, YYYY HH:mm')}
                      </Text>
                    </Space>
                  }
                  description={
                    <Text style={{ whiteSpace: 'pre-wrap', marginTop: '8px' }}>
                      {comment.content}
                    </Text>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
