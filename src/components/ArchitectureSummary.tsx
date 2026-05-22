import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import type { WealthData } from "../types/wealth";
import { formatNaira, formatUSD, calculateMetrics } from "../utils/calculations";
import { Shield, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

interface ArchitectureSummaryProps {
  data: WealthData;
}

export function ArchitectureSummary({ data }: ArchitectureSummaryProps) {
  const metrics = calculateMetrics(data);
  const hasDecay = metrics.purchasingPowerDecay < 0;
  const foundationOk = metrics.foundationAllocation >= 70;
  const velocityOk = metrics.velocityAllocation >= 10 && metrics.velocityAllocation <= 30;

  const overallHealth = hasDecay 
    ? 'critical' 
    : foundationOk && velocityOk 
      ? 'healthy' 
      : 'warning';

  return (
    <Card className={`border relative overflow-hidden ${
      overallHealth === 'healthy' 
        ? 'bg-emerald-950 border-emerald-800' 
        : overallHealth === 'warning'
        ? 'bg-amber-950 border-amber-800'
        : 'bg-red-950 border-red-800'
    }`}>
      {/* QC Watermark */}
      <div className="absolute top-4 right-4 opacity-10">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
            <span className="text-slate-950 font-bold text-lg">QC</span>
          </div>
        </div>
      </div>

      <CardHeader className="border-b border-slate-800">
        <div className="flex items-center gap-3">
          {overallHealth === 'healthy' ? (
            <div className="bg-emerald-500/20 p-2 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
          ) : overallHealth === 'warning' ? (
            <div className="bg-amber-500/20 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
            </div>
          ) : (
            <div className="bg-red-500/20 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
          )}
          <div>
            <CardTitle className="text-white">Architecture Summary</CardTitle>
            <p className={`text-sm ${
              overallHealth === 'healthy' 
                ? 'text-emerald-400' 
                : overallHealth === 'warning'
                ? 'text-amber-400'
                : 'text-red-400'
            }`}>
              {overallHealth === 'healthy' 
                ? 'Your wealth architecture is well-balanced' 
                : overallHealth === 'warning'
                ? 'Consider rebalancing your allocations'
                : 'Critical: Your purchasing power is decaying'}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <p className="text-slate-400 text-xs mb-1">Total Portfolio</p>
            <p className="text-xl font-bold text-white">{formatNaira(metrics.nominalPortfolio)}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <p className="text-slate-400 text-xs mb-1">Current USD Value</p>
            <p className="text-xl font-bold text-sky-400">{formatUSD(metrics.currentUsdValue)}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <p className="text-slate-400 text-xs mb-1">Purchasing Power Change</p>
            <p className={`text-xl font-bold ${hasDecay ? 'text-red-500' : 'text-emerald-500'}`}>
              {hasDecay ? '' : '+'}{formatUSD(metrics.purchasingPowerDecay)}
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <p className="text-slate-400 text-xs mb-1">Allocation Score</p>
            <p className={`text-xl font-bold ${
              foundationOk && velocityOk ? 'text-emerald-500' : 'text-amber-500'
            }`}>
              {foundationOk && velocityOk ? 'Optimal' : 'Needs Adjustment'}
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-6 space-y-3">
          <h4 className="text-white font-medium text-sm">Key Insights</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className={`p-3 rounded-lg ${
              hasDecay ? 'bg-red-500/10 border border-red-500/20' : 'bg-emerald-500/10 border border-emerald-500/20'
            }`}>
              <div className="flex items-center gap-2">
                {hasDecay ? (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                )}
                <span className={`text-sm ${hasDecay ? 'text-red-400' : 'text-emerald-400'}`}>
                  {hasDecay 
                    ? 'Currency decay is eroding your global purchasing power' 
                    : 'Your global purchasing power is stable or growing'}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${
              foundationOk ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-amber-500/10 border border-amber-500/20'
            }`}>
              <div className="flex items-center gap-2">
                {foundationOk ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                )}
                <span className={`text-sm ${foundationOk ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {foundationOk 
                    ? 'Foundation allocation meets the 70% stability target' 
                    : 'Increase foundation allocation for better stability'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* QC Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center">
              <span className="text-slate-950 font-bold text-xs">QC</span>
            </div>
            <span className="text-slate-500 text-xs">Quiet Capital Wealth Architecture</span>
          </div>
          <span className="text-slate-600 text-xs">Diagnostic Report</span>
        </div>
      </CardContent>
    </Card>
  );
}