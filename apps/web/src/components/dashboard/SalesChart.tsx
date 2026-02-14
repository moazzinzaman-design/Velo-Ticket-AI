"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
    { name: 'Mon', revenue: 4200 },
    { name: 'Tue', revenue: 5100 },
    { name: 'Wed', revenue: 6800 }, // Spike
    { name: 'Thu', revenue: 5400 },
    { name: 'Fri', revenue: 7200 }, // Weekend approaching
    { name: 'Sat', revenue: 8500 },
    { name: 'Sun', revenue: 9100 },
];

export default function SalesChart() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="rgba(255,255,255,0.3)"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="rgba(255,255,255,0.3)"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `£${value / 1000}k`}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: '#fff'
                        }}
                        itemStyle={{ color: '#fff' }}
                        formatter={(value: number) => [`£${value}`, 'Revenue']}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
