
import React from 'react';
import { Button } from '@/components/ui/button';

const Funds = () => {
  const equityData = {
    availableMargin: 4043.10,
    usedMargin: 3757.30,
    availableCash: 4043.10,
    openingBalance: 4043.10,
    openingBalance2: 3736.40,
    payin: 4064.00,
    span: 0.00,
    deliveryMargin: 0.00,
    exposure: 0.00,
    optionsPremium: 0.00,
    collateralLiquid: 0.00,
    collateralEquity: 0.00
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Funds</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <h2 className="text-lg font-semibold mb-6 text-foreground">Equity</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Available margin</span>
              <span className="font-semibold text-lg">₹{equityData.availableMargin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Used margin</span>
              <span className="font-semibold">₹{equityData.usedMargin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Available cash</span>
              <span className="font-semibold">₹{equityData.availableCash.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Opening Balance</span>
              <span className="font-semibold">₹{equityData.openingBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })} & ₹{equityData.openingBalance2.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Payin</span>
              <span className="font-semibold">₹{equityData.payin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">SPAN</span>
              <span className="font-semibold">₹{equityData.span.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Delivery margin</span>
              <span className="font-semibold">₹{equityData.deliveryMargin.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Exposure</span>
              <span className="font-semibold">₹{equityData.exposure.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Options premium</span>
              <span className="font-semibold">₹{equityData.optionsPremium.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Collateral (Liquid funds)</span>
              <span className="font-semibold">₹{equityData.collateralLiquid.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Collateral (Equity)</span>
              <span className="font-semibold">₹{equityData.collateralEquity.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-6">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Add funds
          </Button>
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            Withdraw
          </Button>
        </div>

        {/* UPI Transfer Note */}
        <div className="text-sm text-muted-foreground">
          <p>• Instant fund transfer via UPI</p>
          <p>• Withdrawals are processed within 30 minutes during market hours</p>
        </div>
      </div>
    </div>
  );
};

export default Funds;
