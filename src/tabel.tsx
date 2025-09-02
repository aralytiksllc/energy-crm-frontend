import React, { useMemo, useState } from "react";
import {
  Typography,
  Space,
  Button,
  Tag,
  Table,
  Checkbox,
  Dropdown,
  MenuProps,
  Select,
  theme,
} from "antd";
import {
  MoreOutlined,
  DownOutlined,
  LoadingOutlined,
  DoubleLeftOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons"; // DragOutlined u hoq
import { createStyles } from "antd-style";

/**
 * Same UI, now:
 * - removed drag handle column
 * - 20 rows per tab (mock data)
 * - default page size = 20
 */

const { Text } = Typography;

const useStyles = createStyles(({ token }) => ({
  wrap: {
    borderRadius: 14,
    border: "1px solid #E6E6E6",
    background: "#fff",
    boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 10px 30px -16px rgba(0,0,0,0.08)",
  },
  tabsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    gap: 8,
  },
  tabsLeft: { display: "flex", gap: 8, flexWrap: "wrap" },
  pill: {
    background: "#F5F5F5",
    border: "1px solid #E6E6E6",
    borderRadius: 999,
    padding: "6px 12px",
    lineHeight: 1,
    cursor: "pointer",
    userSelect: "none",
  },
  pillActive: { background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.04)", border: "1px solid #E6E6E6" },
  actions: { display: "flex", gap: 8 },
  ghostBtn: { borderColor: "#E6E6E6" },
  body: { padding: 0 },
  headCell: { color: "#6F6F6F", fontWeight: 500 },
  tagGrey: { background: "#F3F4F6", border: 0, color: "#666", borderRadius: 999 },
  statusChip: {
    background: "#F3F4F6",
    border: 0,
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "2px 10px",
  },
  dot: { width: 8, height: 8, borderRadius: 999, background: "#21C16B", display: "inline-block" },
  spinner: { color: "#999" },
  handle: { color: "#BFBFBF", fontSize: 16 },
  rowBtn: { color: "#999" },
  footerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderTop: "1px solid #EFEFEF",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    background: "#fff",
  },
  linkish: { textDecoration: "underline" },
}));

// -------- Shared Row Type --------
type Row = {
  key: string;
  header: string;                 // Client / Meter / Contract
  sectionType: string;            // Segment / Client
  status: "Done" | "In Process";  // Active-ish visual
  target: number;                 // metric (consumption / kWh / days left)
  limit: number | string;         // second metric (contracted / peak / signedOn)
  reviewer?: string;              // owner
  signedOn?: string;              // contracts
};

// -------- 20-row Mock Data per tab --------
const mkClients = (): Row[] =>
  Array.from({ length: 20 }, (_, i) => {
    const idx = i + 1;
    const segments = ["Manufacturing", "Retail", "Healthcare", "Agriculture", "IT Services"];
    const seg = segments[i % segments.length];
    return {
      key: `c${idx}`,
      header: `Client ${idx}`,
      sectionType: seg,
      status: i % 5 === 2 ? "In Process" : "Done",
      target: 5000 - i * 120, // Consumption (MWh)
      limit: 5200 - i * 110,  // Contracted (MWh)
      reviewer: ["Ardian Krasniqi", "Dafina Gashi", "Blend Berisha", "Ilir Fetahu"][i % 4],
    };
  });

const mkMeters = (): Row[] =>
  Array.from({ length: 20 }, (_, i) => {
    const idx = i + 1;
    const clients = ["Client 1", "Client 2", "Client 3", "Client 4", "Client 5"];
    return {
      key: `m${idx}`,
      header: `MP-${String(1000 + idx).padStart(6, "0")}-KS`,
      sectionType: clients[i % clients.length],
      status: i % 6 === 1 ? "In Process" : "Done",
      target: 900 - i * 10, // Monthly kWh
      limit: 450 - i * 5,   // Peak kW
      reviewer: ["M. Dervishi", "R. Shala", "E. Gashi"][i % 3],
    };
  });

const mkContracts = (): Row[] =>
  Array.from({ length: 20 }, (_, i) => {
    const idx = i + 1;
    const clients = ["Client 1", "Client 2", "Client 3", "Client 4", "Client 5"];
    const baseDate = new Date(2023, 8, 15); // 2023-09-15
    const d = new Date(baseDate.getTime() + i * 86400000 * 7); // weekly steps
    const iso = d.toISOString().slice(0, 10);
    return {
      key: `k${idx}`,
      header: `CTR-2023-${String(90 + idx).padStart(3, "0")}`,
      sectionType: clients[i % clients.length],
      status: "In Process",
      target: 10 + i,      // Days to expiry
      limit: iso,
      reviewer: "Legal Ops",
      signedOn: iso,
    };
  });

