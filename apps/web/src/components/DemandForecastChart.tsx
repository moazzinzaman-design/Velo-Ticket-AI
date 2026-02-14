"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar } from 'lucide-react';

const data = [
    { time: '10:00', sales: 45, forecast: 45 },
    { time: '11:00', sales: 120, forecast: 110 },
    { time: '12:00', sales: 340, forecast: 320 },
    { time: '13:00', sales: 580, forecast: 550 },
    { time: '14:00', sales: 890, forecast: 850 },
    { time: '15:00', sales: 1100, forecast: 1150 },
    { time: '16:00', sales: null, forecast: 1450 }, // Future
    { time: '17:00', sales: null, forecast: 1800 },
    { time: '18:00', sales: null, forecast: 2200 },
];

export default function DemandForecastChart() {
    return (
        <div className="h-full flex flex-col p-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <TrendingUp className="text-velo-cyan" size={18} />
                        Demand Forecast
                    </h3>
                    <p className="text-xs text-white/40">Real-time sales velocity & AI prediction</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <p className="text-[10px] text-white/40 uppercase">Projected</p>
                        <p className="text-lg font-mono text-velo-cyan font-bold">2,450</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-white/40 uppercase">Capacity</p>
                        <p className="text-lg font-mono text-white/50 font-bold">96%</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="time" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#000000cc', border: '1px solid #ffffff20', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff', fontSize: '12px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="forecast"
                            stroke="#06b6d4"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorForecast)"
                            strokeDasharray="5 5"
                        />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSales)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-velo-violet" />
                    <span className="text-xs text-white/60">Actual Sales</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-velo-cyan border-dashed opacity-50" />
                    <span className="text-xs text-white/60">AI Prediction</span>
                </div>
            </div>
        </div>
    );
}
