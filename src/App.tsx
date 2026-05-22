import { useState } from "react";
import { Shield, TrendingDown, Scale, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { PhaseOne } from "./components/PhaseOne";
import { PhaseTwo } from "./components/PhaseTwo";
import { PhaseThree } from "./components/PhaseThree";
import { ArchitectureSummary } from "./components/ArchitectureSummary";
import type { WealthData } from "./types/wealth";


export default function App() {
  const [data, setData] = useState<WealthData>({
    businessSalary: 0,
    realEstate: 0,
    cashDeposits: 0,
    historicalPortfolio: 0,
    historicalRate: 0,
    currentRate: 0,
  });

  const updateField = (field: keyof WealthData, value: number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 p-2.5 rounded-lg">
                <Shield className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">THE WEALTH ARCHITECTURE CALCULATOR</h1>
                <p className="text-slate-400 text-sm">Proprietary Diagnostic Matrix</p>
              </div>
            </div>
            
            {/* QC Stamp */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg">
              <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
                <span className="text-slate-950 font-bold text-sm">QC</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm">Quiet Capital</span>
                <span className="text-slate-500 text-xs">Wealth Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Phase 1 */}
        <PhaseOne data={data} updateField={updateField} />

        {/* Phase 2 */}
        <PhaseTwo data={data} updateField={updateField} />

        {/* Phase 3 */}
        <PhaseThree data={data} />

        {/* Summary */}
        <ArchitectureSummary data={data} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-slate-950 font-bold">QC</span>
              </div>
              <div>
                <p className="text-white font-semibold">Quiet Capital</p>
                <p className="text-slate-500 text-xs">Wealth Architecture Systems</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span>Proprietary Diagnostic Matrix</span>
              <span className="text-slate-700">•</span>
              <span>All Rights Reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}