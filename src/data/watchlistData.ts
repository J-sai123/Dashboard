
export interface WatchlistStock {
  _id?: string; // MongoDB ObjectId
  symbol: string;
  change: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MarketIndex {
  _id?: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const watchlistStocks: WatchlistStock[] = [
  { symbol: 'INFY', change: -1.60, price: 1555.45 },
  { symbol: 'ONGC', change: -0.09, price: 116.8 },
  { symbol: 'TCS', change: -0.25, price: 3194.8 },
  { symbol: 'KPITTECH', change: 3.54, price: 266.45 },
  { symbol: 'QUICKHEAL', change: -0.15, price: 308.55 },
  { symbol: 'WIPRO', change: 0.32, price: 577.75 },
  { symbol: 'M&M', change: -0.01, price: 779.8 },
  { symbol: 'RELIANCE', change: 1.44, price: 2112.4 },
  { symbol: 'HUL', change: 1.04, price: 512.4 }
];

export const marketIndices: MarketIndex[] = [
  { name: 'NIFTY 50', value: '19,674.25', change: '+0.82%', isPositive: true },
  { name: 'SENSEX', value: '66,589.93', change: '+0.91%', isPositive: true }
];
