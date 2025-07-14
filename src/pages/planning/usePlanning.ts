import { useState } from 'react';
import { useList, useDelete, useGetIdentity } from '@refinedev/core';
import dayjs, { Dayjs } from 'dayjs';
import { IUser } from '@interfaces/users';
import { IProject } from '@interfaces/project';
import { IPlanning } from '@interfaces/planning';
import { PlanningAssignment } from './types';
import { message } from 'antd';

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
  const { data: currentUser } = useGetIdentity<IUser>();

  const users = usersData?.data || [];
  const projects = projectsData?.data || [];
  const plannings = planningsData?.data || [];

  // Determine view mode based on user role
  const viewMode = currentUser?.role?.name === 'manager' ? 'manager' : 'user';

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

  const roleFilteredPlannings =
    viewMode === 'manager'
      ? plannings
      : plannings.filter(
          (planning) => planning.assignedUserId === currentUser?.id,
        );

  const filteredProjects =
    viewMode === 'manager'
      ? projects
      : projects.filter((project) =>
          project.members?.some(
            (member) => String(member.userId) === String(currentUser?.id),
          ),
        );

  const filteredAssignments = calendarAssignments.filter((assignment) => {
    const userMatch =
      viewMode === 'manager' || assignment.userId === currentUser?.id;

    const projectMatch =
      selectedProject === 'all' || assignment.projectId === selectedProject;

    return userMatch && projectMatch;
  });

  const filteredPlanningsForDelete = roleFilteredPlannings.filter(
    (planning) => {
      const projectMatch =
        selectedProject === 'all' || planning.projectId === selectedProject;
      const monthMatch = dayjs(planning.startDate).isSame(
        currentMonth,
        'month',
      );
      return projectMatch && monthMatch;
    },
  );

  const handleDeletePlanning = (planningId: number) => {
    deletePlanning(
      {
        resource: 'plannings',
        id: planningId,
      },
      {
        onSuccess: () => {
          message.success('Planning deleted successfully');
          setSelectedDayAssignments((prev) =>
            prev.filter(
              (assignment) => assignment.id !== planningId.toString(),
            ),
          );
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
    usersLoading,
    projectsLoading,
    planningsLoading,
    deleteLoading,
    filteredAssignments,
    filteredProjects,
    filteredPlanningsForDelete,
    viewMode,
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
