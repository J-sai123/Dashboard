
import React from 'react';
import { cn } from '@/lib/utils';

const Holdings = () => {
  const holdingsData = [
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
      qty: 1,
      avgCost: 1578.90,
      ltp: 1555.45,
      curVal: 1555.45,
      pnl: -23.45,
      netChg: -1.49,
      dayChg: -1.60
    }
  ];

  const totalInvestment = holdingsData.reduce((sum, holding) => sum + (holding.avgCost * holding.qty), 0);
  const totalCurrentValue = holdingsData.reduce((sum, holding) => sum + holding.curVal, 0);
  const totalPnL = totalCurrentValue - totalInvestment;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Holdings (13)</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Instrument</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Qty.</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Avg. cost</th>
                <th className="text-right p-4 font-medium text-muted-foreground">LTP</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Cur. val</th>
                <th className="text-right p-4 font-medium text-muted-foreground">P&L</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Net chg</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Day chg</th>
              </tr>
            </thead>
            <tbody>
              {holdingsData.map((holding, index) => (
                <tr key={holding.instrument} className={cn(
                  "border-t border-border hover:bg-muted/30 transition-colors",
                  index % 2 === 0 ? "bg-white" : "bg-muted/10"
                )}>
                  <td className="p-4 font-medium">{holding.instrument}</td>
                  <td className="p-4 text-right">{holding.qty}</td>
                  <td className="p-4 text-right">₹{holding.avgCost.toFixed(2)}</td>
                  <td className="p-4 text-right">₹{holding.ltp.toFixed(2)}</td>
                  <td className="p-4 text-right">₹{holding.curVal.toFixed(2)}</td>
                  <td className={cn(
                    "p-4 text-right font-medium",
                    holding.pnl >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {holding.pnl >= 0 ? '+' : ''}₹{holding.pnl.toFixed(2)}
                  </td>
                  <td className={cn(
                    "p-4 text-right font-medium",
                    holding.netChg >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {holding.netChg >= 0 ? '+' : ''}{holding.netChg.toFixed(2)}%
                  </td>
                  <td className={cn(
                    "p-4 text-right font-medium",
                    holding.dayChg >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {holding.dayChg >= 0 ? '+' : ''}{holding.dayChg.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="border-t border-border bg-muted/20 p-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-8">
              <div>
                <span className="text-muted-foreground">Total investment: </span>
                <span className="font-semibold">₹{totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Current value: </span>
                <span className="font-semibold">₹{totalCurrentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className={cn(
              "font-semibold",
              totalPnL >= 0 ? "text-green-600" : "text-red-600"
            )}>
              Total P&L: {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holdings;
