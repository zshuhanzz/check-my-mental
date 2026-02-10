import { Link } from 'react-router-dom';
import { Heart, MessageCircle, BookOpen, BarChart2, Shield } from 'lucide-react';
import Button from '../components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F5F0FF, white, #F0F7FF)' }}>
      {/* crisis info */}
      <div className="bg-[#FFE4E9] text-center py-2 px-4">
        <p className="text-sm text-gray-700">
          If you're in crisis, help is available. <strong className="text-red-400">Call or text 988</strong>
        </p>
      </div>

      {/* hero section */}
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          A quiet space for your mind
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          My Mind helps you check in with yourself, talk through what's on your mind,
          and notice patterns in how you're feeling. No judgment, just support.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to="/register">
            <Button>Sign up now</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary">Sign in</Button>
          </Link>
        </div>

        {/* features list - like a product showcase */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#EDE5FF] flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#F5F0FF] flex items-center justify-center shrink-0">
                <MessageCircle size={22} className="text-[#7E57C2]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Talk to Luna</h3>
                <p className="text-sm text-gray-500">Chat with Luna, an AI companion who listens without judgment and asks the right questions.</p>
              </div>
              <span className="ml-auto px-3 py-1 bg-[#F5F0FF] text-[#7E57C2] text-xs font-medium rounded-full shrink-0">AI</span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#EDE5FF] flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#F5F0FF] flex items-center justify-center shrink-0">
                <Heart size={22} className="text-[#E57388]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Daily Check-ins</h3>
                <p className="text-sm text-gray-500">A gentle prompt to notice how you're feeling. Track your mood over time and spot patterns.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#EDE5FF] flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#F5F0FF] flex items-center justify-center shrink-0">
                <BookOpen size={22} className="text-[#7E57C2]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Journal</h3>
                <p className="text-sm text-gray-500">Write about your day, upload photos, and keep track of your thoughts in a private space.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#EDE5FF] flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#F5F0FF] flex items-center justify-center shrink-0">
                <BarChart2 size={22} className="text-[#7E57C2]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Mood Trends</h3>
                <p className="text-sm text-gray-500">See your mood patterns over time with charts and insights on your emotional health.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#EDE5FF] flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#F5F0FF] flex items-center justify-center shrink-0">
                <Shield size={22} className="text-[#66BB6A]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Private & Safe</h3>
                <p className="text-sm text-gray-500">Everything stays private. Use it anonymously, export your data, or share with your therapist.</p>
              </div>
            </div>
          </div>

          {/* sign up CTA at bottom */}
          <div className="mt-10 py-6 text-center">
            <p className="text-gray-500 mb-3">Free to use. No credit card required.</p>
            <Link to="/register">
              <Button>Sign up now</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="bg-white border-t border-[#EDE5FF] py-8 text-center">
        <p className="text-sm text-gray-400">
          My Mind is not a substitute for professional mental health care.{' '}
          <Link to="/privacy" className="text-[#7E57C2] underline">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
}
