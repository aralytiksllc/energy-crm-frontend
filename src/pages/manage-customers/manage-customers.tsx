import React, { useState } from 'react';
import { Card, Tabs, Typography, Button, Row, Col, Layout } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { CompanyList, CompanyForm, PlaceholderTab, ConsumptionTab, DocumentsTab } from './components';

const { TabPane } = Tabs;
const { Title } = Typography;
const { Content } = Layout;

// Mock data for companies
const companies = [
  {
    id: 1,
    name: 'Acme Corporation',
    status: 'Active',
    type: 'active',
  },
  {
    id: 2,
    name: 'TechStart LTD',
    status: 'Lead',
    type: 'lead',
  },
  {
    id: 3,
    name: 'Acme Global Industries',
    status: 'Qualified',
    type: 'qualified',
  },
  {
    id: 4,
    name: 'Innovation Corp',
    status: 'Active',
    type: 'active',
  },
  {
    id: 5,
    name: 'StartupXYZ',
    status: 'Lead',
    type: 'lead',
  },
];

export const ManageCustomers: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <Content >
      <Row gutter={[16, 16]}>
        {/* Left Panel - Search Business */}
        <Col xs={24} lg={8} xl={6}>
          <Card 
            title="Search Business"
            style={{ borderRadius: 8, height: '100vh' }}
          >
            <CompanyList
              companies={companies}
              selectedCompany={selectedCompany}
              activeFilter={activeFilter}
              onCompanySelect={setSelectedCompany}
              onFilterChange={handleFilterChange}
            />
          </Card>
        </Col>
        
        {/* Right Panel - Company Details */}
        <Col xs={24} lg={16} xl={18}>
          <Card 
            style={{ borderRadius: 8, height: '100vh' }}
            title={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <Title 
                  level={3}
                  style={{ 
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {selectedCompany.name}
                </Title>
                <Button type="primary" icon={<FileTextOutlined />}>
                  Generate Contract
                </Button>
              </div>
            }
          >
            <Tabs defaultActiveKey="company-info">
              <TabPane tab="Company Info" key="company-info">
                <CompanyForm />
              </TabPane>
              
              <TabPane tab="Contacts" key="contacts">
                <PlaceholderTab message="Contacts information will be displayed here" />
              </TabPane>
              
              <TabPane tab="Metering Points" key="metering-points">
                <PlaceholderTab message="Metering points information will be displayed here" />
              </TabPane>
              
              <TabPane tab="Consumption" key="consumption">
                <ConsumptionTab />
              </TabPane>
              
              <TabPane tab="Documents" key="documents">
                <DocumentsTab />
              </TabPane>
              
              <TabPane tab="Branches" key="branches">
                <PlaceholderTab message="Branches information will be displayed here" />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};
