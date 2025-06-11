
export interface Position {
  _id?: string; // MongoDB ObjectId
  userId?: string; // Reference to user
  product: string;
  instrument: string;
  qty: number;
  avg: number;
  ltp: number;
  pnl: number;
  chg: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const positionsData: Position[] = [
  {
    product: 'CNC',
    instrument: 'EVEREADY',
    qty: 2,
    avg: 316.27,
    ltp: 312.35,
    pnl: -7.84,
    chg: -1.24
  },
  {
    product: 'CNC',
    instrument: 'JUBLFOOD',
    qty: 1,
    avg: 3124.75,
    ltp: 3082.65,
    pnl: -42.10,
    chg: -1.35
  }
];

export const calculatePositionsSummary = (positions: Position[]) => {
  const totalPnL = positions.reduce((sum, position) => sum + position.pnl, 0);
  const totalInvestment = positions.reduce((sum, position) => sum + (position.avg * position.qty), 0);
  
  return {
    totalPnL,
    totalInvestment,
    totalPositions: positions.length
  };
};
