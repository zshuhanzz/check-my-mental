import { Link } from 'react-router-dom';
import Button from '../components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <p className="text-6xl mb-4">🌫️</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-500 mb-8">Let's get you back somewhere familiar.</p>
        <Link to="/dashboard"><Button>Go to Dashboard</Button></Link>
      </div>
    </div>
  );
}
