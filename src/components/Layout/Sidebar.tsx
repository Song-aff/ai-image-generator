import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Wand2, Layers, Grid3X3, Settings } from 'lucide-react';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <Terminal size={18} />,
      label: <Link to="/">Text to Image</Link>,
      className: 'font-[var(--font-mono)]',
    },
    {
      key: '/one-click-style',
      icon: <Wand2 size={18} />,
      label: <Link to="/one-click-style">Style Transfer</Link>,
      className: 'font-[var(--font-mono)]',
    },
    {
      key: '/reference-style',
      icon: <Layers size={18} />,
      label: <Link to="/reference-style">Reference Style</Link>,
      className: 'font-[var(--font-mono)]',
    },
    {
      key: '/three-views',
      icon: <Grid3X3 size={18} />,
      label: <Link to="/three-views">Three Views</Link>,
      className: 'font-[var(--font-mono)]',
    },
    {
      key: '/settings',
      icon: <Settings size={18} />,
      label: <Link to="/settings">Settings</Link>,
      className: 'font-[var(--font-mono)]',
    },
  ];

  return (
    <Sider
      width={220}
      breakpoint="lg"
      collapsedWidth="0"
      className="border-r border-[rgba(0,240,255,0.3)]"
    >
      <div className="flex justify-center py-6">
        <h2 className="font-[var(--font-retro)] text-xl m-0 glowing-text">
          {'<GeekAI/>'}
        </h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="border-none"
      />
      <div className="absolute bottom-0 left-0 w-full p-4 text-center text-xs text-[var(--color-text-secondary)]">
        <p className="font-[var(--font-mono)]">v1.0.0-alpha</p>
        <p className="font-[var(--font-mono)]">© 2025 GeekAI Labs</p>
      </div>
    </Sider>
  );
};

export default Sidebar;
