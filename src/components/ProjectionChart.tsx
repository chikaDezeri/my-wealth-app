import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import type { Asset, Liability } from "../types/wealth";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";

interface ProjectionChartProps {
  assets: Asset[];
  liabilities: Liability[];
  netWorth: number;
  years: number;
}

export function ProjectionChart({ assets, liabilities, netWorth, years }: ProjectionChartProps) {
  const generateProjection = () => {
    const data = [];
    let currentAssets = assets.reduce((sum, a) => sum + a.value, 0);
    let currentLiabilities = liabilities.reduce((sum, l) => sum + l.value, 0);

    for (let year = 0; year <= years; year++) {
      data.push({
        year: `Year ${year}`,
        assets: Math.round(currentAssets),
        liabilities: Math.round(currentLiabilities),
        netWorth: Math.round(currentAssets - currentLiabilities),
      });

      // Apply growth to assets
      assets.forEach(asset => {
        currentAssets += asset.value * (asset.annualReturn / 100);
      });

      // Apply interest to liabilities (simplified - assumes no payments)
      liabilities.forEach(liability => {
        currentLiabilities += liability.value * (liability.interestRate / 100);
      });
    }

    return data;
  };

  const projectionData = generateProjection();

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const finalNetWorth = projectionData[projectionData.length - 1]?.netWorth || 0;
  const growthRate = netWorth > 0 
    ? (((finalNetWorth / netWorth) ** (1 / years) - 1) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      {/* Projection Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <p className="text-slate-400 text-sm">Starting Net Worth</p>
            <p className="text-2xl font-bold text-white mt-1">
              {formatCurrency(netWorth)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <p className="text-slate-400 text-sm">Projected Net Worth</p>
            <p className={`text-2xl font-bold mt-1 ${finalNetWorth >= netWorth ? 'text-emerald-500' : 'text-red-500'}`}>
              {formatCurrency(finalNetWorth)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <p className="text-slate-400 text-sm">CAGR</p>
            <p className={`text-2xl font-bold mt-1 ${parseFloat(growthRate) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {growthRate}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">{years}-Year Wealth Projection</CardTitle>
        </CardHeader>
        <CardContent>
          {assets.length === 0 && liabilities.length === 0 ? (
            <div className="h-80 flex items-center justify-center">
              <p className="text-slate-500">Add assets and liabilities to see projections</p>
            </div>
          ) : (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData}>
                  <defs>
                    <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLiabilities" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="year" stroke="#94a3b8" />
                  <YAxis tickFormatter={formatCurrency} stroke="#94a3b8" />
                  <Tooltip 
                    formatter={(value: any) => formatCurrency(value)}
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="assets" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorAssets)" 
                    name="Assets"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="liabilities" 
                    stroke="#ef4444" 
                    fillOpacity={1} 
                    fill="url(#colorLiabilities)" 
                    name="Liabilities"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="netWorth" 
                    stroke="#f59e0b" 
                    fillOpacity={1} 
                    fill="url(#colorNetWorth)" 
                    name="Net Worth"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Year-by-Year Breakdown */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Year-by-Year Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-slate-400 text-sm font-medium py-2">Year</th>
                  <th className="text-right text-slate-400 text-sm font-medium py-2">Assets</th>
                  <th className="text-right text-slate-400 text-sm font-medium py-2">Liabilities</th>
                  <th className="text-right text-slate-400 text-sm font-medium py-2">Net Worth</th>
                </tr>
              </thead>
              <tbody>
                {projectionData.map((row, index) => (
                  <tr key={index} className="border-b border-slate-800">
                    <td className="text-white py-2">{row.year}</td>
                    <td className="text-right text-emerald-500 py-2">{formatCurrency(row.assets)}</td>
                    <td className="text-right text-red-500 py-2">{formatCurrency(row.liabilities)}</td>
                    <td className={`text-right py-2 ${row.netWorth >= 0 ? 'text-amber-500' : 'text-red-500'}`}>
                      {formatCurrency(row.netWorth)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}