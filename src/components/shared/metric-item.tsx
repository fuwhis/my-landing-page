import type { Metric } from '@/types/content';

import { RollingMetricValue } from '@/components/motion/rolling-metric-value';

type MetricItemProps = {
  metric: Metric;
};

export function MetricItem({ metric }: MetricItemProps) {
  return (
    <article className="border-border bg-surface rounded-2xl border p-5">
      <p className="text-surface-foreground text-2xl font-semibold tracking-tight">
        <RollingMetricValue value={metric.value} />
      </p>
      <p className="text-surface-foreground mt-1 text-sm font-medium">
        {metric.label}
      </p>
      {metric.description ? (
        <p className="text-subtle-foreground mt-2 text-xs leading-relaxed">
          {metric.description}
        </p>
      ) : null}
    </article>
  );
}
