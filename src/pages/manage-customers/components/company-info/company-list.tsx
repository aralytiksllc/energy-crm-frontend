import React from 'react';
import { List, Avatar, Tag, Typography, Space, Button, Input, Divider, Row, Col } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigation } from '@refinedev/core';
import { COLORS, BORDER_RADIUS } from '../../../../styles/theme';

const { Text } = Typography;

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
}

export const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  selectedCompany,
  activeFilter,
  onCompanySelect,
  onFilterChange,
}) => {
  const { push } = useNavigation();

  const filteredCompanies = companies.filter(company => {
    if (activeFilter === 'all') return true;
    return company.type === activeFilter;
  });

  const handleNewCustomer = () => {
    push('/new-customer');
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Button type="primary" icon={<PlusOutlined />} block onClick={handleNewCustomer}>
        New Customer
      </Button>
      
      <Input
        placeholder="Search business ID or MPID..."
        prefix={<SearchOutlined />}
      />
      
      <div>
        <Text strong style={{ marginBottom: 8, display: 'block' }}>Filter</Text>
        <Row gutter={[4, 8]}>
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
      
      <Divider />
      
      <List
        dataSource={filteredCompanies}
        renderItem={(company) => (
          <List.Item
            style={{
              padding: 12,
              borderRadius: BORDER_RADIUS.md,
              cursor: 'pointer',
              marginBottom: 8,
              border: `1px solid ${COLORS.border.light}`,
              transition: 'all 0.2s',
              backgroundColor: selectedCompany.id === company.id ? COLORS.primaryBg : 'transparent',
              borderColor: selectedCompany.id === company.id ? COLORS.primary : COLORS.border.light,
            }}
            onClick={() => onCompanySelect(company)}
          >
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: COLORS.primary }}>{company.name.charAt(0)}</Avatar>}
              title={<Text strong>{company.name}</Text>}
              description={
                <Tag style={{ 
                  marginTop: 4, 
                  backgroundColor: COLORS.primaryBg, 
                  color: COLORS.primary, 
                  borderColor: COLORS.primaryBorder 
                }}>
                  {company.status}
                </Tag>
              }
            />
          </List.Item>
        )}
      />
    </Space>
  );
};
