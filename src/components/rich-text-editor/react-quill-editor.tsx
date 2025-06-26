import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface WysiwygProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const Wysiwyg: React.FC<WysiwygProps> = ({ value, onChange }) => {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
};
