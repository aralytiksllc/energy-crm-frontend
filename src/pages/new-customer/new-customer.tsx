import React, { useState } from 'react';
import { Card, Tabs, Typography, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigation } from '@refinedev/core';
import { 
  CompanyInfoTab, 
  ContactsTab, 
  MeteringPointsTab, 
  ConsumptionTab, 
  DocumentsTab, 
  BranchesTab 
} from './components';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

export const NewCustomer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('company-info');
  const { goBack } = useNavigation();

  const tabOrder = ['company-info', 'contacts', 'metering-points', 'consumption', 'documents', 'branches'];
  const isLastTab = activeTab === 'branches';

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleNextStep = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const handleCreate = () => {
    // Handle customer creation
    console.log('Creating new customer...');
  };

  const handleBack = () => {
    goBack();
  };

  return (
    <div style={{ padding: 16 }}>
      <Card>
        <div style={{ marginBottom: 24 }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: 16 
          }}>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={handleBack}
              style={{ marginRight: 16 }}
            >
              Back
            </Button>
            <div>
              <Title level={2} style={{ margin: 0, marginBottom: 8 }}>
                Creating New Customer
              </Title>
              <Text type="secondary" style={{ fontSize: 16 }}>
                Enter customer information to create a new profile
              </Text>
            </div>
          </div>
        </div>

        <Tabs 
          activeKey={activeTab}
          onChange={handleTabChange}
        >
          <TabPane tab="Company Info" key="company-info">
            <CompanyInfoTab />
          </TabPane>
          
          <TabPane tab="Contacts" key="contacts">
            <ContactsTab />
          </TabPane>
          
          <TabPane tab="Metering Points" key="metering-points">
            <MeteringPointsTab />
          </TabPane>
          
          <TabPane tab="Consumption" key="consumption">
            <ConsumptionTab />
          </TabPane>
          
          <TabPane tab="Documents" key="documents">
            <DocumentsTab />
          </TabPane>
          
          <TabPane tab="Branches" key="branches">
            <BranchesTab />
          </TabPane>
        </Tabs>

        <div style={{ 
          marginTop: 24,
          paddingTop: 24,
          borderTop: '1px solid #f0f0f0',
          textAlign: 'right'
        }}>
          <Space>
            {!isLastTab && (
              <Button size="large" onClick={handleNextStep}>
                Next Step
              </Button>
            )}
            <Button type="primary" size="large" onClick={handleCreate}>
              Create
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};
