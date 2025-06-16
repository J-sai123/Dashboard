import React, { useEffect, useState } from 'react';
import { Search, TrendingUp, TrendingDown, ShoppingCart, DollarSign, BarChart3, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { watchlistStocks, marketIndices } from '@/data';
import axios from 'axios';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

interface BuyOrderForm {
  symbol: string;
  currentPrice: number;
  quantity: number;
  price: number;
}

const Layout = ({ children, currentPage, onPageChange }: LayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [buyOrderForm, setBuyOrderForm] = useState<BuyOrderForm | null>(null);

  // Helper to update buyOrderForm fields
  const updateOrderForm = (field: keyof BuyOrderForm, value: number) => {
    setBuyOrderForm((prev) =>
      prev ? { ...prev, [field]: value } : prev
    );
  };

  const filteredStocks = watchlistStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'holdings', label: 'Holdings' },
    { id: 'positions', label: 'Positions' },
    { id: 'funds', label: 'Funds' },
    { id: 'apps', label: 'Apps' }
  ];

  const handleStockAction = (action: string, symbol: string) => {
    if (action === 'buy') {
      const stock = watchlistStocks.find(s => s.symbol === symbol);
      if (stock) {
        setBuyOrderForm({
          symbol: symbol,
          currentPrice: stock.price,
          quantity: 1,
          price: stock.price
        });
      }
    } else {
      console.log(`${action} action for ${symbol}`);
      // Here you can add actual functionality for each action
    }
  };

 const handleBuyOrder = async () => {
  if (buyOrderForm) {
    try {
      const response = await axios.post(
        "http://localhost:3002/orders",
        {
          userId: "USER123",
          instrument: buyOrderForm.symbol,
          product: "MIS", // or "CNC", based on your logic
          qty: buyOrderForm.quantity,
          orderType: "BUY",
          price: buyOrderForm.price,
          status: "Pending" // or "Completed", etc.
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.status !== 201) {
        console.error("Backend Error:", response.data);
        alert(response.data.error || "An error occurred");
        return;
      }

      alert("Buy order placed successfully!");
      setBuyOrderForm(null); // close the modal
    } catch (err) {
      console.error("Network or CORS error:", err);
      alert("An error occurred while placing the order.");
    }
  }
};



  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Buy Order Modal */}
      {buyOrderForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Buy {buyOrderForm.symbol}</h3>
              <button
                onClick={() => setBuyOrderForm(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={buyOrderForm.quantity}
                  onChange={(e) => updateOrderForm('quantity', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={buyOrderForm.price}
                  onChange={(e) => updateOrderForm('price', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Current Price: ₹{buyOrderForm.currentPrice.toFixed(2)}
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between text-sm">
                  <span>Total Amount:</span>
                  <span className="font-medium">
                    ₹{(buyOrderForm.quantity * buyOrderForm.price).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleBuyOrder}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Buy
                </button>
                <button
  onClick={() => setBuyOrderForm(null)} // ✅ Just close modal
  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md font-medium transition-colors"
>
  Cancel
</button>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-border h-16 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-primary">Kite</div>
          <nav className="hidden md:flex space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  currentPage === item.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          {/* Market Indices */}
          <div className="hidden lg:flex items-center space-x-4">
            {marketIndices.map((index) => (
              <div key={index.name} className="text-sm">
                <span className="text-muted-foreground">{index.name}</span>
                <span className="ml-2 font-medium">{index.value}</span>
                <span className={cn(
                  "ml-1 text-xs",
                  index.isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {index.change}
                </span>
              </div>
            ))}
          </div>
          
          {/* User Profile */}
          <div className="text-sm">
            <span className="text-muted-foreground">USER123</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-border p-4 overflow-y-auto">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Watchlist */}
          <div className="space-y-1">
            {filteredStocks.map((stock) => (
              <div
                key={stock.symbol}
                className="group relative flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{stock.symbol}</span>
                  {stock.change > 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{stock.price}</div>
                  <div className={cn(
                    "text-xs",
                    stock.change > 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2 rounded">
                  <button
                    onClick={() => handleStockAction('buy', stock.symbol)}
                    className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                    title="Buy"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleStockAction('sell', stock.symbol)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                    title="Sell"
                  >
                    <DollarSign className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleStockAction('graph', stock.symbol)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    title="View Chart"
                  >
                    <BarChart3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleStockAction('delete', stock.symbol)}
                    className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                    title="Remove from Watchlist"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
