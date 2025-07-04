import { useState } from 'react';
import { useList, useDelete, useGetIdentity } from '@refinedev/core';
import dayjs, { Dayjs } from 'dayjs';
import { IUser } from '@interfaces/users';
import { IProject } from '@interfaces/project';
import { IPlanning } from '@interfaces/planning';
import { PlanningAssignment } from './types';
import { message } from 'antd';
import { useViewMode } from '@contexts/ViewModeContext';

export const usePlanning = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedProject, setSelectedProject] = useState<number | 'all'>('all');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formDrawerVisible, setFormDrawerVisible] = useState(false);
  const [selectedDayAssignments, setSelectedDayAssignments] = useState<
    PlanningAssignment[]
  >([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { viewMode } = useViewMode();

  const { data: identity } = useGetIdentity<IUser>();
  const { data: usersData, isLoading: usersLoading } = useList<IUser>({
    resource: 'users',
    pagination: { mode: 'off' },
  });

  const { data: projectsData, isLoading: projectsLoading } = useList<IProject>({
    resource: 'projects',
    pagination: { mode: 'off' },
  });

  const {
    data: planningsData,
    isLoading: planningsLoading,
    refetch: refetchPlannings,
  } = useList<IPlanning>({
    resource: 'plannings',
    pagination: { mode: 'off' },
  });

  const { mutate: deletePlanning, isLoading: deleteLoading } = useDelete();

  const users = usersData?.data || [];
  const projects = projectsData?.data || [];
  const plannings = planningsData?.data || [];

  const calendarAssignments: PlanningAssignment[] = plannings.map(
    (planning) => ({
      id: planning.id.toString(),
      userId: planning.assignedUserId,
      projectId: planning.projectId,
      startDate: planning.startDate,
      endDate: planning.endDate,
      title: planning.title,
      description: planning.description,
      notes: planning.notes,
      isCompleted: planning.isCompleted,
      completedDate: planning.completedDate,
      status: planning.isCompleted ? 'completed' : 'active',
      priority: 'medium',
    }),
  );

  const filteredAssignments = calendarAssignments.filter((assignment) => {
    const projectMatch =
      selectedProject === 'all' || assignment.projectId === selectedProject;
    const userMatch =
      viewMode === 'user' ? assignment.userId === identity?.id : true;
    return projectMatch && userMatch;
  });

  const filteredProjects =
    viewMode === 'user'
      ? projects.filter((project) =>
          calendarAssignments.some(
            (assignment) =>
              assignment.projectId === project.id &&
              assignment.userId === identity?.id,
          ),
        )
      : projects;

  const filteredPlanningsForDelete = plannings.filter((planning) => {
    const projectMatch =
      selectedProject === 'all' || planning.projectId === selectedProject;
    return projectMatch;
  });

  const handleDeletePlanning = (planningId: number) => {
    deletePlanning(
      {
        resource: 'plannings',
        id: planningId,
      },
      {
        onSuccess: () => {
          message.success('Planning deleted successfully');
          refetchPlannings();
        },
        onError: (error) => {
          message.error('Failed to delete planning');
          console.error('Delete planning error:', error);
        },
      },
    );
  };

  const handleDayClick = (date: Dayjs, assignments: PlanningAssignment[]) => {
    setSelectedDayAssignments(assignments);
    setDrawerVisible(true);
  };

  const handleMonthChange = (date: Dayjs | null) => {
    if (date) {
      setCurrentMonth(date);
      setSelectedDate(date);
    }
  };

  const getProjectInfo = (projectId: string | number) => {
    return projects.find((project) => project.id === projectId);
  };

  const getUserInfo = (userId: string | number) => {
    return users.find((user) => user.id === userId);
  };

  const handleFormSuccess = () => {
    setFormDrawerVisible(false);
    refetchPlannings();
  };

  return {
    users,
    projects,
    plannings,
    selectedDate,
    currentMonth,
    selectedProject,
    drawerVisible,
    formDrawerVisible,
    selectedDayAssignments,
    deleteModalVisible,
    viewMode,
    usersLoading,
    projectsLoading,
    planningsLoading,
    deleteLoading,
    filteredAssignments,
    filteredProjects,
    filteredPlanningsForDelete,
    identity,
    setSelectedDate,
    setCurrentMonth,
    setSelectedProject,
    setDrawerVisible,
    setFormDrawerVisible,
    setSelectedDayAssignments,
    setDeleteModalVisible,
    handleDeletePlanning,
    handleDayClick,
    handleMonthChange,
    getProjectInfo,
    getUserInfo,
    handleFormSuccess,
    refetchPlannings,
  };
};
