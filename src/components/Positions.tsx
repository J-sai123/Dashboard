import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from '@/lib/utils';

const Positions = () => {
  const [positionsData, setPositionsData] = useState([]);
  const [summary, setSummary] = useState({
    totalInvestment: 0,
    totalCurrentValue: 0,
    totalPnL: 0,
  });

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get('http://localhost:3002/positions');
        setPositionsData(response.data);
        calculateSummary(response.data);
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    fetchPositions();
  }, []);

  const calculateSummary = (data) => {
    const totalInvestment = data.reduce((sum, p) => sum + (p.avgCost * p.qty), 0);
    const totalCurrentValue = data.reduce((sum, p) => sum + p.curVal, 0);
    const totalPnL = data.reduce((sum, p) => sum + p.pnl, 0);
    setSummary({ totalInvestment, totalCurrentValue, totalPnL });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Positions ({positionsData.length})</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Instrument</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Type</th>
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
              {positionsData.map((position, index) => (
                <tr key={position._id} className={cn(
                  "border-t border-border hover:bg-muted/30 transition-colors",
                  index % 2 === 0 ? "bg-white" : "bg-muted/10"
                )}>
                  <td className="p-4 font-medium">{position.instrument}</td>
                  <td className="p-4 text-right">{position.type}</td>
                  <td className="p-4 text-right">{position.qty}</td>
                  <td className="p-4 text-right">₹{position.avgCost.toFixed(2)}</td>
                  <td className="p-4 text-right">₹{position.ltp.toFixed(2)}</td>
                  <td className="p-4 text-right">₹{position.curVal.toFixed(2)}</td>
                  <td className={cn(
                    "p-4 text-right font-medium",
                    position.pnl >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {position.pnl >= 0 ? '+' : ''}₹{position.pnl.toFixed(2)}
                  </td>
                  <td className={cn(
                    "p-4 text-right font-medium",
                    position.netChg >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {position.netChg >= 0 ? '+' : ''}{position.netChg.toFixed(2)}%
                  </td>
                  <td className={cn(
                    "p-4 text-right font-medium",
                    position.dayChg >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {position.dayChg >= 0 ? '+' : ''}{position.dayChg.toFixed(2)}%
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
                <span className="font-semibold">₹{summary.totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Current value: </span>
                <span className="font-semibold">₹{summary.totalCurrentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className={cn(
              "font-semibold",
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
