// import React, { useState } from 'react';
// import { Card, Tabs, Row, Col, Layout } from 'antd';
// import { useNavigation } from '@refinedev/core';
// import { CompanyList, CompanyForm, ConsumptionTab, DocumentsTab, ContactsTab, MeteringPointsTab, BranchesTab } from './components';

// const { Content } = Layout;
// const { TabPane } = Tabs;

// // Mock data
// const companies = [
//   { id: 1, name: 'TechCorp Solutions', status: 'Active', type: 'active' },
//   { id: 2, name: 'Green Energy Ltd', status: 'Lead', type: 'lead' },
//   { id: 3, name: 'PowerGrid Systems', status: 'Qualified', type: 'qualified' },
//   { id: 4, name: 'EcoPower Industries', status: 'Active', type: 'active' },
//   { id: 5, name: 'SolarTech Corp', status: 'Lead', type: 'lead' },
// ];

// export const ManageCustomers: React.FC = () => {
//   const [selectedCompany, setSelectedCompany] = useState(companies[0]);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const { push } = useNavigation();

//   const handleFilterChange = (filter: string) => {
//     setActiveFilter(filter);
//   };

//   const handleNewCustomer = () => {
//     push('/new-customer');
//   };

//   return (
//     <Content style={{ padding: 16 }}>
//       <Row gutter={16}>
//         <Col xs={24} lg={8} xl={6}>
//           <Card>
//             <CompanyList
//               companies={companies}
//               selectedCompany={selectedCompany}
//               activeFilter={activeFilter}
//               onCompanySelect={setSelectedCompany}
//               onFilterChange={handleFilterChange}
//               onNewCustomer={handleNewCustomer}
//             />
//           </Card>
//         </Col>
        
//         <Col xs={24} lg={16} xl={18}>
//           <Card title={selectedCompany.name}>
//             <Tabs defaultActiveKey="company-info">
//               <TabPane tab="Company Info" key="company-info">
//                 <CompanyForm />
//               </TabPane>
              
//               <TabPane tab="Consumption" key="consumption">
//                 <ConsumptionTab />
//               </TabPane>
              
//               <TabPane tab="Documents" key="documents">
//                 <DocumentsTab />
//               </TabPane>
              
//               <TabPane tab="Contacts" key="contacts">
//                 <ContactsTab />
//               </TabPane>
              
//               <TabPane tab="Metering Points" key="metering-points">
//                 <MeteringPointsTab />
//               </TabPane>
              
//               <TabPane tab="Branches" key="branches">
//                 <BranchesTab />
//               </TabPane>
//             </Tabs>
//           </Card>
//         </Col>
//       </Row>
//     </Content>
//   );
// };
