import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShoppingBag, Users, Package, Grid, Ticket } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ setActive }) => {
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
            expanded ? <ChevronUp color="black" /> : <ChevronDown color="black" />
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

  const SubMenuItem = ({ label, onClick }) => (
    <button onClick={onClick} className="submenu-item">
      {label}
    </button>
  );

  return (
    <div className="sidebar">
      <MenuItem
        icon={ShoppingBag}
        label="Orders"
        onToggle={() => setActive("order")}
      />
      
      <MenuItem
        icon={Users}
        label="User Management"
        expanded={expandedMenus.users}
        onToggle={() => toggleMenu('users')}
      >
        <SubMenuItem label="Profile" onClick={() => setActive("profile")} />
        <SubMenuItem label="Create User" onClick={() => setActive("createUser")} />
        <SubMenuItem label="Update User" onClick={() => setActive("updateUser")} />
        <SubMenuItem label="Delete User" onClick={() => setActive("deleteUser")} />
      </MenuItem>

      <MenuItem
        icon={Package}
        label="Product Management"
        expanded={expandedMenus.products}
        onToggle={() => toggleMenu('products')}
      >
        <SubMenuItem label="Create Product" onClick={() => setActive("createProduct")} />
        <SubMenuItem label="Update Product" onClick={() => setActive("updateProduct")} />
        <SubMenuItem label="Delete Product" onClick={() => setActive("deleteProduct")} />
      </MenuItem>

      <MenuItem
        icon={Grid}
        label="Category Management"
        expanded={expandedMenus.categories}
        onToggle={() => toggleMenu('categories')}
      >
        <SubMenuItem label="Create Category" onClick={() => setActive("createCategory")} />
        <SubMenuItem label="Update Category" onClick={() => setActive("updateCategory")} />
        <SubMenuItem label="Delete Category" onClick={() => setActive("deleteCategory")} />
      </MenuItem>

      <MenuItem
        icon={Ticket}
        label="Coupon Management"
        expanded={expandedMenus.coupons}
        onToggle={() => toggleMenu('coupons')}
      >
        <SubMenuItem label="Create Coupon" onClick={() => setActive("createCoupon")} />
        <SubMenuItem label="Update Coupon" onClick={() => setActive("updateCoupon")} />
      </MenuItem>
    </div>
  );
};

export default Sidebar;
