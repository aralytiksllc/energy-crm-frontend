import React from 'react';
import { List, Typography, Space } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { COLORS, FONT_SIZE } from '../../../../styles/theme';

const { Text, Link } = Typography;

interface Document {
  id: string;
  filename: string;
  description: string;
  type: string;
  date: string;
}

export const DocumentsList: React.FC = () => {
  const documents: Document[] = [
    {
      id: '1',
      filename: 'Keds.pdf',
      description: 'Official document from KEDS confirming metering point details and consumption history',
      type: 'KEDS Data Certificate',
      date: '15/08/25'
    },
    {
      id: '2',
      filename: 'BRC.pdf',
      description: 'Proof of company registration with ARBK',
      type: 'Business Registration Certificate',
      date: '15/08/25'
    },
    {
      id: '3',
      filename: 'Contract.pdf',
      description: 'Executed agreements between the client and MDA or other suppliers.',
      type: 'Signed Contracts',
      date: '15/08/25'
    },
    {
      id: '4',
      filename: 'Invoice.pdf',
      description: 'Previous electricity bills for verification and analysis.',
      type: 'Prior Invoices',
      date: '15/08/25'
    }
  ];

  return (
    <List
      dataSource={documents}
      renderItem={(document) => (
        <List.Item
          style={{
            padding: '16px 0',
            borderBottom: `1px solid ${COLORS.border.light}`,
          }}
        >
          <List.Item.Meta
            avatar={
              <PaperClipOutlined 
                style={{ 
                  fontSize: 20, 
                  color: COLORS.primary,
                  marginTop: 4
                }} 
              />
            }
            title={
              <Space direction="vertical" size={0} style={{ width: '100%' }}>
                <Link 
                  style={{ 
                    fontSize: FONT_SIZE.xl, 
                    color: COLORS.primary,
                    fontWeight: 500
                  }}
                >
                  {document.filename}
                </Link>
                <Text 
                  type="secondary" 
                  style={{ 
                    fontSize: FONT_SIZE.md,
                    fontStyle: 'italic'
                  }}
                >
                  ({document.type})
                </Text>
              </Space>
            }
            description={
              <div style={{ marginTop: 8 }}>
                <Text 
                  type="secondary" 
                  style={{ 
                    fontSize: FONT_SIZE.lg,
                    lineHeight: 1.5
                  }}
                >
                  {document.description}
                </Text>
              </div>
            }
          />
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            color: COLORS.text.secondary,
            fontSize: FONT_SIZE.lg
          }}>
            {document.date}
          </div>
        </List.Item>
      )}
      style={{
        border: `1px solid ${COLORS.border.light}`,
        borderRadius: 8,
        padding: '0 16px'
      }}
    />
  );
};
