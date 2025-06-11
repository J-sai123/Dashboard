
import React from 'react';
import { Link, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Hi, User!</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equity Section */}
        <div className="bg-white rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Equity</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Available margin</span>
              <span className="font-semibold">₹3.74k</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Margins used</span>
              <span className="font-semibold">₹0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Opening balance</span>
              <span className="font-semibold">₹3.74k</span>
            </div>
          </div>
        </div>

        {/* Holdings Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Holdings</h2>
            <span className="text-sm text-muted-foreground">(13)</span>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Current Value</div>
                <div className="text-2xl font-bold">₹31.43k</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Investment</div>
                <div className="text-2xl font-bold">₹29.88k</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-lg font-bold text-green-600">₹1.55k</div>
                <div className="text-sm text-green-600">+5.20%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-shadow cursor-pointer">
       <Link to="/orders" className="block">
          <h3 className="font-medium mb-2">Orders</h3>
          <p className="text-sm text-muted-foreground">View and manage your orders</p>
       </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/positions" className="block">
          <h3 className="font-medium mb-2">Positions</h3>
          <p className="text-sm text-muted-foreground">Track your current positions</p>
      </Link>
        </div>
        
        
        <div className="bg-white rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-shadow cursor-pointer">
        <Link to="/funds" className="block">
          <h3 className="font-medium mb-2">Funds</h3>
         
          <p className="text-sm text-muted-foreground">Manage your trading funds</p>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
