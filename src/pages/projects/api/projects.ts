import { httpClient } from '@/helpers/http-client';
import type {
  IProject,
  CreateProjectDto,
  UpdateProjectDto,
} from '../types/types';

export interface ProjectSummary {
  id: number;
  name: string;
  description?: string;
  status: string;
  isActive: boolean;
  customerId: number;
  customer?: {
    id: number;
    name: string;
  };
}

export interface ProjectsPagedResponse {
  items: ProjectSummary[];
  total: number;
  current: number;
  pageSize: number;
}

// Get all projects (summary for dropdowns)
export const getProjects = async (): Promise<ProjectSummary[]> => {
  try {
    const response = await httpClient.get('projects').json<any>();

    if (!response) {
      return [];
    }

    // Handle paginated response format: {items: [...], total: X, current: Y, pageSize: Z}
    if (response.items && Array.isArray(response.items)) {
      return response.items;
    }

    // Handle direct array response format: [...]
    if (Array.isArray(response)) {
      return response;
    }

    return [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; // Return empty array on error
  }
};

// Get all projects (full data)
export const getAllProjects = async (): Promise<IProject[]> => {
  const response = await httpClient.get('projects').json<IProject[]>();
  return response;
};

// Get single project by ID
export const getProject = async (id: number): Promise<IProject> => {
  const response = await httpClient.get(`projects/${id}`).json<IProject>();
  return response;
};

// Create new project
export const createProject = async (
  data: CreateProjectDto,
): Promise<IProject> => {
  const response = await httpClient
    .post('projects', { json: data })
    .json<IProject>();
  return response;
};

// Update project
export const updateProject = async (
  id: number,
  data: UpdateProjectDto,
): Promise<IProject> => {
  const response = await httpClient
    .patch(`projects/${id}`, { json: data })
    .json<IProject>();
  return response;
};

// Delete project
export const deleteProject = async (id: number): Promise<void> => {
  await httpClient.delete(`projects/${id}`);
};
