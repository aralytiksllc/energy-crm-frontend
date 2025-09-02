import React, { useEffect, useMemo, useState } from "react";
import {
  Layout,
  Menu,
  Card,
  Typography,
  Statistic,
  theme,
  DatePicker,
  Segmented,
  Space,
  Table,
  Tabs,
  Tag,
  Divider,
  Dropdown,
  Button,
  Select,
  Skeleton,
  Grid,
} from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import {
  DashboardOutlined,
  ThunderboltOutlined,
  BarChartOutlined,
  ProjectOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  SettingOutlined,
  BellOutlined,
  GithubOutlined,
  FilterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { createStyles } from "antd-style";

/**
 * Energy Dashboard (Ant Design v5)
 * - Visual style inspired by the provided screenshot (clean, monochrome, airy)
 * - Uses AntD components + Recharts for the area chart
 * - Global filters (date range, timeframe, entity selectors) power KPI cards, chart and tables
 * - Mock data layer included; replace `fetchDashboardData` with your API
 */

const { useToken } = theme;
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { useBreakpoint } = Grid;

// ---------- Types ----------

type Timeframe = "day" | "week" | "month";

interface Metrics {
  totalRevenue: number; // EUR
  totalConsumptionMWh: number;
  activeContracts: number;
  avgPriceEurPerMwh: number;
  revenueChangePct: number;
  consumptionChangePct: number;
  contractsChangePct: number;
  priceChangePct: number;
}

interface SeriesPoint {
  date: string; // ISO date
  consumptionMWh: number;
}

interface TopCustomerRow {
  key: string;
  companyName: string;
  consumptionMWh: number;
  revenue: number;
}

interface ExpiringContractRow {
  key: string;
  companyName: string;
  contractNumber: string;
  maturityDate: string; // ISO
  daysLeft: number;
}

interface HighSiteRow {
  key: string;
  meteringPoint: string;
  branch: string;
  customer: string;
  consumptionMWh: number;
}

interface DashboardData {
  metrics: Metrics;
  series: SeriesPoint[];
  topCustomers: TopCustomerRow[];
  expiringContracts: ExpiringContractRow[];
  highSites: HighSiteRow[];
}

interface FiltersState {
  range: [Dayjs, Dayjs];
  timeframe: Timeframe;
  customerId?: number | null;
  branchId?: number | null;
  meteringPointId?: number | null;
}

// ---------- Styling ----------

const useStyles = createStyles(({ token }) => ({
  app: {
    height: "100dvh",
    background: token.colorBgLayout,
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
  },
  sider: {
    borderInlineEnd: `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
  },
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
  contentWrap: {
    height: "100%",
    overflow: "hidden",
  },
  contentInner: {
    height: "100%",
    overflow: "auto",
    padding: token.paddingLG,
  },
  kpis: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: token.marginLG,
  },
  kpiCard: {
    borderRadius: token.borderRadiusLG,
  },
  cardTitle: {
    display: "flex",
    alignItems: "center",
    gap: token.marginSM,
    marginBottom: token.marginXS,
  },
  pill: {
    fontSize: token.fontSizeSM,
    padding: `0 ${token.paddingXS}px`,
    lineHeight: "22px",
    borderRadius: 999,
    background: token.colorFillQuaternary,
  },
  toolbar: {
    display: "flex",
    gap: token.marginSM,
    flexWrap: "wrap",
    alignItems: "center",
  },
  chartCard: {
    marginTop: token.marginLG,
    borderRadius: token.borderRadiusLG,
  },
  tablesWrap: {
    marginTop: token.marginLG,
  },
}));

// ---------- Utilities ----------

const eur = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const mwh = (n: number) => `${n.toLocaleString(undefined, { maximumFractionDigits: 0 })} MWh`;
const pct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(1)}%`;

function defaultRange(kind: "3m" | "30d" | "7d"): [Dayjs, Dayjs] {
  const end = dayjs().endOf("day");
  if (kind === "3m") return [end.subtract(3, "month").startOf("day"), end];
  if (kind === "30d") return [end.subtract(30, "day").startOf("day"), end];
  return [end.subtract(7, "day").startOf("day"), end];
}

// MOCK data generator – replace with real API calls
async function fetchDashboardData(filters: FiltersState): Promise<DashboardData> {
  const { range } = filters;
  const days = Math.max(1, range[1].diff(range[0], "day") + 1);
  const series: SeriesPoint[] = Array.from({ length: days }, (_, i) => {
    const date = range[0].add(i, "day");
    const base = 120 + Math.sin(i / 5) * 20 + (i % 7 === 0 ? 40 : 0);
    const noise = Math.random() * 25;
    return { date: date.format("YYYY-MM-DD"), consumptionMWh: Math.max(50, Math.round(base + noise)) };
  });

  const totalConsumptionMWh = series.reduce((a, b) => a + b.consumptionMWh, 0);
  const avgPriceEurPerMwh = 92 + Math.random() * 18;
  const totalRevenue = totalConsumptionMWh * avgPriceEurPerMwh;

  const topCustomers: TopCustomerRow[] = Array.from({ length: 8 }).map((_, i) => ({
    key: String(i + 1),
    companyName: `Customer ${i + 1}`,
    consumptionMWh: Math.round(2000 + Math.random() * 8000),
    revenue: Math.round(180000 + Math.random() * 820000),
  }));

  const expiringContracts: ExpiringContractRow[] = Array.from({ length: 6 }).map((_, i) => {
    const daysLeft = Math.floor(Math.random() * 120) - 10;
    return {
      key: String(i + 1),
      companyName: `Customer ${i + 1}`,
      contractNumber: `CN-${2025}-${1000 + i}`,
      maturityDate: dayjs().add(daysLeft, "day").format("YYYY-MM-DD"),
      daysLeft,
    };
  });

  const highSites: HighSiteRow[] = Array.from({ length: 10 }).map((_, i) => ({
    key: String(i + 1),
    meteringPoint: `MP-${100000 + i}`,
    branch: `Branch ${1 + (i % 3)}`,
    customer: `Customer ${1 + (i % 5)}`,
    consumptionMWh: Math.round(450 + Math.random() * 1800),
  }));

  const metrics: Metrics = {
    totalRevenue,
    totalConsumptionMWh,
    activeContracts: 45 + Math.floor(Math.random() * 10),
    avgPriceEurPerMwh,
    revenueChangePct: 4.5,
    consumptionChangePct: 2.8,
    contractsChangePct: 1.2,
    priceChangePct: -3.1,
  };

  return new Promise((r) => setTimeout(() => r({ metrics, series, topCustomers, expiringContracts, highSites }), 400));
}

// ---------- Component ----------

const EnergyDashboard: React.FC = () => {
  const { token } = useToken();
  const { styles, cx } = useStyles();
  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({ range: defaultRange("3m"), timeframe: "day" });
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchDashboardData(filters).then((d) => { setData(d); setLoading(false); });
  }, [filters]);

  const kpiItems = useMemo(() => {
    if (!data) return [] as React.ReactNode[];
    const items = [
      {
        title: (
          <div className={styles.cardTitle}>
            <ThunderboltOutlined />
            <Text strong>Total Revenue</Text>
            <span className={styles.pill}>Trending up</span>
          </div>
        ),
        value: eur(data.metrics.totalRevenue),
        delta: pct(data.metrics.revenueChangePct),
      },
      {
        title: (
          <div className={styles.cardTitle}>
            <BarChartOutlined />
            <Text strong>Total Consumption</Text>
            <span className={styles.pill}>Last period</span>
          </div>
        ),
        value: mwh(Math.round(data.metrics.totalConsumptionMWh)),
        delta: pct(data.metrics.consumptionChangePct),
      },
      {
        title: (
          <div className={styles.cardTitle}>
            <ProjectOutlined />
            <Text strong>Active Contracts</Text>
            <span className={styles.pill}>Engagement</span>
          </div>
        ),
        value: data.metrics.activeContracts.toLocaleString(),
        delta: pct(data.metrics.contractsChangePct),
      },
      {
        title: (
          <div className={styles.cardTitle}>
            <DatabaseOutlined />
            <Text strong>Avg Price</Text>
            <span className={styles.pill}>€/MWh</span>
          </div>
        ),
        value: `${Math.round(data.metrics.avgPriceEurPerMwh)} €/MWh`,
        delta: pct(data.metrics.priceChangePct),
      },
    ];

    return items.map((it, idx) => (
      <Card key={idx} className={styles.kpiCard} bordered={true} bodyStyle={{ padding: token.paddingLG }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
          <div>
            {it.title}
            <Title level={3} style={{ margin: 0 }}>{it.value}</Title>
          </div>
          <Tag color={it.delta.startsWith("+") ? "green" : it.delta.startsWith("-") ? "red" : "default"}>
            {it.delta}
          </Tag>
        </div>
      </Card>
    ));
  }, [data, token, styles]);

  const chart = (
    <Card className={styles.chartCard} title={<Space align="center"><Text strong>Total Consumption</Text><Tag>for the selected range</Tag></Space>}>
      <div style={{ height: 280 }}>
        {loading || !data ? (
          <Skeleton active paragraph={false} style={{ marginTop: 32 }} />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.series} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={token.colorPrimary} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={token.colorPrimary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={token.colorSplit} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={8} />
              <YAxis tick={{ fontSize: 12 }} tickMargin={8} />
              <Tooltip formatter={(v: number) => [`${Math.round(v)} MWh`, "Consumption"]} labelFormatter={(l) => dayjs(l).format("MMM D, YYYY")} />
              <Area type="monotone" dataKey="consumptionMWh" stroke={token.colorText} fill="url(#g1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );

  const topCustomersColumns: TableColumnsType<TopCustomerRow> = [
    { title: "Customer", dataIndex: "companyName", key: "c" },
    { title: "Consumption", dataIndex: "consumptionMWh", key: "kwh", render: (v) => mwh(v) },
    { title: "Revenue", dataIndex: "revenue", key: "rev", render: (v) => eur(v) },
  ];

  const expiringColumns: TableColumnsType<ExpiringContractRow> = [
    { title: "Customer", dataIndex: "companyName", key: "cc" },
    { title: "Contract #", dataIndex: "contractNumber", key: "cn" },
    {
      title: "Maturity",
      dataIndex: "maturityDate",
      key: "md",
      render: (v) => dayjs(v).format("MMM D, YYYY"),
    },
    {
      title: "Days left",
      dataIndex: "daysLeft",
      key: "left",
      render: (d) => (
        <Tag color={d < 0 ? "red" : d < 30 ? "orange" : "default"}>{d}</Tag>
      ),
    },
  ];

  const highSitesColumns: TableColumnsType<HighSiteRow> = [
    { title: "Metering Point", dataIndex: "meteringPoint", key: "mp" },
    { title: "Branch", dataIndex: "branch", key: "br" },
    { title: "Customer", dataIndex: "customer", key: "cu" },
    { title: "Consumption", dataIndex: "consumptionMWh", key: "co", render: (v) => mwh(v) },
  ];

  const tables = (
    <div className={styles.tablesWrap}>
      <Tabs
        defaultActiveKey="outline"
        items={[
          {
            key: "outline",
            label: "Top Customers",
            children: (
              <Table
                rowKey="key"
                size="small"
                loading={loading}
                dataSource={data?.topCustomers}
                columns={topCustomersColumns}
                pagination={{ pageSize: 8 }}
              />
            ),
          },
          {
            key: "contracts",
            label: "Expiring Contracts",
            children: (
              <Table
                rowKey="key"
                size="small"
                loading={loading}
                dataSource={data?.expiringContracts}
                columns={expiringColumns}
                pagination={{ pageSize: 6 }}
              />
            ),
          },
          {
            key: "sites",
            label: "High-Consumption Sites",
            children: (
              <Table
                rowKey="key"
                size="small"
                loading={loading}
                dataSource={data?.highSites}
                columns={highSitesColumns}
                pagination={{ pageSize: 10 }}
              />
            ),
          },
        ]}
      />
    </div>
  );

  const menuItems: MenuProps["items"] = [
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
    <Layout className={styles.app}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={240} className={styles.sider} theme="light">
        <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start", paddingInline: 16 }}>
          <Space>
            <ThunderboltOutlined />
            {!collapsed && <Text strong>Acme Energy</Text>}
          </Space>
        </div>
        <Menu
          mode="inline"
          items={menuItems}
          defaultSelectedKeys={["dash"]}
          style={{ borderRight: 0 }}
        />
      </Sider>

      <Layout>
        <Header className={styles.header}>
          <Space size={screens.md ? "large" : 8} className={styles.toolbar}>
            <Button icon={<FilterOutlined />}>
              Filters
            </Button>

            <RangePicker
              value={filters.range}
              onChange={(v) => v && setFilters((f) => ({ ...f, range: v as [Dayjs, Dayjs] }))}
              allowClear={false}
              presets={[
                { label: "Last 7 days", value: defaultRange("7d") },
                { label: "Last 30 days", value: defaultRange("30d") },
                { label: "Last 3 months", value: defaultRange("3m") },
              ]}
            />

            <Segmented
              value={filters.timeframe}
              onChange={(val) => setFilters((f) => ({ ...f, timeframe: val as Timeframe }))}
              options={[
                { label: "Daily", value: "day" },
                { label: "Weekly", value: "week" },
                { label: "Monthly", value: "month" },
              ]}
            />

            <Select
              allowClear
              placeholder="Customer"
              style={{ minWidth: 160 }}
              options={[...Array(6)].map((_, i) => ({ label: `Customer ${i + 1}`, value: i + 1 }))}
              value={filters.customerId ?? undefined}
              onChange={(v) => setFilters((f) => ({ ...f, customerId: v ?? null }))}
            />

            <Select
              allowClear
              placeholder="Branch"
              style={{ minWidth: 140 }}
              options={[{ label: "Branch 1", value: 1 }, { label: "Branch 2", value: 2 }, { label: "Branch 3", value: 3 }]}
              value={filters.branchId ?? undefined}
              onChange={(v) => setFilters((f) => ({ ...f, branchId: v ?? null }))}
            />

            <Select
              allowClear
              placeholder="Metering Point"
              style={{ minWidth: 170 }}
              options={[...Array(5)].map((_, i) => ({ label: `MP-${100000 + i}`, value: 100000 + i }))}
              value={filters.meteringPointId ?? undefined}
              onChange={(v) => setFilters((f) => ({ ...f, meteringPointId: v ?? null }))}
            />
          </Space>

          <Space>
            <Button type="text" icon={<GithubOutlined />} href="https://github.com" target="_blank" />
            <Dropdown
              menu={{
                items: [
                  { key: "1", label: <Space><UserOutlined /> Profile</Space> },
                  { key: "2", label: <Space><SettingOutlined /> Settings</Space> },
                  { type: "divider" },
                  { key: "3", danger: true, label: "Sign out" },
                ],
              }}
            >
              <Button type="text" icon={<UserOutlined />}>
                Admin
              </Button>
            </Dropdown>
          </Space>
        </Header>

        <Content className={styles.contentWrap}>
          <div className={styles.contentInner}>
            {/* KPI Cards */}
            <div className={styles.kpis}>{kpiItems}</div>

            {/* Chart */}
            {chart}

            {/* Tables */}
            {tables}

            <Divider />
            <Text type="secondary">
              Replace the mock fetch with your API. Suggested endpoints:
              <br />
              GET /api/dashboard/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&timeframe=day&customerId=...<br />
              GET /api/dashboard/series?groupBy=day&...<br />
              GET /api/dashboard/top-customers?limit=10&...<br />
              GET /api/dashboard/expiring-contracts?withinDays=90
            </Text>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EnergyDashboard;

/**
 * --- Backend (NestJS + Prisma) Hints ---
 *
 * // Total consumption and revenue for a period
 * const total = await prisma.consumption.aggregate({
 *   _sum: { electricityConsumptionKwh: true },
 *   where: {
 *     timestamp: { gte: new Date(from), lte: new Date(to) },
 *     ...(meteringPointId ? { meteringPointId } : {}),
 *     ...(contractId ? { contractId } : {}),
 *   },
 * });
 * const totalMWh = Number(total._sum.electricityConsumptionKwh ?? 0) / 1000;
 * const revenue = totalMWh * avgPriceFromContracts; // or from a pricing table
 *
 * // Timeseries grouped by day (Postgres)
 * const rows = await prisma.$queryRaw<{
 *   bucket: Date; mwh: number
 * }[]>`
 *   SELECT date_trunc(${groupBy}, timestamp) AS bucket,
 *          SUM(electricity_consumption_kwh)/1000 AS mwh
 *   FROM consumption
 *   WHERE timestamp BETWEEN ${from} AND ${to}
 *   GROUP BY 1
 *   ORDER BY 1`;
 *
 * // Top customers by consumption
 * const top = await prisma.$queryRaw<{
 *   customer_id: number; company_name: string; mwh: number; revenue: number
 * }[]>`
 *   SELECT c.id as customer_id, c.company_name, SUM(cons.electricity_consumption_kwh)/1000 as mwh,
 *          SUM(cons.electricity_consumption_kwh)/1000 * AVG(coalesce(con.price_per_mwh, 0)) as revenue
 *   FROM customers c
 *   JOIN branches b ON b.customer_id = c.id
 *   JOIN metering_points mp ON mp.branch_id = b.id
 *   JOIN consumption cons ON cons.metering_point_id = mp.id
 *   LEFT JOIN contracts con ON con.id = cons.contract_id
 *   WHERE cons.timestamp BETWEEN ${from} AND ${to}
 *   GROUP BY 1,2
 *   ORDER BY mwh DESC
 *   LIMIT 10`;
 *
 * // Contracts expiring within N days
 * const exp = await prisma.contract.findMany({
 *   where: { maturityDate: { lte: addDays(new Date(), N) } },
 *   select: { id: true, contractNumber: true, maturityDate: true, customer: { select: { companyName: true } } },
 *   orderBy: { maturityDate: "asc" },
 * });
 */
