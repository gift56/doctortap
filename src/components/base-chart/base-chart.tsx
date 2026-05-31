"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  BaseChartDataPoint,
  BaseChartType,
} from "@/lib/charts/types";
import { cn } from "@/lib/utils";

export type { BaseChartDataPoint, BaseChartType } from "@/lib/charts/types";

interface BaseChartProps {
  type: BaseChartType;
  data: BaseChartDataPoint[];
  title?: string;
  className?: string;
  valueFormatter?: (value: number) => string;
}

const CHART_COLORS = [
  "var(--accent-primary)",
  "var(--state-success)",
  "var(--text-secondary)",
  "color-mix(in oklch, var(--accent-primary) 70%, var(--text-primary))",
  "color-mix(in oklch, var(--state-success) 70%, var(--text-primary))",
];

function resolveColor(point: BaseChartDataPoint, index: number): string {
  return point.color ?? CHART_COLORS[index % CHART_COLORS.length];
}

function ChartTooltip({
  active,
  payload,
  valueFormatter,
}: {
  active?: boolean;
  payload?: Array<{ payload: BaseChartDataPoint; value: number }>;
  valueFormatter?: (value: number) => string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];
  const formattedValue = valueFormatter
    ? valueFormatter(item.value)
    : String(item.value);

  return (
    <div className="rounded-lg border border-border-default bg-bg-surface px-3 py-2 shadow-sm">
      <p className="text-xs font-medium text-text-primary">
        {item.payload.label}
      </p>
      <p className="text-xs text-text-secondary">{formattedValue}</p>
    </div>
  );
}

function CartesianBaseChart({
  type,
  data,
  valueFormatter,
}: Pick<BaseChartProps, "type" | "data" | "valueFormatter">) {
  const chartData = data.map((point) => ({
    ...point,
    name: point.label,
  }));

  const commonAxisProps = {
    stroke: "var(--text-secondary)",
    fontSize: 11,
    tickLine: false,
    axisLine: false,
  };

  const grid = (
    <CartesianGrid
      stroke="var(--border-default)"
      strokeDasharray="4 4"
      vertical={false}
    />
  );

  if (type === "line") {
    return (
      <LineChart data={chartData}>
        {grid}
        <XAxis dataKey="name" {...commonAxisProps} />
        <YAxis {...commonAxisProps} allowDecimals={false} />
        <Tooltip
          content={<ChartTooltip valueFormatter={valueFormatter} />}
          cursor={{ stroke: "var(--border-default)" }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--accent-primary)"
          strokeWidth={2}
          dot={{ fill: "var(--accent-primary)", r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    );
  }

  if (type === "area") {
    return (
      <AreaChart data={chartData}>
        {grid}
        <XAxis dataKey="name" {...commonAxisProps} />
        <YAxis {...commonAxisProps} allowDecimals={false} />
        <Tooltip
          content={<ChartTooltip valueFormatter={valueFormatter} />}
          cursor={{ stroke: "var(--border-default)" }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--accent-primary)"
          fill="color-mix(in oklch, var(--accent-primary) 20%, transparent)"
          strokeWidth={2}
        />
      </AreaChart>
    );
  }

  return (
    <BarChart data={chartData}>
      {grid}
      <XAxis dataKey="name" {...commonAxisProps} />
      <YAxis {...commonAxisProps} allowDecimals={false} />
      <Tooltip
        content={<ChartTooltip valueFormatter={valueFormatter} />}
        cursor={{ fill: "color-mix(in oklch, var(--accent-primary) 8%, transparent)" }}
      />
      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
        {chartData.map((point, index) => (
          <Cell key={point.label} fill={resolveColor(point, index)} />
        ))}
      </Bar>
    </BarChart>
  );
}

export function BaseChart({
  type,
  data,
  title,
  className,
  valueFormatter,
}: BaseChartProps) {
  if (data.length === 0) {
    return (
      <div
        className={cn(
          "flex h-64 items-center justify-center rounded-xl border border-border-default bg-bg-surface p-4",
          className,
        )}
      >
        <p className="text-sm text-text-secondary">No chart data available.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border-default bg-bg-surface p-4 shadow-sm",
        className,
      )}
    >
      {title ? (
        <p className="mb-4 text-sm font-bold text-text-primary">{title}</p>
      ) : null}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === "pie" ? (
            <PieChart>
              <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={80}
                paddingAngle={3}
              >
                {data.map((point, index) => (
                  <Cell key={point.label} fill={resolveColor(point, index)} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <CartesianBaseChart
              type={type}
              data={data}
              valueFormatter={valueFormatter}
            />
          )}
        </ResponsiveContainer>
      </div>
      {type === "pie" ? (
        <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {data.map((point, index) => (
            <li
              key={point.label}
              className="flex items-center gap-2 text-xs text-text-secondary"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: resolveColor(point, index) }}
                aria-hidden
              />
              <span>{point.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
