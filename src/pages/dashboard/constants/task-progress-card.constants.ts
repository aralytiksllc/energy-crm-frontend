import { TaskType } from '@interfaces/task-type.enum';

export const TASK_TYPE_CONFIG = {
  [TaskType.FEATURE]: {
    label: 'Features',
    color: 'var(--color-task-feature)',
    className: 'featureTitle',
  },
  [TaskType.BUG]: {
    label: 'Bugs',
    color: 'var(--color-task-bug)',
    className: 'bugTitle',
  },
  [TaskType.CODE_REVIEW]: {
    label: 'Reviews',
    color: 'var(--color-task-review)',
    className: 'reviewTitle',
  },
  [TaskType.TESTING]: {
    label: 'Testing',
    color: 'var(--color-task-testing)',
    className: 'testingTitle',
  },
  [TaskType.DOCUMENTATION]: {
    label: 'Documentation',
    color: 'var(--color-task-documentation)',
    className: 'documentationTitle',
  },
  [TaskType.REFACTOR]: {
    label: 'Refactor',
    color: 'var(--color-task-refactor)',
    className: 'refactorTitle',
  },
  [TaskType.MEETING]: {
    label: 'Meetings',
    color: 'var(--color-task-meeting)',
    className: 'meetingTitle',
  },
  [TaskType.DEPLOYMENT]: {
    label: 'Deployment',
    color: 'var(--color-task-deployment)',
    className: 'deploymentTitle',
  },
  [TaskType.RESEARCH]: {
    label: 'Research',
    color: 'var(--color-task-research)',
    className: 'researchTitle',
  },
  [TaskType.OTHER]: {
    label: 'Other',
    color: 'var(--color-task-other)',
    className: 'otherTitle',
  },
};
