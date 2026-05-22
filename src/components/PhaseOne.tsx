import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import type { WealthData } from "../types/wealth";
import { formatNaira, calculateMetrics } from "../utils/calculations";

interface PhaseOneProps {
  data: WealthData;
  updateField: (field: keyof WealthData, value: number) => void;
}

export function PhaseOne({ data, updateField }: PhaseOneProps) {
  const metrics = calculateMetrics(data);

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 p-2 rounded-lg">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          </div>
          <div>
            <CardTitle className="text-white">Phase 1: The Currency & Asset Shield</CardTitle>
            <CardDescription className="text-slate-400">Establish your raw local volume</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {/* Business/Salary */}
        <div className="grid sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <Label className="text-slate-300 text-sm">
              Total Local Business/Salary Value (over the past 12 Months)
            </Label>
            <Input
              type="number"
              value={data.businessSalary || ''}
              onChange={(e) => updateField('businessSalary', parseFloat(e.target.value) || 0)}
              placeholder="e.g., 50,000,000"
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 mt-1.5"
            />
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <p className="text-slate-500 text-xs">Architect's Note</p>
            <p className="text-slate-400 text-sm">e.g., 50,000,000</p>
          </div>
        </div>

        {/* Real Estate */}
        <div className="grid sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <Label className="text-slate-300 text-sm">
              Total Local Real Estate Market Value
            </Label>
            <Input
              type="number"
              value={data.realEstate || ''}
              onChange={(e) => updateField('realEstate', parseFloat(e.target.value) || 0)}
              placeholder="Enter amount in ₦"
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 mt-1.5"
            />
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <p className="text-slate-500 text-xs">Architect's Note</p>
            <p className="text-slate-400 text-sm">Current market valuation, not cost</p>
          </div>
        </div>

        {/* Cash & Deposits */}
        <div className="grid sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <Label className="text-slate-300 text-sm">
              Total Local Cash, Fixed Deposits & Bonds
            </Label>
            <Input
              type="number"
              value={data.cashDeposits || ''}
              onChange={(e) => updateField('cashDeposits', parseFloat(e.target.value) || 0)}
              placeholder="Enter amount in ₦"
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 mt-1.5"
            />
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <p className="text-slate-500 text-xs">Architect's Note</p>
            <p className="text-slate-400 text-sm">Liquid reserves</p>
          </div>
        </div>

        {/* Total Portfolio */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Current Total Nominal Portfolio</p>
              <p className="text-xs text-slate-500 mt-1">Your raw local volume</p>
            </div>
            <p className="text-2xl font-bold text-emerald-500">
              {formatNaira(metrics.nominalPortfolio)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}