import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import Button from '../components/ui/button';
import Input from '../components/ui/input';

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password should be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, displayName);
      navigate('/onboarding');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
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
          <p className="text-gray-500 mt-2">Create your account</p>
        </div>

        <div className="bg-white/70 border border-[#EDE5FF] rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="What should we call you?" type="text" placeholder="Your name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
            <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Input label="Confirm password" type="password" placeholder="Type it again" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            {error && <p className="text-sm text-red-400 bg-red-50 px-4 py-2 rounded-xl">{error}</p>}

            <Button type="submit" loading={loading} className="w-full">Create account</Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/login" className="text-[#7E57C2] font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
