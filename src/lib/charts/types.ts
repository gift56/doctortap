export type BaseChartType = "bar" | "line" | "area" | "pie";

export interface BaseChartDataPoint {
  label: string;
  value: number;
  color?: string;
}
