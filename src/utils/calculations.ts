import type { WealthData, CalculatedMetrics } from "../types/wealth";

export function calculateMetrics(data: WealthData): CalculatedMetrics {
  const nominalPortfolio = data.businessSalary + data.realEstate + data.cashDeposits;
  
  const historicalUsdValue = data.historicalRate > 0 
    ? data.historicalPortfolio / data.historicalRate 
    : 0;
  
  const currentUsdValue = data.currentRate > 0 
    ? nominalPortfolio / data.currentRate 
    : 0;
  
  const purchasingPowerDecay = currentUsdValue - historicalUsdValue;
  
  const foundationAllocation = nominalPortfolio > 0 
    ? ((data.realEstate + data.cashDeposits) / nominalPortfolio) * 100 
    : 0;
  
  const velocityAllocation = nominalPortfolio > 0 
    ? (data.businessSalary / nominalPortfolio) * 100 
    : 0;

  return {
    nominalPortfolio,
    historicalUsdValue,
    currentUsdValue,
    purchasingPowerDecay,
    foundationAllocation,
    velocityAllocation,
  };
}

export function formatNaira(value: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}