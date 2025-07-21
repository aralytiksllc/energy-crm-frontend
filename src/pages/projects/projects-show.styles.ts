import { CSSProperties } from 'react';

export const projectShowStyles = {
  richTextContainer: {
    maxHeight: '200px',
    overflowY: 'auto' as const,
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    padding: '12px',
    backgroundColor: 'var(--color-bg-light)',
    lineHeight: '1.6',
  } as CSSProperties,
};

export const richTextCSS = `
  .rich-text-content p {
    margin-bottom: 8px;
    line-height: 1.6;
  }
  .rich-text-content p:last-child {
    margin-bottom: 0;
  }
  .rich-text-content ul, .rich-text-content ol {
    margin: 8px 0;
    padding-left: 20px;
  }
  .rich-text-content li {
    margin-bottom: 4px;
  }
  .rich-text-content strong {
    font-weight: 600;
  }
  .rich-text-content em {
    font-style: italic;
  }
  .rich-text-content h1, .rich-text-content h2, .rich-text-content h3 {
    margin: 12px 0 8px 0;
    font-weight: 600;
  }
  .rich-text-content h1 {
    font-size: 1.2em;
  }
  .rich-text-content h2 {
    font-size: 1.1em;
  }
  .rich-text-content h3 {
    font-size: 1.05em;
  }
`;
