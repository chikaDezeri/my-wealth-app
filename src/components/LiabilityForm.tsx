import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import type { Liability, LiabilityType } from "../types/wealth";

interface LiabilityFormProps {
  onAdd: (liability: Omit<Liability, 'id'>) => void;
}

const types: LiabilityType[] = [
  'Mortgage',
  'Student Loan',
  'Credit Card',
  'Auto Loan',
  'Personal Loan',
  'Other',
];

const defaultRates: Record<LiabilityType, number> = {
  'Mortgage': 6,
  'Student Loan': 5,
  'Credit Card': 20,
  'Auto Loan': 7,
  'Personal Loan': 10,
  'Other': 8,
};

export function LiabilityForm({ onAdd }: LiabilityFormProps) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState<LiabilityType>('Mortgage');
  const [interestRate, setInterestRate] = useState('6');

  const handleTypeChange = (t: LiabilityType) => {
    setType(t);
    setInterestRate(defaultRates[t].toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !value) return;

    onAdd({
      name,
      value: parseFloat(value),
      type,
      interestRate: parseFloat(interestRate) || 0,
    });

    setName('');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-slate-300">Liability Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Home Loan, Car"
            className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 mt-1"
          />
        </div>
        <div>
          <Label className="text-slate-300">Amount ($)</Label>
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
          <Label className="text-slate-300">Type</Label>
          <Select value={type} onValueChange={(v) => handleTypeChange(v as LiabilityType)}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {types.map((t) => (
                <SelectItem key={t} value={t} className="text-white hover:bg-slate-700">
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-slate-300">Interest Rate (%)</Label>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white mt-1"
          />
        </div>
      </div>
      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
        Add Liability
      </Button>
    </form>
  );
}