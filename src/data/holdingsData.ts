
export interface Holding {
  _id?: string; // MongoDB ObjectId
  userId?: string; // Reference to user
  instrument: string;
  qty: number;
  avgCost: number;
  ltp: number;
  curVal: number;
  pnl: number;
  netChg: number;
  dayChg: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const holdingsData: Holding[] = [
  {
    instrument: 'BHARTIARTL',
    qty: 2,
    avgCost: 538.05,
    ltp: 541.15,
    curVal: 1082.30,
    pnl: 6.20,
    netChg: 0.38,
    dayChg: 0.56
  },
  {
    instrument: 'HDFCBANK',
    qty: 2,
    avgCost: 1383.40,
    ltp: 1522.35,
    curVal: 3044.70,
    pnl: 277.90,
    netChg: 10.04,
    dayChg: 0.11
  },
  {
    instrument: 'HINDUNILVR',
    qty: 1,
    avgCost: 2335.85,
    ltp: 2417.40,
    curVal: 2417.40,
    pnl: 81.55,
    netChg: 3.49,
    dayChg: 0.21
  },
  {
    instrument: 'ITC',
    qty: 5,
    avgCost: 455.20,
    ltp: 462.85,
    curVal: 2314.25,
    pnl: 38.25,
    netChg: 1.68,
    dayChg: 0.43
  },
  {
    instrument: 'RELIANCE',
    qty: 1,
    avgCost: 2089.75,
    ltp: 2112.40,
    curVal: 2112.40,
    pnl: 22.65,
    netChg: 1.08,
    dayChg: 1.44
  },
  {
    instrument: 'TATASTEEL',
    qty: 3,
    avgCost: 125.30,
    ltp: 128.95,
    curVal: 386.85,
    pnl: 10.95,
    netChg: 2.91,
    dayChg: -0.23
  },
  {
    instrument: 'INFY',
    qty: 6,
    avgCost: 1578.90,
    ltp: 1555.45,
    curVal: 1555.45,
    pnl: -23.45,
    netChg: -1.49,
    dayChg: -1.60
  }
];

export const calculateHoldingsSummary = (holdings: Holding[]) => {
  const totalInvestment = holdings.reduce((sum, holding) => sum + (holding.avgCost * holding.qty), 0);
  const totalCurrentValue = holdings.reduce((sum, holding) => sum + holding.curVal, 0);
  const totalPnL = totalCurrentValue - totalInvestment;
  
  return {
    totalInvestment,
    totalCurrentValue,
    totalPnL,
    totalPnLPercentage: (totalPnL / totalInvestment) * 100
  };
};
