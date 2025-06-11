
import React from 'react';

const Apps = () => {
  const apps = [
    {
      name: 'Kite Connect',
      description: 'Trading APIs for developers',
      icon: '🔗'
    },
    {
      name: 'Coin',
      description: 'Direct mutual funds',
      icon: '💰'
    },
    {
      name: 'Console',
      description: 'Portfolio analytics',
      icon: '📊'
    },
    {
      name: 'Sentinel',
      description: 'Options strategies',
      icon: '🛡️'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Apps</h1>
        <p className="text-muted-foreground mt-2">Discover trading and investment tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <div key={app.name} className="bg-white rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-4">{app.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{app.name}</h3>
            <p className="text-muted-foreground text-sm">{app.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
