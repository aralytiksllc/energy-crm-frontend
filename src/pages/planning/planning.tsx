import React from 'react';
import {
  Button,
  Typography,
  DatePicker,
  Space,
  Select,
  Modal,
  Drawer,
} from 'antd';
import {
  CalendarOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { IPlanning } from '@interfaces/planning';
import PlanningForm from './components/planning-form';
import { createStyles } from './planning.styles';
import { usePlanning } from './usePlanning';
import { PlanningCalendarView } from './components/PlanningCalendarView';

const { Title, Text } = Typography;

export const Planning: React.FC = () => {
  const { styles } = createStyles();
  const planningHook = usePlanning();
  const {
    users,
    formDrawerVisible,
    deleteModalVisible,
    planningsLoading,
    deleteLoading,
    filteredProjects,
    currentMonth,
    selectedProject,
    viewMode,
    filteredPlanningsForDelete,
    setFormDrawerVisible,
    setDeleteModalVisible,
    handleMonthChange,
    setSelectedProject,
    handleDeletePlanning,
    handleFormSuccess,
    refetchPlannings,
  } = planningHook;

  return (
    <div className={styles.planningContainer}>
      <div className={styles.pageHeader}>
        <Title level={2} className={styles.pageTitle}>
          <CalendarOutlined />
          Planning Calendar
        </Title>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setFormDrawerVisible(true)}
            className={styles.createButton}
          >
            Create Planning
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => setDeleteModalVisible(true)}
            disabled={filteredPlanningsForDelete.length === 0}
            className={styles.deleteButton}
          >
            Delete Planning
          </Button>
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
        />
      </Drawer>

      <Modal
        title="Confirm Deletion"
        open={deleteModalVisible}
        onOk={() => {
          filteredPlanningsForDelete.forEach((planning: IPlanning) => {
            handleDeletePlanning(planning.id as number);
          });
          setDeleteModalVisible(false);
        }}
        onCancel={() => setDeleteModalVisible(false)}
        confirmLoading={planningsLoading || deleteLoading}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete all plannings for the selected
          project?
        </p>
      </Modal>
    </div>
  );
};

export default Planning;
