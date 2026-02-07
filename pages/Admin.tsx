import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { ItemData } from '../types';
import { Link } from 'react-router-dom';
import { Save, ArrowLeft, Unlock, RefreshCcw, Pencil, Lock } from 'lucide-react';

export const Admin: React.FC = () => {
  const { items, updateItem, resetToDefaults } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2255') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-oasis-sand">
        <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/50">
          <div className="flex justify-center mb-8 text-oasis-blue">
            <div className="p-4 bg-oasis-blue/5 rounded-full">
              <Unlock size={40} strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-3xl font-serif font-bold text-center text-oasis-blue mb-3">Admin Access</h2>
          <p className="text-center text-oasis-blueLight mb-8 text-sm opacity-80">Enter security pin to manage text content</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PIN (2255)"
                className="w-full p-4 rounded-xl bg-white/80 border border-oasis-blue/10 focus:border-oasis-gold focus:ring-4 focus:ring-oasis-gold/10 outline-none transition-all text-center text-2xl tracking-widest text-oasis-blue placeholder:text-sm placeholder:tracking-normal placeholder:text-oasis-blue/30"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">{error}</p>}
            <button
              type="submit"
              className="w-full bg-oasis-blue text-oasis-sand py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-oasis-blueLight hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shadow-md"
            >
              Unlock Dashboard
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <Link to="/" className="text-xs font-bold text-oasis-blue/40 hover:text-oasis-blue uppercase tracking-widest transition-colors">
              ← Return to Public View
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-oasis-sandLight">
      <header className="bg-oasis-blue text-oasis-sand py-6 sticky top-0 z-40 shadow-xl ring-1 ring-white/10">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-serif font-bold tracking-wide">Admin Dashboard</h1>
          </div>
          <button 
            onClick={resetToDefaults}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-oasis-sand hover:bg-white/20 transition-all text-xs font-bold uppercase tracking-wider border border-white/5"
            title="Reset all content to original defaults"
          >
            <RefreshCcw size={14} />
            Reset Text to Defaults
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 max-w-5xl py-12 space-y-8">
        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl text-oasis-blue text-sm text-center">
            <strong>Note:</strong> Images are now static and managed via the server file system. You can only edit the text below.
        </div>
        {items.map((item) => (
          <AdminItemRow key={item.id} item={item} updateItem={updateItem} />
        ))}
      </main>
    </div>
  );
};

interface AdminItemRowProps {
  item: ItemData;
  updateItem: (id: string, data: Partial<ItemData>) => void;
}

// Sub-component for individual item editing
const AdminItemRow: React.FC<AdminItemRowProps> = ({ 
  item, 
  updateItem 
}) => {
  const [name, setName] = useState(item.name);
  const [desc, setDesc] = useState(item.description);
  const [isDirty, setIsDirty] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Sync state if external item data changes (e.g. Reset)
  useEffect(() => {
    setName(item.name);
    setDesc(item.description);
    setIsDirty(false);
    setStatus('idle');
  }, [item]);

  const handleSave = () => {
    setStatus('saving');
    // Simulate network delay for UX
    setTimeout(() => {
      updateItem(item.id, { name, description: desc });
      setIsDirty(false);
      setStatus('saved');
      
      // Reset saved status after a moment
      setTimeout(() => setStatus('idle'), 2000);
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-oasis-blue/5 flex flex-col gap-8 transition-shadow hover:shadow-md">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Read-Only Image Section */}
        <div className="w-full md:w-1/3 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-inner group ring-1 ring-black/5">
                <img src={item.image} alt={name} className="w-full h-full object-cover grayscale-[0.2]" />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Lock className="text-white mb-2" size={24} />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Static Asset</span>
                </div>
            </div>
            <div className="text-center">
                <p className="text-[10px] font-mono text-oasis-blue/40 truncate">{item.image}</p>
            </div>
        </div>

        {/* Text Editor Section */}
        <div className="w-full md:w-2/3 flex flex-col">
            <div className="mb-6 relative group">
                <label className="text-[10px] font-bold uppercase tracking-widest text-oasis-blue/30 mb-1 block">Event Title</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setIsDirty(true);
                        setStatus('idle');
                    }}
                    className="w-full text-3xl font-serif font-bold text-oasis-blue bg-transparent border-b-2 border-transparent hover:border-oasis-blue/10 focus:border-oasis-gold focus:outline-none transition-all placeholder:text-oasis-blue/20 py-2"
                  />
                  <Pencil size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-oasis-blue/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
            </div>
            
            <div className="flex-grow space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-oasis-blue/30 block">Description</label>
                <textarea
                value={desc}
                onChange={(e) => {
                    setDesc(e.target.value);
                    setIsDirty(true);
                    setStatus('idle');
                }}
                className="w-full h-40 p-5 rounded-2xl bg-oasis-sand/20 border border-transparent focus:bg-white focus:border-oasis-gold focus:ring-4 focus:ring-oasis-gold/10 outline-none transition-all text-oasis-blueLight text-lg resize-none leading-relaxed placeholder:text-oasis-blue/20"
                placeholder="Enter a detailed description..."
                />
            </div>
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="flex justify-end items-center gap-4 pt-4 border-t border-oasis-blue/5">
           {status === 'saved' && (
               <span className="text-green-600 text-sm font-bold tracking-wide animate-pulse mr-2">Text Updated</span>
           )}
           <button
            onClick={handleSave}
            disabled={!isDirty && status !== 'saving'}
            className={`
                flex items-center gap-2 px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-md
                ${isDirty 
                    ? 'bg-oasis-blue text-white hover:bg-oasis-blueLight hover:shadow-xl hover:-translate-y-0.5 active:scale-95' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'}
            `}
           >
            <Save size={18} />
            {status === 'saving' ? 'Saving...' : 'Save Changes'}
           </button>
        </div>
    </div>
  );
};