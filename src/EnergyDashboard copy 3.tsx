import React, { useEffect, useMemo, useState } from "react";
import {
  ConfigProvider,
  Layout,
  Menu,
  Card,
  Typography,
  theme,
  DatePicker,
  Segmented,
  Space,
  Table,
  Tabs,
  Tag,
  Dropdown,
  Button,
  Select,
  Skeleton,
  Grid,
  Breadcrumb,
  Divider,
} from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  SettingOutlined,
  FilterOutlined,
  UserOutlined,
  MoreOutlined,
  EllipsisOutlined,
  PlusOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { createStyles } from "antd-style";

/**
 * Pixel-perfect v0-style dashboard clone
 * Focus: Monochrome UI, light borders, airy spacing, KPI cards, greyscale area chart, tabs row, clean table
 */

const { useToken } = theme;
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// ---------- Types ----------

type Timeframe = "3m" | "30d" | "7d";

interface SeriesPoint { date: string; a: number; b: number; line: number }
interface OutlineRow { key: string; header: string; sectionType: string; status: "Done" | "In Process"; target: number; limit: number; reviewer?: string }

interface FiltersState { range: [Dayjs, Dayjs]; timeframe: Timeframe }

// ---------- Styling ----------

const useStyles = createStyles(({ token }) => ({
  app: {
    height: "100dvh",
    background: token.colorBgLayout,
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
  },
  sider: { borderInlineEnd: `${token.lineWidth}px solid ${token.colorBorderSecondary}` },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: token.paddingLG,
    background: token.colorBgElevated,
    borderBottom: `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
  },
  topbarLeft: { display: "flex", alignItems: "center", gap: 8 },
  toolbar: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
  contentWrap: { height: "100%", overflow: "hidden" },
  contentInner: { height: "100%", overflow: "auto", padding: 16 },
  grid4: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 },
  kpiCard: { borderRadius: 10 },
  kpiHeader: { display: "flex", justifyContent: "space-between", alignItems: "baseline" },
  kpiChange: { background: token.colorFillQuaternary, border: 0, height: 24 },
  kpiFooter: { color: token.colorTextTertiary, fontSize: token.fontSizeSM },
  chartCard: { marginTop: 12, borderRadius: 10 },
  tabsBar: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, background: token.colorBgElevated, border: `1px solid ${token.colorBorderSecondary}`, borderRadius: 10, padding: 8 },
  subtleBtn: { borderColor: token.colorBorderSecondary },
}));

// ---------- Utilities ----------

const eur = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function defaultRange(kind: Timeframe): [Dayjs, Dayjs] {
  const end = dayjs().endOf("day");
  if (kind === "3m") return [end.subtract(3, "month").startOf("day"), end];
  if (kind === "30d") return [end.subtract(30, "day").startOf("day"), end];
  return [end.subtract(7, "day").startOf("day"), end];
}

// ---------- Mock data (for demo) ----------

async function fetchOutline(): Promise<OutlineRow[]> {
  const names = [
    "Cover page",
    "Table of contents",
    "Executive summary",
    "Technical approach",
    "Capabilities",
    "Integration with existing systems",
    "Innovation and Advantages",
    "Overview of ERP's Innovative Solutions",
    "Advanced Algorithms and Machine Learning",
  ];
  return names.map((n, i) => ({
    key: String(i + 1),
    header: n,
    sectionType: i===0?"Cover page": i===1?"Table of contents": i%2?"Narrative":"Narrative",
    status: i === 5 ? "In Process" : "Done",
    target: [18,29,13,27,20,19,25,7,30][i] ?? 10,
    limit: [5,24,13,23,8,21,26,23,28][i] ?? 5,
    reviewer: ["Eddie Lake","Eddie Lake","Eddie Lake","Jamik Tashpulatov","Jamik Tashpulatov",undefined,undefined,undefined,undefined][i],
  }));
}

async function fetchSeries(range: [Dayjs,Dayjs]): Promise<SeriesPoint[]> {
  const days = Math.max(1, range[1].diff(range[0], "day") + 1);
  const arr: SeriesPoint[] = [];
  for (let i=0;i<days;i++){
    const d = range[0].add(i, "day");
    const base = 60 + Math.sin(i/4)*18 + (i%7===0?25:0);
    const hill = 38 + Math.cos(i/5)*12 + (i%9===0?18:0);
    const line = base + hill/3 + (i%6===0?12:0);
    arr.push({ date: d.format("YYYY-MM-DD"), a: Math.max(12, Math.round(hill)), b: Math.max(12, Math.round(base)), line: Math.round(line) });
  }
  return arr;
}

// ---------- Reusable Components ----------

const KPI: React.FC<{ title: string; value: string; change: string; footer: string; highlighted?: boolean }>=({title,value,change,footer,highlighted})=>{
  const { styles } = useStyles();
  return (
    <Card className={styles.kpiCard} bordered bodyStyle={{ padding: 16, background: highlighted?"rgba(22,119,255,0.06)":"inherit" }}>
      <div className={styles.kpiHeader}>
        <Text type="secondary">{title}</Text>
        <Tag className={styles.kpiChange}>{change}</Tag>
      </div>
      <Title level={3} style={{ margin: 0 }}>{value}</Title>
      <div className={styles.kpiFooter}>{footer}</div>
    </Card>
  );
};

// ---------- Main Component ----------

const V0CloneDashboard: React.FC = () => {
  const { token } = useToken();
  const { styles } = useStyles();

  const [collapsed, setCollapsed] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({ range: defaultRange("3m"), timeframe: "3m" });
  const [series, setSeries] = useState<SeriesPoint[] | null>(null);
  const [outline, setOutline] = useState<OutlineRow[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ setLoading(true); Promise.all([fetchSeries(filters.range), fetchOutline()]).then(([s,o])=>{ setSeries(s); setOutline(o); setLoading(false); }); },[filters]);

  const menu: MenuProps["items"] = [
    { key: "dash", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "lifecycle", icon: <ThunderboltOutlined />, label: "Lifecycle" },
    { key: "analytics", icon: <BarChartOutlined />, label: "Analytics" },
    { type: "group", label: "Documents" },
    { key: "data", icon: <DatabaseOutlined />, label: "Data Library" },
    { key: "reports", icon: <FileTextOutlined />, label: "Reports" },
    { type: "group", label: "Settings" },
    { key: "prefs", icon: <SettingOutlined />, label: "Preferences" },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 13,
          borderRadius: 10,
        },
        components: {
          Card: { paddingLG: 16 },
          Table: { headerSplitColor: token.colorSplit },
        },
      }}
    >
      <Layout className={styles.app}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={248} className={styles.sider} theme="light">
          <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: collapsed?"center":"flex-start", paddingInline: 16 }}>
            <Space>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: token.colorText }} />
              {!collapsed && <Text strong>Acme Inc.</Text>}
            </Space>
          </div>
          <Menu mode="inline" items={menu} defaultSelectedKeys={["dash"]} style={{ borderRight: 0 }} />
        </Sider>

        <Layout>
          <Header className={styles.header}>
            <div className={styles.topbarLeft}>
              <Breadcrumb items={[{ title: "/" }, { title: "dashboard" }]} />
              <div style={{ width: 8 }} />
              <Text type="secondary">/dashboard</Text>
            </div>

            <Space className={styles.toolbar}>
              <RangePicker value={filters.range} onChange={(v)=> v && setFilters((f)=>({ ...f, range: v as [Dayjs,Dayjs] }))} allowClear={false}
                presets={[{ label: "Last 3 months", value: defaultRange("3m") }, { label: "Last 30 days", value: defaultRange("30d") }, { label: "Last 7 days", value: defaultRange("7d") }]} />
              <Segmented value={filters.timeframe} onChange={(val)=> setFilters((f)=>({ ...f, timeframe: val as Timeframe, range: defaultRange(val as Timeframe) }))} options={[{ label: "Last 3 months", value: "3m" }, { label: "Last 30 days", value: "30d" }, { label: "Last 7 days", value: "7d" }]} />
            </Space>
          </Header>

          <Content className={styles.contentWrap}>
            <div className={styles.contentInner}>
              {/* KPI */}
              <div className={styles.grid4}>
                <KPI title="Total Revenue" value={eur(1250_00)} change={"+2.5%"} footer="Trending up this month" />
                <KPI title="New Customers" value={"1,234"} change={"-20%"} footer="Down 20% this period" />
                <KPI title="Active Accounts" value={"45,678"} change={"+12.5%"} footer="Strong user retention" />
                <KPI title="Growth Rate" value={"4.5%"} change={"+4.5%"} footer="Steady performance increase" highlighted />
              </div>

              {/* Chart */}
              <Card className={styles.chartCard} title={<Space><Text strong>Total Visitors</Text><Tag>for the last 3 months</Tag></Space>} extra={<Space><Button size="small" className={styles.subtleBtn}>Last 3 months</Button><Button size="small" className={styles.subtleBtn}>Last 30 days</Button><Button size="small" className={styles.subtleBtn}>Last 7 days</Button></Space>}>
                <div style={{ height: 260 }}>
                  {!series ? <Skeleton active paragraph={false} style={{ marginTop: 32 }} /> : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={series} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="fillA" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#000" stopOpacity={0.17} />
                            <stop offset="100%" stopColor="#000" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="fillB" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#000" stopOpacity={0.12} />
                            <stop offset="100%" stopColor="#000" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" tick={{ fontSize: 12, fill: token.colorTextSecondary }} tickMargin={8} />
                        <YAxis tick={{ fontSize: 12, fill: token.colorTextSecondary }} tickMargin={8} />
                        <Tooltip labelFormatter={(l)=> dayjs(l as string).format("MMM D, YYYY")} />
                        <Area type="monotone" dataKey="a" stroke="#666" fill="url(#fillA)" strokeWidth={1.5} />
                        <Area type="monotone" dataKey="b" stroke="#999" fill="url(#fillB)" strokeWidth={1.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Card>

              {/* Tabs row */}
              <div className={styles.tabsBar}>
                <Tabs defaultActiveKey="outline" items={[{ key: "outline", label: "Outline" }, { key: "perf", label: "Past Performance" }, { key: "kp", label: "Key Personnel" }, { key: "focus", label: "Focus Documents" }]} />
                <Space>
                  <Button className={styles.subtleBtn} icon={<FilterOutlined />}>
                    Customize Columns
                  </Button>
                  <Button type="default" icon={<PlusOutlined />}>
                    Add Section
                  </Button>
                </Space>
              </div>

              {/* Table */}
              <Card style={{ marginTop: 12 }} bordered>
                <Table
                  rowKey="key"
                  size="small"
                  loading={loading}
                  dataSource={outline ?? []}
                  pagination={{ pageSize: 10, showSizeChanger: false, showTotal: (t)=> `of ${t} row(s) selected.` }}
                  columns={[
                    { title: "", dataIndex: "_", width: 40, render:()=> <span style={{ color: token.colorTextTertiary }}>⋮</span> },
                    { title: "Header", dataIndex: "header" },
                    { title: "Section Type", dataIndex: "sectionType" },
                    { title: "Status", dataIndex: "status", render:(v)=> <Tag color={v==='Done'?"default":"processing"}>{v}</Tag> },
                    { title: "Target", dataIndex: "target" },
                    { title: "Limit", dataIndex: "limit" },
                    { title: "Reviewer", dataIndex: "reviewer" },
                    { title: "", dataIndex: "_m", align: "right", width: 40, render:()=> <Button type="text" icon={<MoreOutlined />} /> },
                  ]}
                />
              </Card>
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default V0CloneDashboard;
