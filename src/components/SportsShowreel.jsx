import React, { useState } from 'react';
import { Play, Film } from 'lucide-react';

const clips = [
  {
    id: 'clip-1',
    title: 'Durand Cup 2025 Matchday Promo',
    duration: '1:45',
    category: 'Sports Hype',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    views: '45K+ Views',
  },
  {
    id: 'clip-2',
    title: 'Kolkata Knight Riders Fan Walk',
    duration: '0:58',
    category: 'IPL Fan Activation',
    thumbnail: 'https://images.unsplash.com/photo-1531415080290-bc9b8a3423b0?auto=format&fit=crop&w=1200&q=80',
    views: '120K+ Views',
  },
  {
    id: 'clip-3',
    title: 'CFL Official Anthem',
    duration: '2:15',
    category: 'Official Production',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    views: '88K+ Views',
  },
  {
    id: 'clip-4',
    title: 'Behala Cup Finals Opening Reel',
    duration: '1:12',
    category: 'Local Cup',
    thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
    views: '32K+ Views',
  },
];

export default function SportsShowreel() {
  const [activeClip, setActiveClip] = useState(clips[0]);
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-24 bg-[#f8f5f2] border-y border-[#e2dbd3]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-12">
          <span className="section-badge mb-3 inline-flex">Media Showreel</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#072541]">
            Sports Showreel
          </h2>
          <p className="text-[#4a5568] text-base mt-3 max-w-xl">
            High-definition, high-impact reels capturing game action, fan interactions, and brand integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Player */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#072541] shadow-xl">
              <img
                src={activeClip.thumbnail}
                alt={activeClip.title}
                className={`w-full h-full object-cover transition-all duration-700 ${playing ? 'scale-105 brightness-75' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#072541]/80 via-[#072541]/20 to-[#072541]/40 flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-display font-bold text-white tracking-wider">
                    {activeClip.category}
                  </span>
                  <span className="text-sm font-semibold text-white/80">{activeClip.views}</span>
                </div>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setPlaying(!playing)}
                    className="w-16 h-16 rounded-full bg-[#e95f0c] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xl shadow-[#e95f0c]/40 cursor-pointer"
                  >
                    {playing ? (
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-6 bg-white rounded" />
                        <span className="w-1.5 h-6 bg-white rounded" />
                      </div>
                    ) : (
                      <Play className="w-7 h-7 fill-current translate-x-0.5" />
                    )}
                  </button>
                </div>
                <div>
                  <p className="font-display font-bold text-lg text-white">{activeClip.title}</p>
                  <p className="text-sm text-white/60 font-mono mt-1">Duration: {activeClip.duration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <p className="text-sm font-display font-bold uppercase tracking-widest text-[#4a5568] border-b border-[#e2dbd3] pb-3 flex items-center gap-2">
              <Film className="w-4 h-4 text-[#e95f0c]" /> Playlist
            </p>
            {clips.map((clip) => {
              const isActive = clip.id === activeClip.id;
              return (
                <button
                  key={clip.id}
                  onClick={() => { setActiveClip(clip); setPlaying(false); }}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 cursor-pointer ${
                    isActive
                      ? 'border-[#e95f0c] bg-[#e95f0c]/5 shadow-sm'
                      : 'border-[#e2dbd3] bg-white hover:border-[#e95f0c]/50'
                  }`}
                >
                  <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0">
                    <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className={`w-4 h-4 ${isActive ? 'text-[#e95f0c] fill-current' : 'text-white'}`} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-display font-bold truncate ${isActive ? 'text-[#e95f0c]' : 'text-[#072541]'}`}>
                      {clip.title}
                    </p>
                    <p className="text-sm text-[#9ca3af] font-mono mt-0.5">{clip.duration}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
