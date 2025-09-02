import React, { useEffect, useMemo, useState } from "react";
import { Card, Typography, Space, Tag, theme, Segmented } from "antd";
import { LineChartOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import dayjs, { Dayjs } from "dayjs";

/**
 * UI: V0-style KPI cards + Visitors Chart (pixel-matched)
 * KËTU NUK KA ASNJË NDRYSHIM NË UI — vetëm përmbajtja vjen nga “EnergyDashboard”.
 */

const { Text, Title } = Typography;

/* =========================
   Types & Helpers (Content)
   ========================= */

type Timeframe = "day" | "week" | "month";

interface SeriesPoint {
  date: string; // ISO date
  consumptionMWh: number;
}

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

interface FiltersState {
  range: [Dayjs, Dayjs];
  timeframe: Timeframe;
  customerId?: number | null;
  branchId?: number | null;
  meteringPointId?: number | null;
}

const eur = (n: number) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
const mwh = (n: number) => `${Math.round(n).toLocaleString(undefined)} MWh`;
const pct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(1)}%`;

function defaultRange(kind: "3m" | "30d" | "7d"): [Dayjs, Dayjs] {
  const end = dayjs().endOf("day");
  if (kind === "3m") return [end.subtract(3, "month").startOf("day"), end];
  if (kind === "30d") return [end.subtract(30, "day").startOf("day"), end];
  return [end.subtract(7, "day").startOf("day"), end];
}

// MOCK data generator – njësoj si tek EnergyDashboard (mjafton për demo)
async function fetchDashboardData(filters: FiltersState): Promise<{
  metrics: Metrics;
  series: SeriesPoint[];
}> {
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

  return new Promise((r) => setTimeout(() => r({ metrics, series }), 400));
}

/* =============
   UI STYLES
   ============= */

const useStyles = createStyles(({ token }) => ({
  // ====== Shared ======
  grid4: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 16 },
  pill: {
    background: "#fff",
    border: "1px solid #E6E6E6",
    borderRadius: 999,
    height: 24,
    lineHeight: "22px",
    padding: "0 10px",
    boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  subtle: { color: "#7A7A7A" },

  // ====== KPI cards ======
  card: {
    borderRadius: 14,
    borderColor: "#E5E5E5",
    background: "linear-gradient(180deg,#FFFFFF 0%, #FAFAFA 60%, #F5F5F5 100%)",
    boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 8px 28px -12px rgba(0,0,0,0.08)",
    [`.ant-card-body`]: { padding: 18 },
  },
  kTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  kValue: { margin: 0, fontWeight: 700 },
  kBold: { marginTop: 8, display: "flex", alignItems: "center", gap: 6, fontWeight: 600 },
  kCaption: { marginTop: 2, color: "#9E9E9E" },
  lastHighlight: { border: "1px solid #CFE3FF" },

  // ====== Chart card ======
  chartCard: {
    borderRadius: 16,
    borderColor: "#E5E5E5",
    background: "#fff",
    boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 10px 30px -16px rgba(0,0,0,0.10)",
    [`.ant-card-head`]: { borderBottom: 0, padding: "12px 16px" },
    [`.ant-card-body`]: { padding: 0 },
  },
  chartHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 16px 0 16px",
  },
  chartTitle: { margin: 0 },
  chartSubtitle: { color: "#8E8E8E" },
  chartControls: { padding: "8px 8px 0 0" },
  rchart: { height: 320, padding: 16 },
}));

/* ======================
   KPI Cards (UI identik)
   ====================== */

const ChangePill: React.FC<{ delta: string }> = ({ delta }) => {
  const { styles } = useStyles();
  return (
    <span className={styles.pill}>
      <LineChartOutlined style={{ fontSize: 12 }} />
      {delta}
    </span>
  );
};

const KpiCard: React.FC<{
  label: string;
  value: string;
  delta: string;
  subBold: string;
  caption: string;
  highlight?: boolean;
}> = ({ label, value, delta, subBold, caption, highlight }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.card + (highlight ? " " + styles.lastHighlight : "")}>
      <div className="ant-card ant-card-bordered" style={{ background: "transparent", border: 0 }}>
        <div className="ant-card-body" style={{ padding: 18 }}>
          <div className={styles.kTop}>
            <Text className={styles.subtle}>{label}</Text>
            <ChangePill delta={delta} />
          </div>
          <Title level={2} className={styles.kValue}>{value}</Title>
          <div className={styles.kBold}>
            <Text strong>{subBold}</Text>
            <ArrowUpOutlined style={{ fontSize: 12 }} />
          </div>
          <Text className={styles.kCaption}>{caption}</Text>
        </div>
      </div>
    </div>
  );
};

export const KpiCardsRow: React.FC<{ metrics: Metrics }> = ({ metrics }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.grid4}>
      <KpiCard
        label="Total Revenue"
        value={eur(metrics.totalRevenue)}
        delta={pct(metrics.revenueChangePct)}
        subBold="Trending up this period"
        caption={`Avg price ~ ${Math.round(metrics.avgPriceEurPerMwh)} €/MWh`}
      />
      <KpiCard
        label="Total Consumption"
        value={mwh(metrics.totalConsumptionMWh)}
        delta={pct(metrics.consumptionChangePct)}
        subBold="Energy usage overview"
        caption="For the selected range"
      />
      <KpiCard
        label="Active Accounts"
        value={metrics.activeContracts.toLocaleString()}
        delta={pct(metrics.contractsChangePct)}
        subBold="Strong user retention"
        caption="Currently active"
      />
      <KpiCard
        label="Avg Price"
        value={`${Math.round(metrics.avgPriceEurPerMwh)} €/MWh`}
        delta={pct(metrics.priceChangePct)}
        subBold="Price momentum"
        caption="€/MWh"
        highlight
      />
    </div>
  );
};

/* =========================
   Visitors Chart (UI identik)
   ========================= */

type TF = "3m" | "30d" | "7d";

const tooltipStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #E6E6E6",
  borderRadius: 12,
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  padding: 10,
};

export const VisitorsChartCard: React.FC<{
  series: SeriesPoint[];
  title?: string;
  subtitle?: string;
}> = ({ series, title = "Total Consumption", subtitle = "For the selected range" }) => {
  const { styles } = useStyles();
  const { token } = theme.useToken();
  const [tf, setTf] = useState<TF>("3m");

  const sliced = useMemo(() => {
    const take = tf === "3m" ? 90 : tf === "30d" ? 30 : 7;
    const sorted = [...series].sort((a, b) => a.date.localeCompare(b.date));
    return sorted.slice(-take);
  }, [series, tf]);

  // UI kërkon 2 seri (Mobile/Desktop). Përdorim konsum real + një baseline të butë.
  const data = useMemo(
    () =>
      sliced.map((p) => ({
        date: p.date,
        mobile: Math.round(p.consumptionMWh),
        desktop: Math.round(p.consumptionMWh * 0.7),
      })),
    [sliced]
  );

  return (
    <Card className={styles.chartCard} bordered={true} bodyStyle={{ padding: 0 }}>
      <div className={styles.chartHeader}>
        <div>
          <Title level={4} className={styles.chartTitle}>{title}</Title>
          <Text className={styles.chartSubtitle}>{subtitle}</Text>
        </div>
        <div className={styles.chartControls}>
          <Segmented
            value={tf}
            onChange={(v) => setTf(v as TF)}
            options={[
              { label: "Last 3 months", value: "3m" },
              { label: "Last 30 days", value: "30d" },
              { label: "Last 7 days", value: "7d" },
            ]}
          />
        </div>
      </div>

      <div className={styles.rchart}>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="gMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#000" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#000" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={token.colorSplit} />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: token.colorTextSecondary }} tickMargin={8} />
            <YAxis tick={{ fontSize: 12, fill: token.colorTextSecondary }} tickMargin={8} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelFormatter={(l) => dayjs(l as string).format("MMM D, YYYY")}
              formatter={(v, n) => [v as number, n as string]}
            />
            <Area type="monotone" dataKey="mobile" name="Consumption" stroke="#666" fill="url(#gMobile)" strokeWidth={1.6} />
            <Area type="monotone" dataKey="desktop" name="Baseline" stroke="#999" fill="url(#gDesktop)" strokeWidth={1.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

/* ===========================
   Placeholder për OutlineTable
   (nëse ke ./tabel, zëvendësoje)
   =========================== */

/* ===========================
   DEMO CONTAINER (copy-paste)
   – merr content nga mock “EnergyDashboard”
   – UI nuk ndryshon fare
   =========================== */

   import OutlineTableClone from "./tabel";

const Demo: React.FC = () => {
  const [filters] = useState<FiltersState>({ range: defaultRange("3m"), timeframe: "day" });
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [series, setSeries] = useState<SeriesPoint[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchDashboardData(filters).then((d) => {
      if (!mounted) return;
      setMetrics(d.metrics);
      setSeries(d.series);
    });
    return () => { mounted = false; };
  }, [filters]);

  if (!metrics || series.length === 0) {
    return <div style={{ padding: 16 }}>Loading…</div>;
  }

  return (
    <div style={{ padding: 16 }}>
      <KpiCardsRow metrics={metrics} />
      <div style={{ height: 16 }} />
      <VisitorsChartCard series={series} />
      <div style={{ height: 16 }} />
      <OutlineTableClone />
    </div>
  );
};

export default Demo;
