import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Heart, Search } from 'lucide-react';
import Button from '../components/ui/button';
import Card from '../components/ui/card';
import apiClient from '../config/api-client';

export default function JournalPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    apiClient.get(`/journal${params}`)
      .then((r) => setEntries(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search]);

  const toggleFavorite = async (id: string) => {
    try {
      await apiClient.patch(`/journal/${id}/favorite`);
      setEntries(entries.map((e) => e.id === id ? { ...e, isFavorite: !e.isFavorite, is_favorite: !e.is_favorite } : e));
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Journal</h2>
          <p className="text-gray-500 mt-1">Your thoughts, your space.</p>
        </div>
        <Link to="/journal/new">
          <Button><Plus size={16} /> New entry</Button>
        </Link>
      </div>

      {/* search bar */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search entries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D4C4F5] rounded-xl text-gray-700 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#B39DDB]"
        />
      </div>

      {entries.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[#F5F0FF] flex items-center justify-center mb-6">
            <BookOpen className="text-[#7E57C2]" size={28} />
          </div>
          <p className="text-gray-500 max-w-sm">
            {search ? 'No entries match your search.' : "No journal entries yet. Start writing whenever you're ready."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry: any) => {
            const title = entry.title;
            const content = entry.content;
            const isFav = entry.isFavorite ?? entry.is_favorite;
            const date = entry.createdAt || entry.created_at;
            const wordCount = entry.wordCount ?? entry.word_count ?? 0;
            const tags = entry.tags || [];
            const imageUrl = entry.imageUrl || entry.image_url;

            return (
              <Link key={entry.id} to={`/journal/${entry.id}`}>
                <Card>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate">{title || 'Untitled'}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{content}</p>
                      {imageUrl && (
                        <div className="mt-2">
                          <img src={imageUrl} alt="" className="w-20 h-20 object-cover rounded-xl" />
                        </div>
                      )}
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs text-gray-400">
                          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-xs text-gray-400">{wordCount} words</span>
                        {tags.length > 0 && (
                          <div className="flex gap-1">
                            {tags.slice(0, 3).map((tag: string) => (
                              <span key={tag} className="px-2 py-0.5 bg-[#F5F0FF] text-[#7E57C2] text-xs rounded-full">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); toggleFavorite(entry.id); }}
                      className="p-2 rounded-full hover:bg-[#F5F0FF] shrink-0"
                    >
                      <Heart size={16} className={isFav ? 'fill-red-400 text-red-400' : 'text-gray-300'} />
                    </button>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
