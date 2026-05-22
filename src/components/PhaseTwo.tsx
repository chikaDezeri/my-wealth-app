import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import type { WealthData } from "../types/wealth";
import { formatNaira, formatUSD, calculateMetrics } from "../utils/calculations";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

interface PhaseTwoProps {
  data: WealthData;
  updateField: (field: keyof WealthData, value: number) => void;
}

export function PhaseTwo({ data, updateField }: PhaseTwoProps) {
  const metrics = calculateMetrics(data);
  const isDecay = metrics.purchasingPowerDecay < 0;
  const isNeutral = metrics.purchasingPowerDecay === 0;

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/10 p-2 rounded-lg">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          </div>
          <div>
            <CardTitle className="text-white">Phase 2: The Naira-Neutral Filter (12-Month Decay)</CardTitle>
            <CardDescription className="text-slate-400">Measure your true global purchasing power</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {/* Historical Portfolio */}
        <div className="grid sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <Label className="text-slate-300 text-sm">
              Total Nominal Portfolio Value (12 Months Ago)
            </Label>
            <Input
              type="number"
              value={data.historicalPortfolio || ''}
              onChange={(e) => updateField('historicalPortfolio', parseFloat(e.target.value) || 0)}
              placeholder="Enter amount in ₦"
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 mt-1.5"
            />
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <p className="text-slate-500 text-xs">Architect's Note</p>
            <p className="text-slate-400 text-sm">Historical baseline</p>
          </div>
        </div>

        {/* Historical Rate */}
        <div className="grid sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <Label className="text-slate-300 text-sm">
              Parallel Market Exchange Rate (12 Months Ago)
            </Label>
            <Input
              type="number"
              value={data.historicalRate || ''}
              onChange={(e) => updateField('historicalRate', parseFloat(e.target.value) || 0)}
              placeholder="Enter rate: ₦/$"
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 mt-1.5"
            />
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <p className="text-slate-500 text-xs">Architect's Note</p>
            <p className="text-slate-400 text-sm">Historical currency peg</p>
          </div>
        </div>

        {/* Historical USD Value */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Historical USD Value</p>
              <p className="text-xs text-slate-500 mt-1">Your true global baseline</p>
            </div>
            <p className="text-xl font-semibold text-sky-400">
              {formatUSD(metrics.historicalUsdValue)}
            </p>
          </div>
        </div>

        {/* Current Rate */}
        <div className="grid sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <Label className="text-slate-300 text-sm">
              Current Parallel Market Exchange Rate
            </Label>
            <Input
              type="number"
              value={data.currentRate || ''}
              onChange={(e) => updateField('currentRate', parseFloat(e.target.value) || 0)}
              placeholder="Enter rate: ₦/$"
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 mt-1.5"
            />
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <p className="text-slate-500 text-xs">Architect's Note</p>
            <p className="text-slate-400 text-sm">Today's reality</p>
          </div>
        </div>

        {/* Current USD Value */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Current USD Value</p>
              <p className="text-xs text-slate-500 mt-1">Your true current global reach</p>
            </div>
            <p className="text-xl font-semibold text-sky-400">
              {formatUSD(metrics.currentUsdValue)}
            </p>
          </div>
        </div>

        {/* Purchasing Power Decay */}
        <div className={`border rounded-lg p-4 ${
          isDecay 
            ? 'bg-red-500/10 border-red-500/30' 
            : isNeutral 
              ? 'bg-slate-800 border-slate-700'
              : 'bg-emerald-500/10 border-emerald-500/30'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDecay ? (
                <div className="bg-red-500/20 p-2 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                </div>
              ) : isNeutral ? (
                <div className="bg-slate-700 p-2 rounded-lg">
                  <Minus className="w-5 h-5 text-slate-400" />
                </div>
              ) : (
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
              )}
              <div>
                <p className="text-slate-300 text-sm font-medium">Net Global Purchasing Power Decay</p>
                <p className="text-xs text-slate-500 mt-1">If negative, you are losing ground</p>
              </div>
            </div>
            <p className={`text-2xl font-bold ${
              isDecay ? 'text-red-500' : isNeutral ? 'text-slate-400' : 'text-emerald-500'
            }`}>
              {isDecay ? '' : '+'}{formatUSD(metrics.purchasingPowerDecay)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}