// This is the main App component for a styled ATS dashboard with pages
import React, { useState } from 'react';
import './styles/App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Applications from './pages/Applications';
import Reports from './pages/Reports';


function App() {
  const [page, setPage] = useState('Dashboard');
  const [applications, setApplications] = useState([]);

  const handleApplicationSubmit = (newData) => {
    setApplications([...applications, newData]);
  };

  const renderPage = () => {
    switch (page) {
      case 'Dashboard':
        return <Dashboard applications={applications} />;
      case 'Jobs':
        return <Jobs />;
      case 'Applications':
        return <Applications onSubmit={handleApplicationSubmit} />;
      case 'Reports':
        return <Reports />;
      
      default:
        return <Dashboard applications={applications} />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar onSelect={setPage} />
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
