import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#7E57C2] mb-8">
        <ArrowLeft size={16} /> Back
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy & Your Data</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Your data is yours</h2>
          <p>
            Everything you share on My Mind — your mood entries, journal entries, and conversations —
            belongs to you. You can export or delete it at any time.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">What we store</h2>
          <p>
            We store your account information, mood entries, journal entries, and conversation history.
            Conversation content is processed through Google's Gemini AI to generate responses.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Anonymous mode</h2>
          <p>
            You can use My Mind without providing an email address. In anonymous mode, your session
            is tied to a recovery token.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Crisis detection</h2>
          <p>
            My Mind monitors conversations for signs of crisis to help keep you safe. When concerning
            language is detected, we display crisis resources. We do not contact anyone on your behalf.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Not a replacement for professional help</h2>
          <p>
            My Mind is a wellness tool, not a medical service. If you're struggling, please reach out
            to a licensed therapist or counselor.
          </p>
        </section>
      </div>
    </div>
  );
}
