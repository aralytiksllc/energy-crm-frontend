import React, { useCallback, useMemo, useRef } from 'react';
import { Form, Input, Alert } from 'antd';
import { useRichTextEditorStyles } from './rich-text-editor.styles';
import { useReactQuillLoader } from '../../hooks/use-react-quill-loader';

export interface ReactQuillEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  height?: number;
  readOnly?: boolean;
  theme?: 'snow' | 'bubble';
  modules?: any;
  formats?: string[];
}

const DEFAULT_MODULES = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image'],
      ['blockquote', 'code-block'],
      ['clean'],
    ],
  },
  clipboard: {
    matchVisual: true,
  },
};

const DEFAULT_FORMATS = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'align',
  'link',
  'image',
  'blockquote',
  'code-block',
];

export const ReactQuillEditor: React.FC<ReactQuillEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Enter your content...',
  disabled = false,
  height = 200,
  readOnly = false,
  theme = 'snow',
  modules,
  formats,
}) => {
  const { styles } = useRichTextEditorStyles({ height });
  const quillRef = useRef<any>(null);
  const { ReactQuill, isQuillAvailable, isLoading } = useReactQuillLoader();

  // Image upload handler
  const imageHandler = useCallback(() => {
    if (!quillRef.current) return;

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        const quillEditor = quillRef.current.getEditor();
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, 'image', imageUrl, 'user');
      };
      reader.readAsDataURL(file);
    };
  }, []);

  // Enhanced modules with custom image handler
  const enhancedModules = useMemo(() => {
    const baseModules = modules || DEFAULT_MODULES;

    return {
      ...baseModules,
      toolbar: {
        ...baseModules.toolbar,
        handlers: {
          ...baseModules.toolbar?.handlers,
          image: imageHandler,
        },
      },
    };
  }, [modules, imageHandler]);

  const editorFormats = useMemo(() => {
    return formats || DEFAULT_FORMATS;
  }, [formats]);

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.container}>
        <Input.TextArea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Loading rich text editor..."
          disabled={true}
          rows={Math.max(3, Math.floor(height / 25))}
          style={{ minHeight: height }}
        />
      </div>
    );
  }

  // Fallback to textarea if react-quill is not available
  if (isQuillAvailable === false || !ReactQuill) {
    return (
      <div className={styles.container}>
        <Alert
          message="Rich Text Editor"
          description="To enable full rich text editing features, please install react-quill: npm install react-quill"
          type="info"
          showIcon
          style={{ marginBottom: 8 }}
        />
        <Input.TextArea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled || readOnly}
          rows={Math.max(3, Math.floor(height / 25))}
          style={{ minHeight: height }}
        />
      </div>
    );
  }

  // Render ReactQuill if available
  return (
    <div className={styles.container}>
      <ReactQuill
        ref={quillRef}
        theme={theme}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly || disabled}
        modules={enhancedModules}
        formats={editorFormats}
        className={styles.editor}
      />
    </div>
  );
};

// Wrapper component for Ant Design Form integration
export interface FormReactQuillEditorProps extends ReactQuillEditorProps {
  name?: string;
  label?: string;
  required?: boolean;
  rules?: any[];
}

export const FormReactQuillEditor: React.FC<FormReactQuillEditorProps> = ({
  name,
  label,
  required = false,
  rules = [],
  ...editorProps
}) => {
  const defaultRules = required
    ? [{ required: true, message: `${label || 'This field'} is required` }]
    : [];

  const allRules = [...defaultRules, ...rules];

  return (
    <Form.Item name={name} label={label} rules={allRules}>
      <ReactQuillEditor {...editorProps} />
    </Form.Item>
  );
};
