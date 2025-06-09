export const projectCardStyles = {
  card: {
    width: '100%',
    maxWidth: 220,
    height: 120,
    margin: '6px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 10,
    cursor: 'grab',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    background: 'inherit',
    color: 'inherit',
    border: '1px solid rgb(164, 164, 164)',
  },
  body: {
    padding: 12,
    height: '100%',
  },
  header: {
    borderBottom: '1px solid rgb(164, 164, 164)',
    padding: '6px 12px',
  },
  variant: 'outlined' as const,
};
