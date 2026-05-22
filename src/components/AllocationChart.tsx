import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import type { Asset } from "../types/wealth";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface AllocationChartProps {
  assets: Asset[];
  totalAssets: number;
}

const COLORS = [
  '#10b981', // emerald
  '#f59e0b', // amber
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
  '#84cc16', // lime
];

export function AllocationChart({ assets, totalAssets }: AllocationChartProps) {
  const categoryData = Object.entries(
    assets.reduce((acc, asset) => {
      acc[asset.category] = (acc[asset.category] || 0) + asset.value;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({
    name,
    value,
    percentage: totalAssets > 0 ? ((value / totalAssets) * 100).toFixed(1) : '0',
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          {assets.length === 0 ? (
            <div className="h-80 flex items-center justify-center">
              <p className="text-slate-500">Add assets to see your allocation</p>
            </div>
          ) : (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => formatCurrency(Number(value))}
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend 
                    formatter={(value) => <span className="text-slate-300">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Allocation Details */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryData.map((item, index) => (
          <Card key={item.name} className="bg-slate-900 border-slate-800">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div>
                  <p className="text-slate-400 text-sm">{item.name}</p>
                  <p className="text-white font-semibold">{formatCurrency(item.value)}</p>
                  <p className="text-slate-500 text-xs">{item.percentage}% of portfolio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}