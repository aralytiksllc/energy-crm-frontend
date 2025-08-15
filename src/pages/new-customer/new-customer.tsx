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
    <div style={{ 
      minHeight: 'calc(100vh - 64px)', 
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Card 
        style={{ 
          borderRadius: 8, 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          margin: 16,
          overflowX: 'hidden'
        }}
        bodyStyle={{ 
          flex: 1, 
          overflowX: 'hidden',
          padding: 0
        }}
      >
        <div style={{ padding: '24px 24px 0 24px' }}>
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
          style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '0 24px',
            overflowX: 'hidden'
          }}
          tabBarStyle={{ 
            margin: '24px 0 0 0',
            flexShrink: 0
          }}
        >
          <TabPane tab="Company Info" key="company-info">
            <div style={{ 
              height: '100%', 
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '24px 0',
              maxWidth: '100%'
            }}>
              <CompanyInfoTab />
            </div>
          </TabPane>
          
          <TabPane tab="Contacts" key="contacts">
            <div style={{ 
              height: '100%', 
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '24px 0',
              maxWidth: '100%'
            }}>
              <ContactsTab />
            </div>
          </TabPane>
          
          <TabPane tab="Metering Points" key="metering-points">
            <div style={{ 
              height: '100%', 
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '24px 0',
              maxWidth: '100%'
            }}>
              <MeteringPointsTab />
            </div>
          </TabPane>
          
          <TabPane tab="Consumption" key="consumption">
            <div style={{ 
              height: '100%', 
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '24px 0',
              maxWidth: '100%'
            }}>
              <ConsumptionTab />
            </div>
          </TabPane>
          
          <TabPane tab="Documents" key="documents">
            <div style={{ 
              height: '100%', 
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '24px 0',
              maxWidth: '100%'
            }}>
              <DocumentsTab />
            </div>
          </TabPane>
          
          <TabPane tab="Branches" key="branches">
            <div style={{ 
              height: '100%', 
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '24px 0',
              maxWidth: '100%'
            }}>
              <BranchesTab />
            </div>
          </TabPane>
        </Tabs>

        <div style={{ 
          padding: '24px',
          borderTop: '1px solid #f0f0f0',
          textAlign: 'right',
          flexShrink: 0
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
