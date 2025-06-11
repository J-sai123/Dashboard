
import React from 'react';
import { cn } from '@/lib/utils';

const Positions = () => {
  const positionsData = [
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

  const totalPnL = positionsData.reduce((sum, position) => sum + position.pnl, 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Positions (2)</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Product</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Instrument</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Qty</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Avg</th>
                <th className="text-right p-4 font-medium text-muted-foreground">LTP</th>
                <th className="text-right p-4 font-medium text-muted-foreground">P&L</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Chg</th>
              </tr>
            </thead>
            <tbody>
              {positionsData.map((position, index) => (
                <tr key={position.instrument} className={cn(
                  "border-t border-border hover:bg-muted/30 transition-colors",
                  index % 2 === 0 ? "bg-white" : "bg-muted/10"
                )}>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {position.product}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{position.instrument}</td>
                  <td className="p-4 text-right">{position.qty}</td>
                  <td className="p-4 text-right">₹{position.avg.toFixed(2)}</td>
                  <td className="p-4 text-right">₹{position.ltp.toFixed(2)}</td>
                  <td className={cn(
                    "p-4 text-right font-medium",
                    position.pnl >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {position.pnl >= 0 ? '+' : ''}₹{position.pnl.toFixed(2)}
                  </td>
                  <td className={cn(
                    "p-4 text-right font-medium",
                    position.chg >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {position.chg >= 0 ? '+' : ''}{position.chg.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="border-t border-border bg-muted/20 p-4">
          <div className="flex justify-end">
            <div className={cn(
              "font-semibold text-lg",
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

export default Positions;
