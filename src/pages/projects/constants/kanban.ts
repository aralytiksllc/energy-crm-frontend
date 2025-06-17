import { TaskType } from '../../tasks/types';

export const CARD_WIDTH = 200;
export const CARD_HEIGHT = 120;
export const COLUMN_WIDTH = CARD_WIDTH + 20;
export const CARD_MARGIN = 6;
export const COLUMN_GAP = 12;

const mockUser = {
  id: 1,
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=1',
};

const projectA = { id: 1, name: 'Project A' };
const projectB = { id: 2, name: 'Project B' };
const projectC = { id: 3, name: 'Project C' };

export { mockUser };

export const defaultContainers = [
  {
    projectId: 1,
    id: 'lead',
    title: 'Lead',
    items: [
      {
        id: 'lead-1',
        content: 'New Client Onboarding',
        description: 'Initial client onboarding process',
        task: {
          id: 1,
          title: 'Initial Client Contact',
          type: TaskType.EMAIL,
          isCompleted: false,
          description: 'Send welcome email and gather initial requirements',
          dueDate: new Date('2024-03-20'),
          project: projectA,
          assignedTo: [mockUser],
          createdBy: mockUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    projectId: 1,
    id: 'qualified',
    title: 'Qualified',
    items: [
      {
        id: 'qualified-1',
        content: 'E-commerce Platform Development',
        description: 'E-commerce platform development project',
        task: {
          id: 3,
          title: 'Requirements Gathering',
          type: TaskType.MEETING,
          isCompleted: true,
          description:
            'Detailed discussion of platform features and requirements',
          dueDate: new Date('2024-03-24'),
          project: projectA,
          assignedTo: [mockUser],
          createdBy: mockUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    projectId: 1,
    id: 'proposal',
    title: 'Proposal',
    items: [
      {
        id: 'proposal-1',
        content: 'Mobile App Development',
        description: 'Mobile application development project',
        task: {
          id: 5,
          title: 'Proposal Draft',
          type: TaskType.OTHER,
          isCompleted: false,
          description: 'Prepare detailed project proposal and timeline',
          dueDate: new Date('2024-03-26'),
          project: projectA,
          assignedTo: [mockUser],
          createdBy: mockUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    projectId: 1,
    id: 'negotiation',
    title: 'Negotiation',
    items: [
      {
        id: 'negotiation-1',
        content: 'Enterprise Software Integration',
        description: 'Enterprise software integration project',
        task: {
          id: 7,
          title: 'Contract Review',
          type: TaskType.MEETING,
          isCompleted: false,
          description: 'Review and negotiate contract terms',
          dueDate: new Date('2024-03-28'),
          project: projectA,
          assignedTo: [mockUser],
          createdBy: mockUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    projectId: 1,
    id: 'closed-won',
    title: 'Closed Won',
    items: [
      {
        id: 'closed-won-1',
        content: 'Website Redesign Project',
        description: 'Website redesign and development project',
        task: {
          id: 9,
          title: 'Project Kickoff',
          type: TaskType.MEETING,
          isCompleted: true,
          description: 'Initial project kickoff meeting with all stakeholders',
          dueDate: new Date('2024-03-30'),
          project: projectA,
          assignedTo: [mockUser],
          createdBy: mockUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    projectId: 1,
    id: 'closed-lost',
    title: 'Closed Lost',
    items: [
      {
        id: 'closed-lost-1',
        content: 'CRM Implementation',
        description: 'CRM system implementation project',
        task: {
          id: 11,
          title: 'Competitor Analysis',
          type: TaskType.OTHER,
          isCompleted: true,
          description: 'Analyze why we lost to competitor',
          dueDate: new Date('2024-04-01'),
          project: projectA,
          assignedTo: [mockUser],
          createdBy: mockUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    projectId: 2,
    id: 'lead',
    title: 'Lead',
    items: [
      {
        id: 'lead-2',
        content: 'B2B Outreach',
        description: 'Reach out to potential B2B clients',
        task: {
          id: 13,
          title: 'Send B2B Emails',
          type: TaskType.EMAIL,
          isCompleted: false,
          description: 'Send introductory emails to B2B leads',
          dueDate: new Date('2024-04-10'),
          project: projectB,
          assignedTo: [mockUser],
          createdBy: mockUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    projectId: 2,
    id: 'qualified',
    title: 'Qualified',
    items: [
      {
        id: 'qualified-2',
        content: 'B2B Demo',
        description: 'Demo for B2B client',
        task: {
          id: 14,
          title: 'Prepare Demo Slides',
          type: TaskType.OTHER,
          isCompleted: false,
          description: 'Create slides for B2B demo',
          dueDate: new Date('2024-04-12'),
          project: projectB,
          assignedTo: [mockUser],
          createdBy: mockUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    projectId: 2,
    id: 'proposal',
    title: 'Proposal',
    items: [
      {
        id: 'proposal-2',
        content: 'B2B Pricing',
        description: 'Pricing for B2B client',
        task: {
          id: 15,
          title: 'Draft Pricing Sheet',
          type: TaskType.OTHER,
          isCompleted: false,
          description: 'Draft pricing for B2B proposal',
          dueDate: new Date('2024-04-13'),
          project: projectB,
          assignedTo: [mockUser],
          createdBy: mockUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    projectId: 2,
    id: 'closed-won',
    title: 'Closed Won',
    items: [
      {
        id: 'closed-won-2',
        content: 'B2B Launch',
        description: 'Launch for B2B client',
        task: {
          id: 16,
          title: 'B2B Launch',
          type: TaskType.OTHER,
          isCompleted: false,
          description: 'Launch for B2B client',
          dueDate: new Date('2024-04-20'),
          project: projectB,
          assignedTo: [mockUser],
          createdBy: mockUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    projectId: 3,
    id: 'lead',
    title: 'Lead',
    items: [
      {
        id: 'lead-3',
        content: 'Initial Analytics Setup',
        description: 'Setup analytics for new internal tool',
        task: {
          id: 21,
          title: 'Setup Google Analytics',
          type: TaskType.OTHER,
          isCompleted: false,
          description: 'Integrate Google Analytics for Project C',
          dueDate: new Date('2024-04-15'),
          project: projectC,
          assignedTo: [mockUser],
          createdBy: mockUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    projectId: 3,
    id: 'closed-won',
    title: 'Closed Won',
    items: [
      {
        id: 'closed-won-3',
        content: 'Analytics Go Live',
        description: 'Go live for analytics tool',
        task: {
          id: 22,
          title: 'Analytics Go Live',
          type: TaskType.OTHER,
          isCompleted: false,
          description: 'Go live for analytics tool',
          dueDate: new Date('2024-04-25'),
          project: projectC,
          assignedTo: [mockUser],
          createdBy: mockUser,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
];
