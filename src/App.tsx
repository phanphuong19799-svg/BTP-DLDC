import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './components/pages/LoginPage';

// Main App Component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Nếu chưa đăng nhập, hiển thị màn login
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  // Đã đăng nhập, hiển thị hệ thống chính với khả năng logout
  return <MainLayout onLogout={() => setIsLoggedIn(false)} />;
}