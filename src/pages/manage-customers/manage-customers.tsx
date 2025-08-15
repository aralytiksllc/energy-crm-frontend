import React, { useState } from 'react';
import { Card, Tabs, Row, Col, Layout } from 'antd';
import { CompanyList, CompanyForm, ConsumptionTab, DocumentsTab, ContactsTab, MeteringPointsTab, BranchesTab } from './components';

const { Content } = Layout;
const { TabPane } = Tabs;

// Mock data
const companies = [
  { id: 1, name: 'TechCorp Solutions', status: 'Active', type: 'active' },
  { id: 2, name: 'Green Energy Ltd', status: 'Lead', type: 'lead' },
  { id: 3, name: 'PowerGrid Systems', status: 'Qualified', type: 'qualified' },
  { id: 4, name: 'EcoPower Industries', status: 'Active', type: 'active' },
  { id: 5, name: 'SolarTech Corp', status: 'Lead', type: 'lead' },
];

export const ManageCustomers: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <Content style={{ 
      minHeight: '87vh', 
      padding: '16px',
      overflowX: 'hidden',
      flexDirection: 'column'
    }}>
      <Row gutter={[16, 16]} style={{ height: '100%', margin: 0 }}>
        <Col xs={24} lg={8} xl={6} style={{ minHeight: '87vh' }}>
          <Card 
            title="Search Business"
            style={{ 
              height: '100%',
              borderRadius: 8
            }}
            styles={{ 
              body: { 
                height: '87vh', 
                overflow: 'auto',
                padding: '16px'
              }
            }}
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
        
        <Col xs={24} lg={16} xl={18} style={{ height: '100%' }}>
          <Card 
            title={selectedCompany.name}
            style={{ 
              height: '100%',
              borderRadius: 8
            }}
            styles={{ 
              body: { 
                minHeight: '87vh', 
                overflow: 'hidden',
                padding: 0
              }
            }}
          >
            <Tabs 
              defaultActiveKey="company-info"
              style={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              tabBarStyle={{ 
                margin: '0 24px',
                flexShrink: 0
              }}
            >
              <TabPane tab="Company Info" key="company-info">
                <div style={{ 
                  height: '100%', 
                  overflow: 'auto',
                  padding: '24px'
                }}>
                  <CompanyForm />
                </div>
              </TabPane>
              
              <TabPane tab="Consumption" key="consumption">
                <div style={{ 
                  height: '100%', 
                  overflow: 'auto',
                  padding: '24px'
                }}>
                  <ConsumptionTab />
                </div>
              </TabPane>
              
              <TabPane tab="Documents" key="documents">
                <div style={{ 
                  height: '100%', 
                  overflow: 'auto',
                  padding: '24px'
                }}>
                  <DocumentsTab />
                </div>
              </TabPane>
              
              <TabPane tab="Contacts" key="contacts">
                <div style={{ 
                  height: '100%', 
                  overflow: 'auto',
                  padding: '24px'
                }}>
                  <ContactsTab />
                </div>
              </TabPane>
              
              <TabPane tab="Metering Points" key="metering-points">
                <div style={{ 
                  height: '100%', 
                  overflow: 'auto',
                  padding: '24px'
                }}>
                  <MeteringPointsTab />
                </div>
              </TabPane>
              
              <TabPane tab="Branches" key="branches">
                <div style={{ 
                  height: '100%', 
                  overflow: 'auto',
                  padding: '24px'
                }}>
                  <BranchesTab />
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};
