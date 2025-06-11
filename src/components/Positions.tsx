
import React from 'react';
import { cn } from '@/lib/utils';
import { positionsData, calculatePositionsSummary } from '@/data';

const Positions = () => {
  const summary = calculatePositionsSummary(positionsData);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Positions ({summary.totalPositions})</h1>
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
              summary.totalPnL >= 0 ? "text-green-600" : "text-red-600"
            )}>
              Total P&L: {summary.totalPnL >= 0 ? '+' : ''}₹{summary.totalPnL.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Positions;