const topClients = mkClients();
const topMeters = mkMeters();
const contractsExpiring = mkContracts();

// -------- Helpers --------
const StatusChip: React.FC<{ status: Row["status"] }> = ({ status }) => {
  const { styles } = useStyles();
  return (
    <span className={styles.statusChip}>
      {status === "Done" ? <span className={styles.dot} /> : <LoadingOutlined className={styles.spinner} />}
      <span>{status === "Done" ? "Active" : "In Process"}</span>
    </span>
  );
};

const AssignButton: React.FC = () => {
  const items: MenuProps["items"] = [
    { key: "eddie", label: "Eddie Lake" },
    { key: "jamik", label: "Jamik Tashpulatov" },
    { key: "dana", label: "Dana" },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button size="small">Assign reviewer <DownOutlined /></Button>
    </Dropdown>
  );
};

// -------- Component --------
type TabKey = "clients" | "meters" | "contracts";

const OutlineTableClone: React.FC = () => {
  const { token } = theme.useToken();
  const { styles } = useStyles();

  const [activeTab, setActiveTab] = useState<TabKey>("clients");
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [pageSize, setPageSize] = useState(20); // default 20
  const [page, setPage] = useState(1);

  const dataset = useMemo(() => {
    if (activeTab === "clients") return topClients;
    if (activeTab === "meters") return topMeters;
    return contractsExpiring;
  }, [activeTab]);

  const total = dataset.length;
  const pages = Math.ceil(Math.max(1, total) / pageSize);

  // Columns: removed drag column; everything else identik
  const columns = useMemo(() => {
    const basePrefix = [
      {
        title: "",
        dataIndex: "sel",
        width: 38,
        render: (_: any, r: Row) => (
          <Checkbox
            checked={selectedKeys.includes(r.key)}
            onChange={(e) =>
              setSelectedKeys((prev) =>
                e.target.checked ? [...prev, r.key] : prev.filter((x) => x !== r.key)
              )
            }
          />
        ),
      },
    ];

    if (activeTab === "clients") {
      return [
        ...basePrefix,
        { title: <span className={styles.headCell}>Client</span>, dataIndex: "header", render: (v: string) => <a>{v}</a> },
        { title: <span className={styles.headCell}>Segment</span>, dataIndex: "sectionType", render: (v: string) => <Tag className={styles.tagGrey}>{v}</Tag> },
        { title: <span className={styles.headCell}>Status</span>, dataIndex: "status", render: (v: Row["status"]) => <StatusChip status={v} /> },
        { title: <span className={styles.headCell}>Consumption (MWh)</span>, dataIndex: "target" },
        { title: <span className={styles.headCell}>Contracted (MWh)</span>, dataIndex: "limit" },
        { title: <span className={styles.headCell}>Account Manager</span>, dataIndex: "reviewer", render: (v: string | undefined) => (v ? v : <AssignButton />) },
        { title: "", dataIndex: "menu", width: 40, align: "right", render: () => <Button type="text" size="small" icon={<MoreOutlined />} className={styles.rowBtn} /> },
      ];
    }

    if (activeTab === "meters") {
      return [
        ...basePrefix,
        { title: <span className={styles.headCell}>Metering Point</span>, dataIndex: "header", render: (v: string) => <a>{v}</a> },
        { title: <span className={styles.headCell}>Client</span>, dataIndex: "sectionType", render: (v: string) => <Tag className={styles.tagGrey}>{v}</Tag> },
        { title: <span className={styles.headCell}>Status</span>, dataIndex: "status", render: (v: Row["status"]) => <StatusChip status={v} /> },
        { title: <span className={styles.headCell}>Monthly kWh</span>, dataIndex: "target" },
        { title: <span className={styles.headCell}>Peak kW</span>, dataIndex: "limit" },
        { title: <span className={styles.headCell}>Assigned Tech</span>, dataIndex: "reviewer", render: (v: string | undefined) => (v ? v : <AssignButton />) },
        { title: "", dataIndex: "menu", width: 40, align: "right", render: () => <Button type="text" size="small" icon={<MoreOutlined />} className={styles.rowBtn} /> },
      ];
    }

    // contracts
    return [
      ...basePrefix,
      { title: <span className={styles.headCell}>Contract</span>, dataIndex: "header", render: (v: string) => <a>{v}</a> },
      { title: <span className={styles.headCell}>Client</span>, dataIndex: "sectionType", render: (v: string) => <Tag className={styles.tagGrey}>{v}</Tag> },
      { title: <span className={styles.headCell}>Status</span>, dataIndex: "status", render: (v: Row["status"]) => <StatusChip status={v} /> },
      { title: <span className={styles.headCell}>Days to Expiry</span>, dataIndex: "target" },
      {
        title: <span className={styles.headCell}>Signed On</span>,
        dataIndex: "signedOn",
        render: (_: any, r: Row) => (r.signedOn ? r.signedOn : r.limit),
      },
      { title: <span className={styles.headCell}>Owner</span>, dataIndex: "reviewer", render: (v: string | undefined) => (v ? v : <AssignButton />) },
      { title: "", dataIndex: "menu", width: 40, align: "right", render: () => <Button type="text" size="small" icon={<MoreOutlined />} className={styles.rowBtn} /> },
    ];
  }, [activeTab, selectedKeys, styles]);

  const data = useMemo(() => dataset, [dataset]);

  // counts for pills
  const clientsCount = topClients.length;      // 20
  const metersCount = topMeters.length;        // 20
  const contractsCount = contractsExpiring.length; // 20

  return (
    <div className={styles.wrap}>
      {/* Tabs row */}
      <div className={styles.tabsRow}>
        <div className={styles.tabsLeft}>
          <div
            className={`${styles.pill} ${activeTab === "clients" ? styles.pillActive : ""}`}
            onClick={() => { setActiveTab("clients"); setSelectedKeys([]); setPage(1); }}
          >
            Top Clients <Tag style={{ marginLeft: 6 }} className={styles.tagGrey}>{clientsCount}</Tag>
          </div>
          <div
            className={`${styles.pill} ${activeTab === "meters" ? styles.pillActive : ""}`}
            onClick={() => { setActiveTab("meters"); setSelectedKeys([]); setPage(1); }}
          >
            Top Metering Points <Tag style={{ marginLeft: 6 }} className={styles.tagGrey}>{metersCount}</Tag>
          </div>
          <div
            className={`${styles.pill} ${activeTab === "contracts" ? styles.pillActive : ""}`}
            onClick={() => { setActiveTab("contracts"); setSelectedKeys([]); setPage(1); }}
          >
            Contracts Expiring <Tag style={{ marginLeft: 6 }} className={styles.tagGrey}>{contractsCount}</Tag>
          </div>
        </div>
        <div className={styles.actions}>
          <Button className={styles.ghostBtn}>Customize Columns <DownOutlined /></Button>
          <Button type="default">+ Add Section</Button>
        </div>
      </div>

      {/* Table */}
      <Table
        rowKey="key"
        size="small"
        dataSource={data}
        columns={columns as any}
        pagination={false}
        style={{ borderTop: "1px solid #EFEFEF" }}
      />

      {/* Footer */}
      <div className={styles.footerBar}>
        <Text type="secondary">{selectedKeys.length} of {total} row(s) selected.</Text>
        <Space align="center" size={12}>
          <Space>
            <Text type="secondary">Rows per page</Text>
            <Select
              size="small"
              value={pageSize}
              onChange={(v) => { setPageSize(v); setPage(1); }}
              style={{ width: 88 }}
              options={[10, 20, 25, 50].map((n) => ({ value: n, label: String(n) }))}
            />
          </Space>
          <Text>Page {page} of {Math.max(1, Math.ceil(total / pageSize))}</Text>
          <Space>
            <Button size="small" disabled={page===1} onClick={()=> setPage(1)} icon={<DoubleLeftOutlined />} />
            <Button size="small" disabled={page===1} onClick={()=> setPage(p=> Math.max(1, p-1))} icon={<LeftOutlined />} />
            <Button size="small" disabled={page>=Math.ceil(total / pageSize)} onClick={()=> setPage(p=> Math.min(Math.ceil(total / pageSize), p+1))} icon={<RightOutlined />} />
            <Button size="small" disabled={page>=Math.ceil(total / pageSize)} onClick={()=> setPage(Math.ceil(total / pageSize))} icon={<DoubleRightOutlined />} />
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default OutlineTableClone;
