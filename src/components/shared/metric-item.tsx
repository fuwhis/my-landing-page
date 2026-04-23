import type { Metric } from '@/types/content';

import { RollingMetricValue } from '@/components/motion/rolling-metric-value';

type MetricItemProps = {
  metric: Metric;
};

export function MetricItem({ metric }: MetricItemProps) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-5">
      <p className="text-2xl font-semibold tracking-tight text-neutral-900">
        <RollingMetricValue value={metric.value} />
      </p>
      <p className="mt-1 text-sm font-medium text-neutral-700">
        {metric.label}
      </p>
      {metric.description ? (
        <p className="mt-2 text-xs leading-relaxed text-neutral-500">
          {metric.description}
        </p>
      ) : null}
    </article>
  );
}
