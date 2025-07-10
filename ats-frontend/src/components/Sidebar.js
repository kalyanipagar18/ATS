import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onSelect }) => {
  return (
    <aside className="sidebar">
      <h2>ATS Dashboard</h2>
      <nav>
        <ul>
          <li onClick={() => onSelect('Dashboard')}>Dashboard</li>
          <li onClick={() => onSelect('Jobs')}>Jobs</li>
          <li onClick={() => onSelect('Applications')}>Applications</li>
          <li onClick={() => onSelect('Reports')}>Reports</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
