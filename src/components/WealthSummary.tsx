import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import type { Asset, Liability } from "../types/wealth";
import { TrendingUp, TrendingDown, Scale, Wallet } from "lucide-react";

interface WealthSummaryProps {
  assets: Asset[];
  liabilities: Liability[];
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

export function WealthSummary({ 
  assets, 
  liabilities, 
  totalAssets, 
  totalLiabilities, 
  netWorth 
}: WealthSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets * 100).toFixed(1) : '0';
  const averageAssetReturn = assets.length > 0 
    ? (assets.reduce((sum, a) => sum + a.value * a.annualReturn, 0) / totalAssets).toFixed(1)
    : '0';
  const averageLiabilityRate = liabilities.length > 0
    ? (liabilities.reduce((sum, l) => sum + l.value * l.interestRate, 0) / totalLiabilities).toFixed(1)
    : '0';

  const stats = [
    {
      label: 'Total Assets',
      value: formatCurrency(totalAssets),
      icon: TrendingUp,
      color: 'emerald',
      count: assets.length,
    },
    {
      label: 'Total Liabilities',
      value: formatCurrency(totalLiabilities),
      icon: TrendingDown,
      color: 'red',
      count: liabilities.length,
    },
    {
      label: 'Net Worth',
      value: formatCurrency(netWorth),
      icon: Wallet,
      color: netWorth >= 0 ? 'amber' : 'red',
      count: null,
    },
    {
      label: 'Debt-to-Asset Ratio',
      value: `${debtToAssetRatio}%`,
      icon: Scale,
      color: parseFloat(debtToAssetRatio) > 50 ? 'red' : 'emerald',
      count: null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className={`text-2xl font-bold mt-1 text-${stat.color}-500`}>
                    {stat.value}
                  </p>
                  {stat.count !== null && (
                    <p className="text-slate-500 text-xs mt-1">{stat.count} items</p>
                  )}
                </div>
                <div className={`p-2 bg-${stat.color}-500/10 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Asset Breakdown */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Asset Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {assets.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No assets added yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(
                  assets.reduce((acc, asset) => {
                    acc[asset.category] = (acc[asset.category] || 0) + asset.value;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([category, value]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-slate-300">{category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-medium">
                        {formatCurrency(value)}
                      </span>
                      <span className="text-slate-500 text-sm ml-2">
                        ({((value / totalAssets) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Liability Breakdown */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Liability Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {liabilities.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No liabilities added yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(
                  liabilities.reduce((acc, liability) => {
                    acc[liability.type] = (acc[liability.type] || 0) + liability.value;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([type, value]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-slate-300">{type}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-medium">
                        {formatCurrency(value)}
                      </span>
                      <span className="text-slate-500 text-sm ml-2">
                        ({((value / totalLiabilities) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Financial Health Indicators */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white text-lg">Financial Health Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-slate-800 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Avg. Asset Return</p>
              <p className="text-2xl font-bold text-emerald-500">{averageAssetReturn}%</p>
              <p className="text-slate-500 text-xs mt-1">Weighted average</p>
            </div>
            <div className="text-center p-4 bg-slate-800 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Avg. Liability Rate</p>
              <p className="text-2xl font-bold text-red-500">{averageLiabilityRate}%</p>
              <p className="text-slate-500 text-xs mt-1">Weighted average</p>
            </div>
            <div className="text-center p-4 bg-slate-800 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Net Interest Spread</p>
              <p className={`text-2xl font-bold ${parseFloat(averageAssetReturn) - parseFloat(averageLiabilityRate) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {(parseFloat(averageAssetReturn) - parseFloat(averageLiabilityRate)).toFixed(1)}%
              </p>
              <p className="text-slate-500 text-xs mt-1">Return minus cost</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}