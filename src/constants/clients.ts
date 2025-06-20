export interface IClient {
  id: string;
  name: string;
  email?: string;
  company?: string;
  avatar?: string;
  isActive: boolean;
}

export const MOCK_CLIENTS: IClient[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    company: 'Acme Corp',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Acme',
    isActive: true,
  },
  {
    id: '2',
    name: 'Tech Solutions Inc',
    email: 'info@techsolutions.com',
    company: 'Tech Solutions',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Tech',
    isActive: true,
  },
  {
    id: '3',
    name: 'Global Enterprises',
    email: 'hello@globalent.com',
    company: 'Global Enterprises',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Global',
    isActive: true,
  },
  {
    id: '4',
    name: 'StartupXYZ',
    email: 'team@startupxyz.com',
    company: 'StartupXYZ',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=StartupXYZ',
    isActive: true,
  },
  {
    id: '5',
    name: 'Enterprise Solutions Ltd',
    email: 'support@enterprise.com',
    company: 'Enterprise Solutions',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Enterprise',
    isActive: true,
  },
  {
    id: '6',
    name: 'Digital Innovations',
    email: 'contact@digitalinnovations.com',
    company: 'Digital Innovations',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Digital',
    isActive: true,
  },
  {
    id: '7',
    name: 'Future Systems',
    email: 'info@futuresystems.com',
    company: 'Future Systems',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Future',
    isActive: false,
  },
  {
    id: '8',
    name: 'Cloud Services Group',
    email: 'hello@cloudservices.com',
    company: 'Cloud Services',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Cloud',
    isActive: true,
  },
];
