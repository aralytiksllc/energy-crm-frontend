import React, { useEffect, useMemo, useState } from "react";
import {
  ConfigProvider,
  Layout,
  Typography,
  theme,
  Breadcrumb,
  Space,
  Button,
  Dropdown,
  DatePicker,
  Segmented,
  Card,
  Row,
  Col,
  Statistic,
  Tag,
  Table,
  Avatar,
  Divider,
  Input,
} from "antd";
import {
  SearchOutlined,
  SlidersOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  MoreOutlined,
  UserOutlined,
  DollarOutlined,
  ThunderboltOutlined,
  LineChartOutlined,
  ApartmentOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { createStyles } from "antd-style";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

/**
 * V0‑inspired Executive Dashboard (AntD + Recharts)
 * Clean, monochrome, elegant. Designed to look like the v0 examples
 * you referenced: pill actions, ghost buttons, subtle shadows, tidy spacing.
 */

const { useToken } = theme;
const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// ---------------- Styles ----------------
const useStyles = createStyles(({ token }) => ({
  app: {
    height: "100dvh",
    background: token.colorBgLayout,
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: token.colorBgElevated,
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
    paddingInline: 20,
  },
  headerRow: {
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actions: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  page: { padding: 20, maxWidth: 1280, margin: "0 auto" },
  kpiCard: { borderRadius: 12, boxShadow: token.boxShadowSecondary },
  kpiHead: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  pill: { background: token.colorFillQuaternary, border: 0 },
  chartCard: { borderRadius: 12, boxShadow: token.boxShadowSecondary },
  sectionTitle: { display: "flex", alignItems: "center", gap: 8 },
  ghostBtn: { borderColor: token.colorBorderSecondary },
}));

// ---------------- Mock Data ----------------

type TF = "7d" | "30d" | "3m" | "12m";
interface KPIs { revenue: number; consumption: number; price: number; contracts: number; churn: number; growth: number }
interface Series { date: string; consumption: number; price: number }
interface Activity { key: string; who: string; what: string; when: string }

const eur = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const mwh = (n: number) => `${n.toLocaleString()} MWh`;

const defaultRange = (tf: TF): [Dayjs, Dayjs] => {
  const end = dayjs().endOf("day");
  if (tf === "12m") return [end.subtract(12, "month").startOf("day"), end];
  if (tf === "3m") return [end.subtract(3, "month").startOf("day"), end];
  if (tf === "30d") return [end.subtract(30, "day").startOf("day"), end];
  return [end.subtract(7, "day").startOf("day"), end];
};

function genSeries(range: [Dayjs, Dayjs]): Series[] {
  const days = Math.max(1, range[1].diff(range[0], "day") + 1);
  return Array.from({ length: days }, (_, i) => {
    const d = range[0].add(i, "day");
    const consumption = Math.round(90 + Math.sin(i / 4) * 18 + (i % 7 === 0 ? 24 : 0) + Math.random() * 8);
    const price = Math.round(84 + Math.cos(i / 7) * 6 + Math.random() * 4);
    return { date: d.format("YYYY-MM-DD"), consumption, price };
  });
}

function genActivities(): Activity[] {
  return [
    { key: "a1", who: "Eddie Lake", what: "approved contract CN-2025-1011", when: "2h ago" },
    { key: "a2", who: "Jamik T.", what: "updated price for MP-100234", when: "today" },
    { key: "a3", who: "Dana", what: "uploaded consumption file for Branch 2", when: "yesterday" },
  ];
}

// ---------------- Component ----------------

const V0ExecutiveDashboard: React.FC = () => {
  const { token } = useToken();
  const { styles } = useStyles();

  const [tf, setTf] = useState<TF>("3m");
  const [range, setRange] = useState<[Dayjs, Dayjs]>(defaultRange("3m"));
  const [series, setSeries] = useState<Series[]>(genSeries(range));

  useEffect(() => { setSeries(genSeries(range)); }, [range]);

  const kpis: KPIs = {
    revenue: 1250000,
    consumption: 45678,
    price: 91,
    contracts: 92,
    churn: 1.2,
    growth: 4.5,
  };

  const activities = genActivities();

  return (
    <ConfigProvider theme={{ token: { fontSize: 13, borderRadius: 12 } }}>
      <Layout className={styles.app}>
        <Header className={styles.header}>
          <div className={styles.headerRow}>
            <Space direction="vertical" size={0}>
              <Breadcrumb items={[{ title: "Home" }, { title: "Dashboard" }]} />
              <Title level={5} style={{ margin: 0 }}>Executive Overview</Title>
            </Space>
            <Space className={styles.actions}>
              <Input prefix={<SearchOutlined />} placeholder="Search" allowClear />
              <RangePicker value={range} onChange={(v)=> v && setRange(v as [Dayjs,Dayjs])} allowClear={false} />
              <Segmented value={tf} onChange={(v)=> { setTf(v as TF); setRange(defaultRange(v as TF)); }} options={[{label:"7d",value:"7d"},{label:"30d",value:"30d"},{label:"3m",value:"3m"},{label:"12m",value:"12m"}]} />
              <Button icon={<SlidersOutlined />} className={styles.ghostBtn}>Filters</Button>
              <Button icon={<ShareAltOutlined />} className={styles.ghostBtn}>Share</Button>
              <Button icon={<DownloadOutlined />}>Export</Button>
              <Dropdown menu={{ items:[{ key:"1", label:"Profile" },{ key:"2", label:"Sign out" }] }}>
                <Avatar size={28} icon={<UserOutlined />} style={{ background: token.colorFill }} />
              </Dropdown>
            </Space>
          </div>
        </Header>

        <Content className={styles.page}>
          {/* KPI row */}
          <Row gutter={[16,16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className={styles.kpiCard}>
                <div className={styles.kpiHead}><Space className={styles.sectionTitle}><DollarOutlined /><Text type="secondary">Revenue</Text></Space><Tag className={styles.pill}>+2.5%</Tag></div>
                <Title level={3} style={{ margin: 0 }}>{eur(kpis.revenue)}</Title>
                <Text type="secondary">Trending up this period</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className={styles.kpiCard}>
                <div className={styles.kpiHead}><Space className={styles.sectionTitle}><ThunderboltOutlined /><Text type="secondary">Consumption</Text></Space><Tag className={styles.pill}>+2.8%</Tag></div>
                <Title level={3} style={{ margin: 0 }}>{mwh(kpis.consumption)}</Title>
                <Text type="secondary">for the selected range</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className={styles.kpiCard}>
                <div className={styles.kpiHead}><Space className={styles.sectionTitle}><ApartmentOutlined /><Text type="secondary">Active Contracts</Text></Space><Tag className={styles.pill}>+1.2%</Tag></div>
                <Title level={3} style={{ margin: 0 }}>{kpis.contracts.toLocaleString()}</Title>
                <Text type="secondary">engagement meets targets</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className={styles.kpiCard}>
                <div className={styles.kpiHead}><Space className={styles.sectionTitle}><LineChartOutlined /><Text type="secondary">Growth Rate</Text></Space><Tag className={styles.pill}>+4.5%</Tag></div>
                <Title level={3} style={{ margin: 0 }}>{kpis.growth}%</Title>
                <Text type="secondary">steady performance increase</Text>
              </Card>
            </Col>
          </Row>

          <Divider style={{ margin: 16 }} />

          {/* Main chart */}
          <Row gutter={[16,16]}>
            <Col xs={24} lg={17}>
              <Card className={styles.chartCard} title={<Space className={styles.sectionTitle}><LineChartOutlined /><Text strong>Total Visitors</Text><Tag className={styles.pill}>for the selected period</Tag></Space>} extra={<Space><Button size="small" className={styles.ghostBtn}>Last 3 months</Button><Button size="small" className={styles.ghostBtn}>Last 30 days</Button><Button size="small" className={styles.ghostBtn}>Last 7 days</Button></Space>}>
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={series} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#000" stopOpacity={0.22} />
                          <stop offset="100%" stopColor="#000" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#000" stopOpacity={0.12} />
                          <stop offset="100%" stopColor="#000" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={token.colorSplit} />
                      <XAxis dataKey="date" tick={{ fontSize: 12, fill: token.colorTextSecondary }} tickMargin={8} />
                      <YAxis tick={{ fontSize: 12, fill: token.colorTextSecondary }} tickMargin={8} />
                      <Tooltip labelFormatter={(l)=> dayjs(l as string).format("MMM D, YYYY")} />
                      <Area type="monotone" dataKey="consumption" stroke="#777" fill="url(#g1)" strokeWidth={1.5} />
                      <Area type="monotone" dataKey="price" stroke="#aaa" fill="url(#g2)" strokeWidth={1.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>

            {/* Activity feed */}
            <Col xs={24} lg={7}>
              <Card className={styles.chartCard} title={<Space className={styles.sectionTitle}><AlertOutlined /><Text strong>Activity</Text></Space>}>
                {genActivities().map(a => (
                  <div key={a.key} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px dashed ${token.colorSplit}` }}>
                    <Space>
                      <Avatar size={24} icon={<UserOutlined />} />
                      <Text>{a.who} <Text type="secondary">{a.what}</Text></Text>
                    </Space>
                    <Text type="secondary">{a.when}</Text>
                  </div>
                ))}
              </Card>
            </Col>
          </Row>

          <Divider style={{ margin: 16 }} />

          {/* Tables */}
          <Row gutter={[16,16]}>
            <Col span={24}>
              <Card className={styles.chartCard} title={<Space className={styles.sectionTitle}><ApartmentOutlined /><Text strong>Documents</Text></Space>} extra={<Space><Button className={styles.ghostBtn} icon={<SlidersOutlined />}>Customize Columns</Button><Button icon={<MoreOutlined />}>Add Section</Button></Space>}>
                <Table size="small" rowKey={(r)=> (r as any).key} pagination={{ pageSize: 10 }} dataSource={Array.from({ length: 9 }).map((_,i)=> ({ key: i+1, header: ["Cover page","Table of contents","Executive summary","Technical approach","Capabilities","Integration with existing systems","Innovation and Advantages","Overview of ERP's Innovative Solutions","Advanced Algorithms and Machine Learning"][i], sectionType: i===0?"Cover page":i===1?"Table of contents":"Narrative", status: i===5?"In Process":"Done", target: [18,29,13,27,20,19,25,7,30][i], limit: [5,24,13,23,8,21,26,23,28][i], reviewer: ["Eddie Lake","Eddie Lake","Eddie Lake","Jamik T.","Jamik T.","—","—","—","—"][i] }))}
                  columns={[{ title: "Header", dataIndex: "header" },{ title: "Section Type", dataIndex: "sectionType" },{ title: "Status", dataIndex: "status", render:(v)=> <Tag>{v}</Tag> },{ title: "Target", dataIndex: "target" },{ title: "Limit", dataIndex: "limit" },{ title: "Reviewer", dataIndex: "reviewer" }]} />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default V0ExecutiveDashboard;
