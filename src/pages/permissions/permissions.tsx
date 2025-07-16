import { useList, useCreate, useDelete, CanAccess } from '@refinedev/core';
import { Table, Checkbox, Spin, Typography, Result } from 'antd';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IRole, IPermission, IRolePermission } from '../../interfaces';
import { usePermissionsMatrixStyles } from './permissions.styles';
import { UserRole } from '../../interfaces/user-role.enum';

const PermissionsMatrixContent = () => {
  const { styles } = usePermissionsMatrixStyles();
  const { data: roles, isLoading: isLoadingRoles } = useList<IRole>({
    resource: 'roles',
    pagination: { pageSize: 100 },
  });

  const { data: permissions, isLoading: isLoadingPermissions } =
    useList<IPermission>({
      resource: 'permissions',
      pagination: { pageSize: 100 },
    });

  const {
    data: rolePermissions,
    isLoading: isLoadingRolePermissions,
    refetch: refetchRolePermissions,
  } = useList<IRolePermission>({
    resource: 'role-permissions',
    pagination: { pageSize: 1000 },
  });

  const { mutate: createRolePermission } = useCreate<IRolePermission>();
  const { mutate: deleteRolePermission } = useDelete<IRolePermission>();
  const queryClient = useQueryClient();

  const handleCheckboxChange = (
    checked: boolean,
    role: IRole,
    permission: IPermission,
  ) => {
    if (role.name === UserRole.SuperAdmin) {
      return;
    }

    if (checked) {
      createRolePermission(
        {
          resource: 'role-permissions',
          values: { roleId: role.id, permissionId: permission.id },
        },
        {
          onSuccess: () => {
            refetchRolePermissions();
            queryClient.invalidateQueries();
          },
        },
      );
    } else {
      const link = rolePermissions?.data.find(
        (rp) => rp.roleId === role.id && rp.permissionId === permission.id,
      );
      if (link) {
        deleteRolePermission(
          {
            resource: 'role-permissions',
            id: link.id,
          },
          {
            onSuccess: () => {
              refetchRolePermissions();
              queryClient.invalidateQueries();
            },
          },
        );
      }
    }
  };

  const displayRoles =
    roles?.data.filter((role) => role.name !== UserRole.SuperAdmin) || [];

  const columns = [
    {
      title: 'Permission',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Typography.Text strong>{text}</Typography.Text>
      ),
      onCell: (record: IPermission) => ({
        className:
          record.description && record.description.length > 0
            ? styles.permissionCellClickable
            : styles.permissionCell,
      }),
    },
    ...(displayRoles.map((role) => ({
      title: <Typography.Text strong>{role.name}</Typography.Text>,
      key: role.id,
      align: 'center' as const,
      render: (_: any, record: IPermission) => {
        const isChecked = rolePermissions?.data.some(
          (rp) => rp.roleId === role.id && rp.permissionId === record.id,
        );

        return (
          <Checkbox
            checked={isChecked}
            onChange={(e) =>
              handleCheckboxChange(e.target.checked, role, record)
            }
          />
        );
      },
    })) || []),
    Table.EXPAND_COLUMN,
  ];

  if (isLoadingRoles || isLoadingPermissions || isLoadingRolePermissions) {
    return <Spin />;
  }

  return (
    <Table
      dataSource={permissions?.data}
      columns={columns}
      rowKey="id"
      pagination={false}
      bordered
      expandable={{
        expandedRowRender: (record) => (
          <p className={styles.descriptionParagraph}>{record.description}</p>
        ),
        rowExpandable: (record) =>
          !!(record.description && record.description.length > 0),
        expandRowByClick: true,
        expandIcon: () => null,
      }}
    />
  );
};

export const PermissionsMatrix = () => {
  return (
    <CanAccess
      resource="permissions"
      action="list"
      fallback={
        <Result
          status="403"
          title="Access Denied"
          subTitle="Only SuperAdmin can access this page."
        />
      }
    >
      <PermissionsMatrixContent />
    </CanAccess>
  );
};
