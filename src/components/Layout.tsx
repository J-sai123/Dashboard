
import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout = ({ children, currentPage, onPageChange }: LayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const marketIndices = [
    { name: 'NIFTY 50', value: '19,674.25', change: '+0.82%', isPositive: true },
    { name: 'SENSEX', value: '66,589.93', change: '+0.91%', isPositive: true }
  ];

  const watchlistStocks = [
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
                className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer transition-colors"
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
