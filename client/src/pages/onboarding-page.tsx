import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/ui/button';

const steps = [
  {
    title: 'Welcome to My Mind',
    description: "This is your space to check in with yourself, talk through what's on your mind, and track how you're feeling. No pressure, no judgment.",
    emoji: '🌿',
  },
  {
    title: 'Quick check-ins',
    description: "We'll gently remind you to check in each day. Rate how you're feeling and pick the emotions that resonate. Over time, you'll start to see patterns.",
    emoji: '📊',
  },
  {
    title: 'Talk to Luna',
    description: "Luna is an AI companion who listens. You can talk about what's bothering you, process difficult feelings, or just vent. Luna isn't a therapist, but a supportive presence.",
    emoji: '🌙',
  },
  {
    title: "You're all set",
    description: "Everything here is private. You're in control of your data. Ready to start your first check-in?",
    emoji: '✨',
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom, #F5F0FF, white)' }}>
      <div className="max-w-md w-full text-center">
        {/* progress dots */}
        <div className="flex justify-center gap-2 mb-10">
          {steps.map((_, i) => (
            <div key={i} className={`w-8 h-1.5 rounded-full ${i <= step ? 'bg-[#7E57C2]' : 'bg-[#EDE5FF]'}`} />
          ))}
        </div>

        <div className="text-6xl mb-6">{steps[step].emoji}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{steps[step].title}</h2>
        <p className="text-gray-500 leading-relaxed mb-10">{steps[step].description}</p>

        {step < steps.length - 1 ? (
          <Button onClick={() => setStep(step + 1)}>Continue <ArrowRight size={16} /></Button>
        ) : (
          <Button onClick={() => navigate('/check-in')}>Start my first check-in</Button>
        )}
      </div>
    </div>
  );
}
