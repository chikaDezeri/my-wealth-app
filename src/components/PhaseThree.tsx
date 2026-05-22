import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import type { WealthData } from "../types/wealth";
import { formatPercent, calculateMetrics } from "../utils/calculations";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface PhaseThreeProps {
  data: WealthData;
}

export function PhaseThree({ data }: PhaseThreeProps) {
  const metrics = calculateMetrics(data);

  const foundationStatus = metrics.foundationAllocation >= 70 ? 'optimal' : 'warning';
  const velocityStatus = metrics.velocityAllocation >= 10 && metrics.velocityAllocation <= 30 
    ? 'optimal' 
    : metrics.velocityAllocation < 10 
      ? 'warning' 
      : 'info';

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-violet-500/10 p-2 rounded-lg">
            <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
          </div>
          <div>
            <CardTitle className="text-white">Phase 3: The Barbell Ratio Audit</CardTitle>
            <CardDescription className="text-slate-400">Analyze your portfolio allocation strategy</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {/* Foundation Allocation */}
        <div className={`border rounded-lg p-4 ${
          foundationStatus === 'optimal' 
            ? 'bg-emerald-500/10 border-emerald-500/30' 
            : 'bg-amber-500/10 border-amber-500/30'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              {foundationStatus === 'optimal' ? (
                <div className="bg-emerald-500/20 p-2 rounded-lg mt-0.5">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
              ) : (
                <div className="bg-amber-500/20 p-2 rounded-lg mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
              )}
              <div>
                <p className="text-slate-300 text-sm font-medium">The Foundation Allocation</p>
                <p className="text-xs text-slate-500 mt-1">Target: 70% • Local Stability (Real Estate + Cash)</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${
                foundationStatus === 'optimal' ? 'text-emerald-500' : 'text-amber-500'
              }`}>
                {formatPercent(metrics.foundationAllocation)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {foundationStatus === 'optimal' ? 'On Target' : 'Below Target'}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  foundationStatus === 'optimal' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(metrics.foundationAllocation, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-slate-500">0%</span>
              <span className="text-xs text-emerald-500">70% Target</span>
              <span className="text-xs text-slate-500">100%</span>
            </div>
          </div>
        </div>

        {/* Velocity Zone Allocation */}
        <div className={`border rounded-lg p-4 ${
          velocityStatus === 'optimal' 
            ? 'bg-emerald-500/10 border-emerald-500/30' 
            : velocityStatus === 'warning'
            ? 'bg-amber-500/10 border-amber-500/30'
            : 'bg-sky-500/10 border-sky-500/30'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              {velocityStatus === 'optimal' ? (
                <div className="bg-emerald-500/20 p-2 rounded-lg mt-0.5">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
              ) : velocityStatus === 'warning' ? (
                <div className="bg-amber-500/20 p-2 rounded-lg mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
              ) : (
                <div className="bg-sky-500/20 p-2 rounded-lg mt-0.5">
                  <Info className="w-5 h-5 text-sky-500" />
                </div>
              )}
              <div>
                <p className="text-slate-300 text-sm font-medium">The Velocity Zone Allocation</p>
                <p className="text-xs text-slate-500 mt-1">Target: 10%-30% • Digital IP / Scale (Business/Salary)</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${
                velocityStatus === 'optimal' 
                  ? 'text-emerald-500' 
                  : velocityStatus === 'warning'
                  ? 'text-amber-500'
                  : 'text-sky-400'
              }`}>
                {formatPercent(metrics.velocityAllocation)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {velocityStatus === 'optimal' 
                  ? 'In Range' 
                  : velocityStatus === 'warning'
                  ? 'Below Range'
                  : 'Above Range'}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden relative">
              <div 
                className={`h-full transition-all duration-500 ${
                  velocityStatus === 'optimal' 
                    ? 'bg-emerald-500' 
                    : velocityStatus === 'warning'
                    ? 'bg-amber-500'
                    : 'bg-sky-400'
                }`}
                style={{ width: `${Math.min(metrics.velocityAllocation, 100)}%` }}
              />
              {/* Target Range Indicator */}
              <div className="absolute top-0 h-full w-px bg-emerald-500/50" style={{ left: '10%' }} />
              <div className="absolute top-0 h-full w-px bg-emerald-500/50" style={{ left: '30%' }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-slate-500">0%</span>
              <span className="text-xs text-emerald-500">10%-30% Target Range</span>
              <span className="text-xs text-slate-500">100%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}