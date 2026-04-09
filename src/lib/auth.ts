/**
 * Secure authentication utilities for managing admin sessions
 * 
 * This module provides secure methods for storing and retrieving authentication tokens
 * that are resistant to XSS attacks.
 */

// Check if a user is authenticated by attempting to validate the token with the backend
export async function isAuthenticated(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' // Include cookies in the request
    });
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
}

// Attempt to log in with username and password
export async function login(username: string, password: string): Promise<{ success: boolean; error?: string; token?: string }> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include' // Include cookies in the request
    });
    
    const data = await response.json();
    
    if (data.success) {
      // The token is now stored in an HTTP-only cookie, so we don't need to store it in localStorage
      return { success: true, token: data.token };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('Login failed:', error);
    return { success: false, error: 'Network error occurred' };
  }
}

// Log out by clearing the session
export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' // Include cookies in the request
    });
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    // Clear any locally stored data as a backup
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }
}

// Get the current user info
export async function getCurrentUser() {
  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' // Include cookies in the request
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.user;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Getting user info failed:', error);
    return null;
  }
}