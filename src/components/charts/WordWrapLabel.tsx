import React from 'react';

interface WordWrapLabelProps {
  x?: number;
  y?: number;
  value?: string | number;
  labelWidth?: number;
  labelHeight?: number;
  style?: React.CSSProperties;
}

export const WordWrapLabel = ({
  x = 0,
  y = 0,
  value,
  labelWidth = 350,
  labelHeight = 40,
  style,
}: WordWrapLabelProps) => {
  const foreignObjectY = y - labelHeight;

  return (
    <g>
      <foreignObject
        x={x}
        y={foreignObjectY}
        width={labelWidth}
        height={labelHeight}
        style={{ overflow: 'visible' }}
      >
        <div
          {...{
            style: {
              width: labelWidth,
              wordWrap: 'break-word',
              lineHeight: '1.2',
              ...style,
            },
            xmlns: 'http://www.w3.org/1999/xhtml',
          }}
        >
          {value}
        </div>
      </foreignObject>
    </g>
  );
};

export default WordWrapLabel;
