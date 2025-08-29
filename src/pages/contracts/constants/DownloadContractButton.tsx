import { FilePdfOutlined } from '@ant-design/icons';
import { useCustom } from '@refinedev/core';
import { Button } from 'antd';

export function DownloadContractButton({ id }: { id: number }) {
  const { refetch, isFetching } = useCustom<{ blob: Blob; filename: string }>({
    url: `contracts/${id}/generate-pdf`,
    method: 'get',
    meta: { responseType: 'blob' },
    queryOptions: { enabled: false }, // mos auto-fetch
  });

  const onClick = async () => {
    const res = await refetch();
    const payload = res.data?.data;
    if (!payload) return;

    const url = URL.createObjectURL(payload.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = payload.filename || `contract-${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      type="default"
      loading={isFetching}
      onClick={onClick}
      size="small"
      icon={<FilePdfOutlined />}
    />
  );
}
