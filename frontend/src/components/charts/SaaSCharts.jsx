import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * Premium SaaS Chart Components
 * Styled to match Stripe, Linear, Ramp aesthetics
 * Slate neutrals with teal highlights
 */

// Custom tooltip styling
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md">
        <p className="text-xs font-medium text-slate-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="mt-1 text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' && entry.dataKey.includes('value') ? `$${entry.value.toLocaleString()}` : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Line chart for trends (ROI, savings, revenue)
export const TrendLineChart = ({ data, dataKey = "value", title, yAxisFormatter = (v) => `$${(v / 1000).toFixed(0)}k` }) => {
  return (
    <div className="saas-card" data-testid={`chart-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <h3 className="mb-6 text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: '#64748b' }} 
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={yAxisFormatter}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke="#14b8a6" 
            strokeWidth={2.5}
            dot={{ fill: '#14b8a6', r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={600}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Bar chart for distribution/categories
export const DistributionBarChart = ({ data, dataKey = "count", xKey = "category", title, yAxisFormatter = (v) => v }) => {
  return (
    <div className="saas-card" data-testid={`chart-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <h3 className="mb-6 text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey={xKey} 
            tick={{ fontSize: 12, fill: '#64748b' }} 
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={yAxisFormatter}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey={dataKey} 
            fill="#14b8a6" 
            radius={[6, 6, 0, 0]}
            animationDuration={600}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Multi-line chart for comparisons
export const ComparisonLineChart = ({ data, lines = [], title }) => {
  const colors = ['#14b8a6', '#94a3b8', '#64748b'];
  
  return (
    <div className="saas-card" data-testid={`chart-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <h3 className="mb-6 text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: '#64748b' }} 
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: 20 }}
            iconType="line"
            formatter={(value) => <span className="text-sm text-slate-700">{value}</span>}
          />
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name}
              stroke={colors[index] || '#64748b'}
              strokeWidth={2}
              dot={false}
              animationDuration={600}
              animationEasing="ease-out"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Horizontal bar chart for ranking/drivers
export const HorizontalDriverChart = ({ data, dataKey = "impact", xKey = "driver", title }) => {
  return (
    <div className="saas-card" data-testid={`chart-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <h3 className="mb-6 text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
          <XAxis 
            type="number"
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis 
            type="category"
            dataKey={xKey}
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            width={95}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey={dataKey} 
            fill="#14b8a6" 
            radius={[0, 6, 6, 0]}
            animationDuration={600}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
