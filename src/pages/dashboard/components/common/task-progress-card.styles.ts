import { createStyles } from 'antd-style';

export const useTaskProgressCardStyles = createStyles(() => ({
  container: {
    padding: '20px 0',
  },
  progressSection: {
    marginBottom: 16,
  },
  statsSection: {
    marginTop: 16,
  },
  statContainer: {
    textAlign: 'center',
    padding: '8px 0',
  },
  statTitle: {
    margin: 0,
  },
  featureTitle: {
    margin: 0,
    color: 'var(--color-task-feature)',
    fontSize: '18px',
  },
  bugTitle: {
    margin: 0,
    color: 'var(--color-task-bug)',
    fontSize: '18px',
  },
  reviewTitle: {
    margin: 0,
    color: 'var(--color-task-review)',
    fontSize: '18px',
  },
  testingTitle: {
    margin: 0,
    color: 'var(--color-task-testing)',
    fontSize: '18px',
  },
  documentationTitle: {
    margin: 0,
    color: 'var(--color-task-documentation)',
    fontSize: '18px',
  },
  refactorTitle: {
    margin: 0,
    color: 'var(--color-task-refactor)',
    fontSize: '18px',
  },
  meetingTitle: {
    margin: 0,
    color: 'var(--color-task-meeting)',
    fontSize: '18px',
  },
  deploymentTitle: {
    margin: 0,
    color: 'var(--color-task-deployment)',
    fontSize: '18px',
  },
  researchTitle: {
    margin: 0,
    color: 'var(--color-task-research)',
    fontSize: '18px',
  },
  otherTitle: {
    margin: 0,
    color: 'var(--color-task-other)',
    fontSize: '18px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '20px',
    color: 'var(--color-text-secondary)',
  },
  rowWithMargin: {
    marginBottom: 16,
  },
  smallText: {
    fontSize: '12px',
  },
}));
