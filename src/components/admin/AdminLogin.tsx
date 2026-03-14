import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Logo } from '@/components/Logo';
import { Loader2, Eye, EyeOff, FileText, Image, ShieldCheck } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (token: string, user: any) => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.success && data.token) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        onLogin(data.token, data.user);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(''); // Clear error when user starts typing
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section
          className="relative hidden overflow-hidden lg:flex"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(17, 24, 39, 0.72), rgba(120, 53, 15, 0.52)), url('/TonyMenias-3.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_32%)]" />
          <div className="relative flex h-full w-full flex-col justify-between p-12">
            <div className="max-w-xs">
              <Logo variant="white" className="mb-6 block max-w-[220px]" />
              <p className="text-sm uppercase tracking-[0.3em] text-stone-200/80">Admin Access</p>
            </div>

            <div className="max-w-xl space-y-8">
              <div className="space-y-4">
                <h1 className="font-serif text-5xl leading-tight text-white">
                  Manage the site without leaving the Beloveful visual language.
                </h1>
                <p className="max-w-lg text-base leading-7 text-stone-200/90">
                  Upload new photography, update homepage slides, and maintain the text blocks that
                  drive the public pages from one branded control room.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <Image className="mb-3 h-5 w-5 text-stone-50" />
                  <p className="text-sm font-medium text-white">Image Uploads</p>
                  <p className="mt-1 text-sm text-stone-200/80">Add and remove album images quickly.</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <FileText className="mb-3 h-5 w-5 text-stone-50" />
                  <p className="text-sm font-medium text-white">Content Blocks</p>
                  <p className="mt-1 text-sm text-stone-200/80">Mirror site copy structure inside admin.</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <ShieldCheck className="mb-3 h-5 w-5 text-stone-50" />
                  <p className="text-sm font-medium text-white">Protected Access</p>
                  <p className="mt-1 text-sm text-stone-200/80">Authenticated management for the live site.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-[linear-gradient(180deg,#f7f3eb,#efe5d3)] px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:hidden">
              <div className="mx-auto mb-4 flex justify-center">
                <Logo variant="black" className="block max-w-[220px]" />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Admin Access</p>
            </div>

            <div className="hidden text-center lg:block">
              <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Beloveful Control Room</p>
            </div>

            <Card className="w-full border-stone-200/80 bg-white/90 shadow-2xl shadow-stone-900/10">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl text-stone-900">Sign In</CardTitle>
                <CardDescription className="text-stone-600">
                  Access the admin dashboard to manage images, slideshow content, and page blocks.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter your username"
                      disabled={loading}
                      className="border-stone-300 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        disabled={loading}
                        className="border-stone-300 bg-white pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-stone-900 text-stone-50 hover:bg-stone-800"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};
