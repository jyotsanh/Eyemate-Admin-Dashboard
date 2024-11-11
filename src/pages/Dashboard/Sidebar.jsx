import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShoppingBag, Users, Package, Grid, Ticket } from 'lucide-react';
import './Sidebar.css';


const Sidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState({
    users: false,
    products: false,
    categories: false,
    coupons: false
  });

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const MenuItem = ({ icon: Icon, label, expanded, onToggle, children }) => {
    return (
      <div className="menu-item">
        <button 
          onClick={onToggle}
          className="menu-button"
        >
          <div className="menu-button-content">
            <Icon />
            <span>{label}</span>
          </div>
          {children && (
            expanded ? <ChevronUp /> : <ChevronDown />
          )}
        </button>
        
        {expanded && children && (
          <div className="submenu">
            {children}
          </div>
        )}
      </div>
    );
  };

  const SubMenuItem = ({ label }) => (
    <a href="#" className="submenu-item">
      {label}
    </a>
  );

  return (
    <div className="sidebar">
      <MenuItem
        icon={ShoppingBag}
        label="Orders"
      />
      
      <MenuItem
        icon={Users}
        label="User Management"
        expanded={expandedMenus.users}
        onToggle={() => toggleMenu('users')}
      >
        <SubMenuItem label="Profile" />
        <SubMenuItem label="Create User" />
        <SubMenuItem label="Update User" />
        <SubMenuItem label="Delete" />
      </MenuItem>

      <MenuItem
        icon={Package}
        label="Product Management"
        expanded={expandedMenus.products}
        onToggle={() => toggleMenu('products')}
      >
        <SubMenuItem label="Create Product" />
        <SubMenuItem label="Update Product" />
        <SubMenuItem label="Delete Product" />
      </MenuItem>

      <MenuItem
        icon={Grid}
        label="Category Management"
        expanded={expandedMenus.categories}
        onToggle={() => toggleMenu('categories')}
      >
        <SubMenuItem label="Create Category" />
        <SubMenuItem label="Update Category" />
        <SubMenuItem label="Delete Category" />
      </MenuItem>

      <MenuItem
        icon={Ticket}
        label="Coupon Management"
        expanded={expandedMenus.coupons}
        onToggle={() => toggleMenu('coupons')}
      >
        <SubMenuItem label="Create Coupon" />
        <SubMenuItem label="Update Coupon" />
      </MenuItem>
    </div>
  );
};

export default Sidebar;