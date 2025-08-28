// External
import * as React from 'react';
import { Card, Typography, Row, Col, List, Button, Upload, Avatar } from 'antd';
import { CloudOutlined, PaperClipOutlined, DownloadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';

// Internal

const { Title } = Typography;
const { Dragger } = Upload;

export type DocumentsListProps = {};

export const DocumentsList: React.FC<DocumentsListProps> = () => {
  const { customerId } = useParams();

  // Mock data for documents
  const mockDocuments = [
    {
      id: '1',
      name: 'Contract Agreement.pdf',
      description: 'Main contract agreement for energy supply',
      date: '2025-01-15',
      size: '2.4 MB',
    },
    {
      id: '2',
      name: 'Technical Specifications.docx',
      description: 'Technical specifications and requirements',
      date: '2025-01-10',
      size: '1.8 MB',
    },
    {
      id: '3',
      name: 'Invoice_2025_001.pdf',
      description: 'Monthly invoice for January 2025',
      date: '2025-01-05',
      size: '0.9 MB',
    },
    {
      id: '4',
      name: 'Metering Report.xlsx',
      description: 'Monthly metering and consumption report',
      date: '2025-01-01',
      size: '3.2 MB',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Upload Section */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ marginBottom: '16px' }}>
          Upload Documents
        </Title>
        <Dragger
          name="file"
          multiple={true}
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          onChange={(info) => {
            console.log(info);
          }}
        >
          <p className="ant-upload-drag-icon">
            <CloudOutlined />
          </p>
          <p className="ant-upload-text">Click or drag files to this area to upload</p>
          <p className="ant-upload-hint">
            Support for multiple file uploads. Strictly prohibited from uploading company data or other
            banned files.
          </p>
        </Dragger>
      </Card>

      {/* Documents List */}
      <Card>
        <Title level={4} style={{ marginBottom: '16px' }}>
          Documents
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={mockDocuments}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button 
                  type="link" 
                  icon={<DownloadOutlined />}
                  onClick={() => console.log('Download', item.name)}
                >
                  Download
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<PaperClipOutlined />} />}
                title={
                  <a href="#" onClick={(e) => { e.preventDefault(); console.log('View', item.name); }}>
                    {item.name}
                  </a>
                }
                description={
                  <div>
                    <div>{item.description}</div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                      {item.date} • {item.size}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Export Button */}
      <div style={{ 
        position: 'fixed', 
        bottom: '24px', 
        right: '24px', 
        zIndex: 1000 
      }}>
        <Button type="primary" icon={<DownloadOutlined />} size="large">
          Export All
        </Button>
      </div>
    </div>
  );
};
