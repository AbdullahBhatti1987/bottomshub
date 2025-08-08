'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#3b82f6', '#f97316', '#10b981', '#f43f5e', '#6366f1'];

export default function Chart({ type, data, dataKey, xKey, nameKey, color }) {
  if (!data || data.length === 0) return <div>No data</div>;

  return (
    <div className="w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height={300}>
        {type === 'area' ? (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color || COLORS[0]}
              fill={color || COLORS[0]}
            />
          </AreaChart>
        ) : type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={color || COLORS[1]} />
          </BarChart>
        ) : type === 'pie' ? (
          <PieChart>
            <Tooltip />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        ) : null}
      </ResponsiveContainer>
    </div>
  );
}
