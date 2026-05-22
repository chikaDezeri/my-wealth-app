export interface WealthData {
  businessSalary: number;
  realEstate: number;
  cashDeposits: number;
  historicalPortfolio: number;
  historicalRate: number;
  currentRate: number;
}

export interface CalculatedMetrics {
  nominalPortfolio: number;
  historicalUsdValue: number;
  currentUsdValue: number;
  purchasingPowerDecay: number;
  foundationAllocation: number;
  velocityAllocation: number;
}

export type AssetType = "Real Estate" | "Cash" | "Equities" | "Business" | "Other";

export type AssetCategory = 'Cash & Savings' | 'Stocks' | 'Bonds' | 'Real Estate' | 'Business' | 'Retirement' | 'Cryptocurrency' | 'Other';

export interface Asset {
  id: string;
  name: string;
  value: number;
  category: AssetCategory;
  annualReturn: number;
}

export type LiabilityType = 'Mortgage' | 'Student Loan' | 'Credit Card' | 'Auto Loan' | 'Personal Loan' | 'Other';

export interface Liability {
  id: string;
  name: string;
  value: number;
  type: LiabilityType;
  interestRate: number;
}