import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AlbumsPage } from '@/pages/admin/AlbumsPage';
import { ImagesPage } from '@/pages/admin/ImagesPage';
import { ImageUploadPage } from '@/pages/admin/ImageUploadPage';
import { SettingsPage } from '@/pages/admin/SettingsPage';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedToken = localStorage.getItem('admin_token');
    const savedUser = localStorage.getItem('admin_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      
      // Verify token is still valid
      verifyToken(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user);
        setToken(tokenToVerify);
      } else {
        // Token is invalid, clear storage
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!token || !user) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Show admin interface if authenticated
  return (
    <AdminLayout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
        
        {/* Album and Image Management Routes */}
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/new" element={<AlbumsPage />} />
        <Route path="/images" element={<ImagesPage />} />
        <Route path="/images/upload" element={<ImageUploadPage />} />
        <Route path="/slideshow" element={<div>Slideshow Management (Coming Soon)</div>} />
        <Route path="/content" element={<div>Content Management (Coming Soon)</div>} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* Catch-all redirect to dashboard */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};