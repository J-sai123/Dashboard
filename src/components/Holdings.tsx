import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import axios from 'axios';

const Holdings = () => {
  const [holdingsData, setHoldingsData] = useState([]);
  const [summary, setSummary] = useState({
    totalInvestment: 0,
    totalCurrentValue: 0,
    totalPnL: 0,
  });

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get('http://localhost:3002/holdings');
        setHoldingsData(response.data);
        calculateSummary(response.data);
      } catch (error) {
        console.error('Error fetching holdings:', error);
      }
    };

    fetchHoldings();
  }, []);

  const calculateSummary = (data) => {
    const totalInvestment = data.reduce((sum, h) => sum + (h.avgCost * h.qty), 0);
    const totalCurrentValue = data.reduce((sum, h) => sum + h.curVal, 0);
    const totalPnL = data.reduce((sum, h) => sum + h.pnl, 0);
    setSummary({ totalInvestment, totalCurrentValue, totalPnL });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Holdings ({holdingsData.length})</h1>
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
                <tr key={holding._id} className={cn(
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

export default Holdings;
