import { createStyles } from 'antd-style';

export const usePipelineStatusStyles = createStyles(() => ({
  card: {
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid var(--color-border)',
    marginBottom: 24,
    '.ant-card-body': {
      padding: '24px',
    },
  },
  header: {
    marginBottom: 24,
  },
  title: {
    margin: 0,
    color: 'var(--color-text-primary)',
  },
  subtitle: {
    color: 'var(--color-text-secondary)',
    fontSize: 14,
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statText: {
    fontSize: 16,
  },
  progressBar: {
    background: 'var(--color-bg-lightest)',
    borderRadius: 8,
    height: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  progressSegment: {
    position: 'absolute',
    height: '100%',
    transition: 'all 0.3s ease',
  },
  stageContainer: {
    textAlign: 'center',
  },
  stageName: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'var(--color-text-secondary)',
    display: 'block',
    marginBottom: 8,
  },
  stageCount: {
    fontSize: 24,
    fontWeight: 'bold',
    display: 'block',
  },
}));
