// External imports
import * as React from 'react';
import { Dropdown, Button, type MenuProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';

// Internal imports
import type { DropdownActionsProps } from './dropdown-actions.types';
import { useStyles } from './dropdown-actions.styles';

export const DropdownActions: React.FC<DropdownActionsProps> = (props) => {
  const { items, placement = 'bottom', onItemClick } = props;

  const { styles } = useStyles();

  const handleMenuClick = React.useCallback(
    (e: MenuInfo) => {
      e.domEvent.stopPropagation();
      if (onItemClick) onItemClick(e.key);
    },
    [onItemClick],
  );

  const handleMenuPointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
      e.stopPropagation();
    },
    [],
  );

  const handleButtonPointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.stopPropagation();
    },
    [],
  );

  const handleButtonClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
    },
    [],
  );

  const menuProps: MenuProps = {
    onPointerDown: handleMenuPointerDown,
    onClick: handleMenuClick,
    items,
  };

  return (
    <Dropdown
      trigger={['click']}
      placement={placement}
      arrow={{ pointAtCenter: true }}
      menu={menuProps}
    >
      <Button
        onPointerDown={handleButtonPointerDown}
        icon={<MoreOutlined className={styles.icon} />}
        onClick={handleButtonClick}
        shape="circle"
        type="text"
      />
    </Dropdown>
  );
};
