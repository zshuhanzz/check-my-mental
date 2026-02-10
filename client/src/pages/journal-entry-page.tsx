import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, ImagePlus } from 'lucide-react';
import Button from '../components/ui/button';
import apiClient from '../config/api-client';

export default function JournalEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isNew = !id || id === 'new';

  useEffect(() => {
    if (!isNew) {
      apiClient.get(`/journal/${id}`).then((r) => {
        setTitle(r.data.title || '');
        setContent(r.data.content || '');
        if (r.data.imageUrl || r.data.image_url) {
          setImagePreview(r.data.imageUrl || r.data.image_url);
        }
      }).catch(() => navigate('/journal'));
    }
  }, [id, isNew]);

  // handle image file selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // check if its an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPEG, etc.)');
      return;
    }

    setImageFile(file);

    // create preview
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async () => {
    if (!content.trim()) return;
    setSaving(true);
    try {
      // for now just save the text content
      // image upload would need a backend endpoint for file storage
      if (isNew) {
        await apiClient.post('/journal', {
          title: title || undefined,
          content,
          tags: [],
        });
      } else {
        await apiClient.put(`/journal/${id}`, {
          title: title || undefined,
          content,
        });
      }
      navigate('/journal');
    } catch {
      // ignore
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (isNew) return;
    if (!confirm('Are you sure you want to delete this entry?')) return;
    try {
      await apiClient.delete(`/journal/${id}`);
      navigate('/journal');
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/journal" className="p-2 rounded-xl text-gray-400 hover:bg-[#F5F0FF]">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-xl font-bold text-gray-900">{isNew ? 'New entry' : 'Edit entry'}</h2>
        <div className="flex-1" />
        {!isNew && (
          <Button variant="ghost" onClick={handleDelete}><Trash2 size={14} /></Button>
        )}
        <Button onClick={handleSave} loading={saving} disabled={!content.trim()}>
          <Save size={16} /> Save
        </Button>
      </div>

      <div className="space-y-4">
        {/* title */}
        <input
          placeholder="Give this entry a title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-lg font-semibold text-gray-900 bg-transparent border-none px-0 placeholder:text-gray-400 focus:outline-none"
        />

        {/* image upload section */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-dashed border-gray-300">
          {imagePreview ? (
            <div className="relative">
              <img src={imagePreview} alt="Journal image" className="max-h-64 rounded-xl object-cover" />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 px-3 py-1 bg-white/80 rounded-full text-sm text-red-500 hover:bg-white"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 mb-2">Add pictures to make today memorable.</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D2A2A] text-white rounded-full text-sm font-medium hover:bg-gray-800"
              >
                <ImagePlus size={16} /> Add Photo
              </button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        {/* write a summary */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Write a short summary of your day.</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            rows={15}
            className="w-full px-4 py-3 bg-white border border-[#D4C4F5] rounded-2xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B39DDB] resize-none text-base leading-relaxed"
          />
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        {content.split(/\s+/).filter(Boolean).length} words
      </div>
    </div>
  );
}
