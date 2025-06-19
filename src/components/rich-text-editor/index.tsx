import React from 'react';
import { Input, Button, Space, Divider } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { useRichTextEditorStyles } from './rich-text-editor.styles';

const { TextArea } = Input;

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Enter text...',
  disabled = false,
  rows = 6,
  maxLength,
  showCount = false,
}) => {
  const { styles } = useRichTextEditorStyles();
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (prefix: string, suffix = '') => {
    if (!textAreaRef.current || disabled) return;

    const textarea = textAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value?.substring(start, end) || '';
    const beforeText = value?.substring(0, start) || '';
    const afterText = value?.substring(end) || '';

    const newText = beforeText + prefix + selectedText + suffix + afterText;
    onChange?.(newText);

    setTimeout(() => {
      const newPosition =
        start + prefix.length + selectedText.length + suffix.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case 'bold':
        insertFormatting('**', '**');
        break;
      case 'italic':
        insertFormatting('_', '_');
        break;
      case 'underline':
        insertFormatting('<u>', '</u>');
        break;
      case 'strikethrough':
        insertFormatting('~~', '~~');
        break;
      case 'h1':
        insertFormatting('# ');
        break;
      case 'h2':
        insertFormatting('## ');
        break;
      case 'h3':
        insertFormatting('### ');
        break;
      case 'ul':
        insertFormatting('- ');
        break;
      case 'ol':
        insertFormatting('1. ');
        break;
      case 'link':
        insertFormatting('[', '](url)');
        break;
      case 'image':
        insertFormatting('![', '](image-url)');
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <Space size="small">
          <Button
            size="small"
            icon={<BoldOutlined />}
            onClick={() => handleToolbarAction('bold')}
            disabled={disabled}
            className={styles.toolbarButton}
            title="Bold"
          />
          <Button
            size="small"
            icon={<ItalicOutlined />}
            onClick={() => handleToolbarAction('italic')}
            disabled={disabled}
            className={styles.toolbarButton}
            title="Italic"
          />
          <Button
            size="small"
            icon={<UnderlineOutlined />}
            onClick={() => handleToolbarAction('underline')}
            disabled={disabled}
            className={styles.toolbarButton}
            title="Underline"
          />
          <Button
            size="small"
            icon={<StrikethroughOutlined />}
            onClick={() => handleToolbarAction('strikethrough')}
            disabled={disabled}
            className={styles.toolbarButton}
            title="Strikethrough"
          />
        </Space>

        <Divider type="vertical" className={styles.divider} />

        <Space size="small">
          <Button
            size="small"
            onClick={() => handleToolbarAction('h1')}
            disabled={disabled}
            className={styles.toolbarButton}
            title="Heading 1"
          >
            H1
          </Button>
          <Button
            size="small"
            onClick={() => handleToolbarAction('h2')}
            disabled={disabled}
            className={styles.toolbarButton}
            title="Heading 2"
          >
            H2
          </Button>
          <Button
            size="small"
            onClick={() => handleToolbarAction('h3')}
            disabled={disabled}
            className={styles.toolbarButton}
            title="Heading 3"
          >
            H3
          </Button>
        </Space>

        <Divider type="vertical" className={styles.divider} />

        <Space size="small">
          <Button
            size="small"
            icon={<UnorderedListOutlined />}
            onClick={() => handleToolbarAction('ul')}
            disabled={disabled}
            className={styles.toolbarButton}
            title="Bullet List"
          />
          <Button
            size="small"
            icon={<OrderedListOutlined />}
            onClick={() => handleToolbarAction('ol')}
            disabled={disabled}
            className={styles.toolbarButton}
            title="Numbered List"
          />
        </Space>

        <Divider type="vertical" className={styles.divider} />

        <Space size="small">
          <Button
            size="small"
            icon={<LinkOutlined />}
            onClick={() => handleToolbarAction('link')}
            disabled={disabled}
            className={styles.toolbarButton}
            title="Insert Link"
          />
          <Button
            size="small"
            icon={<PictureOutlined />}
            onClick={() => handleToolbarAction('image')}
            disabled={disabled}
            className={styles.toolbarButton}
            title="Insert Image"
          />
        </Space>
      </div>

      <TextArea
        ref={textAreaRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        showCount={showCount}
        className={styles.textArea}
      />
    </div>
  );
};
