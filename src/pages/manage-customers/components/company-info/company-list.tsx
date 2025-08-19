import React from 'react';
import { Card, Avatar, Tag, Typography, Space, Button, Input, Row, Col } from 'antd';
import { SearchOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface Company {
  id: number;
  name: string;
  status: string;
  type: string;
}

interface CompanyListProps {
  companies: Company[];
  selectedCompany: Company;
  activeFilter: string;
  onCompanySelect: (company: Company) => void;
  onFilterChange: (filter: string) => void;
  onNewCustomer: () => void;
}

export const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  selectedCompany,
  activeFilter,
  onCompanySelect,
  onFilterChange,
  onNewCustomer,
}) => {
  const filteredCompanies = companies.filter(company => {
    if (activeFilter === 'all') return true;
    return company.type === activeFilter;
  });

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0, marginBottom: 16 }}>Search Business</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={onNewCustomer}
          size="large"
          block
        >
          New Customer
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ marginBottom: 8, display: 'block' }}>Search</Text>
        <Input
          placeholder="Search business ID or MPID..."
          prefix={<SearchOutlined />}
          size="large"
        />
      </div>
      
      <div>
        <Text strong style={{ marginBottom: 8, display: 'block' }}>Filter</Text>
        <Row gutter={[8, 8]}>
          <Col>
            <Button 
              type={activeFilter === 'all' ? 'primary' : 'default'}
              size="small"
              onClick={() => onFilterChange('all')}
            >
              All
            </Button>
          </Col>
          <Col>
            <Button 
              type={activeFilter === 'lead' ? 'primary' : 'default'}
              size="small"
              onClick={() => onFilterChange('lead')}
            >
              Lead
            </Button>
          </Col>
          <Col>
            <Button 
              type={activeFilter === 'qualified' ? 'primary' : 'default'}
              size="small"
              onClick={() => onFilterChange('qualified')}
            >
              Qualified
            </Button>
          </Col>
          <Col>
            <Button 
              type={activeFilter === 'active' ? 'primary' : 'default'}
              size="small"
              onClick={() => onFilterChange('active')}
            >
              Active
            </Button>
          </Col>
        </Row>
      </div>
      
      <div style={{ marginTop: 16 }}>
        {filteredCompanies.map((company) => (
          <Card
            key={company.id}
            type="inner"
            style={{ 
              marginBottom: 8,
              cursor: 'pointer',
              borderColor: selectedCompany.id === company.id ? '#1890ff' : '#d9d9d9',
              backgroundColor: selectedCompany.id === company.id ? '#e6f7ff' : 'transparent',
            }}
            onClick={() => onCompanySelect(company)}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              width: '100%'
            }}>
              <Space>
                <Avatar style={{ backgroundColor: '#1890ff' }}>{company.name.charAt(0)}</Avatar>
                <div>
                  <Text strong>{company.name}</Text>
                  <br />
                  <Tag style={{ 
                    marginTop: 4, 
                    backgroundColor: '#e6f7ff', 
                    color: '#1890ff', 
                    borderColor: '#91d5ff' 
                  }}>
                    {company.status}
                  </Tag>
                </div>
              </Space>
              <Button
                type="text"
                icon={<RightOutlined />}
                size="small"
                style={{ 
                  color: '#1890ff',
                  marginLeft: 8
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Arrow clicked for:', company.name);
                }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
