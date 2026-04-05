import { PasswordChange } from '@/components/admin/PasswordChange';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Shield, Clock } from 'lucide-react';

export const SettingsPage = () => {
  const user = JSON.parse(localStorage.getItem('admin_user') || '{}');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and security
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription>
              Your current account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Username:</span>
              <span className="text-sm">{user.username || 'admin'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Email:</span>
              <span className="text-sm">{user.email || 'admin@beloveful.com'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Role:</span>
              <Badge variant="default" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                {user.role || 'admin'}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Member since:</span>
              <span className="text-sm flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Password Change */}
        <PasswordChange />
      </div>

      {/* Security Notice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              ⚠️ <strong>Change the default password immediately</strong> if you haven't already.
            </p>
            <p>
              🔒 Your JWT token expires after 24 hours for security.
            </p>
            <p>
              📱 Always log out when finished, especially on shared computers.
            </p>
            <p>
              🛡️ Use a strong password with at least 8 characters.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};