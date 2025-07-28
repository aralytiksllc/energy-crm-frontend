import React from 'react';
import {
  Button,
  Typography,
  DatePicker,
  Space,
  Select,
  Modal,
  Drawer,
  List,
  Popconfirm,
} from 'antd';
import {
  CalendarOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useCan } from '@refinedev/core';

import { IPlanning } from '@interfaces/planning';
import PlanningForm from './components/planning-form';
import { createStyles } from './planning.styles';
import { usePlanning } from './usePlanning';
import { PlanningCalendarView } from './components/PlanningCalendarView';

const { Title, Text } = Typography;

export const Planning: React.FC = () => {
  const { styles } = createStyles();
  const planningHook = usePlanning();

  const { data: canCreate } = useCan({
    resource: 'plannings',
    action: 'create',
  });

  const { data: canDelete } = useCan({
    resource: 'plannings',
    action: 'delete',
  });

  const {
    formDrawerVisible,
    deleteModalVisible,
    planningsLoading,
    filteredProjects,
    currentMonth,
    selectedProject,
    filteredPlanningsForDelete,
    setFormDrawerVisible,
    setDeleteModalVisible,
    handleMonthChange,
    setSelectedProject,
    handleDeletePlanning,
    handleFormSuccess,
  } = planningHook;

  return (
    <div className={styles.planningContainer}>
      <div className={styles.pageHeader}>
        <Title level={2} className={styles.pageTitle}>
          <CalendarOutlined />
          Planning Calendar
        </Title>
        <Space>
          {canCreate?.can && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setFormDrawerVisible(true)}
              className={styles.createButton}
            >
              Create Planning
            </Button>
          )}
          {canDelete?.can && (
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => setDeleteModalVisible(true)}
              disabled={filteredPlanningsForDelete.length === 0}
              className={styles.deleteButton}
            >
              Delete Planning
            </Button>
          )}
        </Space>
      </div>
      <div className={styles.filtersContainer}>
        <div className={styles.filterItem}>
          <Text strong style={{ marginRight: 8 }}>
            Month/Year:
          </Text>
          <DatePicker
            picker="month"
            value={currentMonth}
            onChange={handleMonthChange}
            style={{ width: '100%' }}
            format="MMMM YYYY"
          />
        </div>
        <div className={styles.filterItem}>
          <Text strong style={{ marginRight: 8 }}>
            Project:
          </Text>
          <Select
            value={selectedProject}
            onChange={setSelectedProject}
            style={{ width: '100%' }}
          >
            <Select.Option value="all">All Projects</Select.Option>
            {filteredProjects.map((project) => (
              <Select.Option key={project.id} value={project.id}>
                {project.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <PlanningCalendarView planningHook={planningHook} />

      <Drawer
        title="Create Planning"
        placement="right"
        onClose={() => setFormDrawerVisible(false)}
        open={formDrawerVisible}
        width={500}
      >
        <PlanningForm
          onSuccess={handleFormSuccess}
          onCancel={() => setFormDrawerVisible(false)}
          filteredProjects={filteredProjects}
          users={planningHook.users}
          usersLoading={planningHook.usersLoading}
        />
      </Drawer>

      <Modal
        title="Delete Plannings"
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={null}
        width={600}
      >
        <List
          dataSource={filteredPlanningsForDelete}
          loading={planningsLoading}
          renderItem={(item: IPlanning) => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Are you sure you want to delete this planning?"
                  onConfirm={() => handleDeletePlanning(item.id as number)}
                  okText="Delete"
                  cancelText="Cancel"
                >
                  <Button danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={`Project: ${
                  filteredProjects.find((p) => p.id === item.projectId)?.name ||
                  'N/A'
                }`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default Planning;
