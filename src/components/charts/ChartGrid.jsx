'use client';

import Chart from './Chart';

export default function ChartGrid({ type, ...props }) {
  return (
    <div className="w-full">
      <Chart type={type} {...props} />
    </div>
  );
}
