import { createStyles } from 'antd-style';

export const useScrollableListCardStyles = createStyles(() => ({
  cardContainer: {
    height: '400px',
  },
  contentContainer: {
    height: '320px',
    overflowY: 'auto',
  },
  itemContainer: {
    width: '100%',
  },
  itemContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: '12px',
  },
  tagContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  tag: {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    color: 'white',
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '40px 0',
  },
  tagWithColor: {
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '12px',
    fontWeight: '500',
  },
  overdueItem: {
    backgroundColor: '#fff2f0',
    border: '1px solid #ffccc7',
    borderRadius: '6px',
    padding: '8px 12px',
    margin: '4px 0',
  },
  overdueText: {
    color: '#cf1322',
    fontWeight: '600',
  },
  overdueSubtitle: {
    color: '#a8071a',
  },
}));
