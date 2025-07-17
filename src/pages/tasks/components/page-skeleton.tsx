import React from 'react';

export const PageSkeleton: React.FC = () => {
  const columnCount = 4;
  const itemCount = 3;

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        {Array.from({ length: columnCount }).map((_, index) => (
          <div
            key={index}
            style={{
              width: '280px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <div
              style={{
                height: '24px',
                backgroundColor: '#e0e0e0',
                borderRadius: '4px',
                marginBottom: '16px',
              }}
            />
            {Array.from({ length: itemCount }).map((_, itemIndex) => (
              <div
                key={itemIndex}
                style={{
                  height: '80px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  marginBottom: '8px',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
