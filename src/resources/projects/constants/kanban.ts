export const CARD_WIDTH = 200;
export const CARD_HEIGHT = 120;
export const COLUMN_WIDTH = CARD_WIDTH + 20; // 20px for padding/margin
export const CARD_MARGIN = 6;
export const COLUMN_GAP = 12;

export const STAGES = [
  { id: 'lead', title: 'Lead' },
  { id: 'qualified', title: 'Qualified' },
  { id: 'proposal', title: 'Proposal' },
  { id: 'negotiation', title: 'Negotiation' },
  { id: 'closed-won', title: 'Closed Won' },
  { id: 'closed-lost', title: 'Closed Lost' },
];

export const defaultContainers = [
  {
    id: 'lead',
    title: 'Lead',
    items: [
      { id: 'lead-1', content: 'Contact prospect' },
      { id: 'lead-2', content: 'Initial research' },
    ],
  },
  {
    id: 'qualified',
    title: 'Qualified',
    items: [{ id: 'qualified-1', content: 'Discovery call' }],
  },
  {
    id: 'proposal',
    title: 'Proposal',
    items: [{ id: 'proposal-1', content: 'Send proposal' }],
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    items: [{ id: 'negotiation-1', content: 'Negotiate terms' }],
  },
  {
    id: 'closed-won',
    title: 'Closed Won',
    items: [{ id: 'closed-won-1', content: 'Signed contract' }],
  },
  {
    id: 'closed-lost',
    title: 'Closed Lost',
    items: [{ id: 'closed-lost-1', content: 'Lost to competitor' }],
  },
];
