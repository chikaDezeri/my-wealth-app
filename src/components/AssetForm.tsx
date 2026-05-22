import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import type { Asset, AssetCategory } from "../types/wealth";

interface AssetFormProps {
  onAdd: (asset: Omit<Asset, 'id'>) => void;
}

const categories: AssetCategory[] = [
  'Cash & Savings',
  'Stocks',
  'Bonds',
  'Real Estate',
  'Business',
  'Retirement',
  'Cryptocurrency',
  'Other',
];

const defaultReturns: Record<AssetCategory, number> = {
  'Cash & Savings': 2,
  'Stocks': 8,
  'Bonds': 4,
  'Real Estate': 6,
  'Business': 12,
  'Retirement': 7,
  'Cryptocurrency': 15,
  'Other': 5,
};

export function AssetForm({ onAdd }: AssetFormProps) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<AssetCategory>('Stocks');
  const [annualReturn, setAnnualReturn] = useState('8');

  const handleCategoryChange = (cat: AssetCategory) => {
    setCategory(cat);
    setAnnualReturn(defaultReturns[cat].toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !value) return;

    onAdd({
      name,
      value: parseFloat(value),
      category,
      annualReturn: parseFloat(annualReturn) || 0,
    });

    setName('');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-slate-300">Asset Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., 401k, Brokerage"
            className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 mt-1"
          />
        </div>
        <div>
          <Label className="text-slate-300">Value ($)</Label>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0"
            className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 mt-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-slate-300">Category</Label>
          <Select value={category} onValueChange={(v) => handleCategoryChange(v as AssetCategory)}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-white hover:bg-slate-700">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-slate-300">Annual Return (%)</Label>
          <Input
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white mt-1"
          />
        </div>
      </div>
      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
        Add Asset
      </Button>
    </form>
  );
}