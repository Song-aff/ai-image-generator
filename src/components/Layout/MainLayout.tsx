import React from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Terminal } from 'lucide-react';

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  // Custom antd theme
  const antdTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#00f0ff',
      colorBgContainer: '#1e293b',
      colorBgElevated: '#0f172a',
      colorText: '#e2e8f0',
      colorBorder: 'rgba(0, 240, 255, 0.3)',
      borderRadius: 4,
    },
  };

  return (
    <ConfigProvider theme={antdTheme}>
      <div className="scanlines">
        <Layout className="min-h-screen">
          <Sidebar />
          <Layout>
            <Header className="bg-[var(--color-bg-secondary)] flex items-center px-6 border-b border-[rgba(0,240,255,0.3)]">
              <div className="flex items-center">
                <Terminal
                  size={24}
                  className="text-[var(--color-accent-blue)] mr-2"
                />
                <h1 className="text-xl font-[var(--font-retro)] m-0 glowing-text">
                  GeekAI Image Generator v1.0
                </h1>
              </div>
            </Header>
            <Content className="m-4 p-4 overflow-y-auto">
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;
