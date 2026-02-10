import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import Button from '../components/ui/button';
import Input from '../components/ui/input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginAnonymous } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymous = async () => {
    setLoading(true);
    try {
      await loginAnonymous();
      navigate('/onboarding');
    } catch {
      setError('Could not create anonymous session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom, #F5F0FF, white)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-2xl font-bold" style={{ color: '#7E57C2' }}>My Mind</h1>
          </Link>
          <p className="text-gray-500 mt-2">Welcome back</p>
        </div>

        <div className="bg-white/70 border border-[#EDE5FF] rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            {error && <p className="text-sm text-red-400 bg-red-50 px-4 py-2 rounded-xl">{error}</p>}

            <Button type="submit" loading={loading} className="w-full">Sign in</Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#EDE5FF]" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-[#EDE5FF]" />
          </div>

          <Button variant="ghost" onClick={handleAnonymous} disabled={loading} className="w-full">
            Continue anonymously
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          New here? <Link to="/register" className="text-[#7E57C2] font-medium">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
