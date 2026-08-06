import React, { useState } from 'react';
import { Play, Film, Volume2, Maximize, RotateCcw, Sparkles } from 'lucide-react';

export default function SportsShowreel() {
  const clips = [
    {
      id: 'clip-1',
      title: 'Durand Cup 2025 Matchday Promo',
      duration: '1:45',
      category: 'Sports Hype',
      thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      views: '45K+ Views'
    },
    {
      id: 'clip-2',
      title: 'Kolkata Knight Riders Eden Fan Walk',
      duration: '0:58',
      category: 'IPL Fan Activation',
      thumbnail: 'https://images.unsplash.com/photo-1531415080290-bc9b8a3423b0?auto=format&fit=crop&w=1200&q=80',
      views: '120K+ Views'
    },
    {
      id: 'clip-3',
      title: 'Calcutta Football League Official Anthem',
      duration: '2:15',
      category: 'Official Production',
      thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
      views: '88K+ Views'
    },
    {
      id: 'clip-4',
      title: 'Behala Cup 2025 Finals Opening Reel',
      duration: '1:12',
      category: 'Local Turf Cup',
      thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
      views: '32K+ Views'
    }
  ];

  const [activeClip, setActiveClip] = useState(clips[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate playback progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
    }
  };

  return (
    <section className="py-24 bg-slate-dark/30 border-y border-slate-border/50 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-volt/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-electric-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-volt/20 bg-volt/5 text-volt font-display text-[10px] font-bold uppercase tracking-wider mb-3">
            Media Showreel
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Sports Showreel
          </h2>
          <p className="text-text-secondary mt-3">
            High-definition, high-impact reels capturing intense game actions, fan interactions, and brand integrations.
          </p>
        </div>

        {/* Video Player & Selection Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Cinema Player (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-slate-border shadow-2xl group">
              
              {/* Thumbnail / Video Simulation */}
              <img 
                src={activeClip.thumbnail} 
                alt={activeClip.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isPlaying ? 'scale-105 filter brightness-75' : 'scale-100 filter brightness-95'
                }`}
              />

              {/* Gradient Overlay for Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/45 flex flex-col justify-between p-6 opacity-90 transition-opacity duration-300">
                
                {/* Top Info */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full glassmorphism text-[10px] font-display font-bold text-volt tracking-wider uppercase">
                    {activeClip.category}
                  </span>
                  <div className="flex items-center gap-2 text-white/80 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span>{activeClip.views}</span>
                  </div>
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={handlePlayToggle}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-volt text-obsidian flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-2xl shadow-volt/40 z-20 group/btn"
                  >
                    {isPlaying ? (
                      <div className="flex gap-1.5 justify-center items-center">
                        <span className="w-1.5 h-6 bg-obsidian rounded animate-[pulse_0.6s_ease-in-out_infinite]" />
                        <span className="w-1.5 h-6 bg-obsidian rounded animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
                      </div>
                    ) : (
                      <Play className="w-8 h-8 fill-current translate-x-0.5" />
                    )}
                  </button>
                </div>

                {/* Bottom Controls */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-lg md:text-xl text-white">
                      {activeClip.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-white/80 text-xs">
                    {/* Play/Pause state indicator */}
                    <span className="font-mono">{isPlaying ? '0:12' : '0:00'} / {activeClip.duration}</span>
                    
                    {/* Progress Bar */}
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-volt transition-all duration-100" 
                        style={{ width: `${isPlaying ? progress : 0}%` }}
                      />
                    </div>

                    {/* Secondary Controllers */}
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-4 h-4 hover:text-volt cursor-pointer" />
                      <Maximize className="w-4 h-4 hover:text-volt cursor-pointer" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Sidebar Playlist (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-text-secondary border-b border-slate-border pb-3 flex items-center gap-2">
              <Film className="w-4 h-4 text-volt" /> Showreel Playlist
            </h4>

            <div className="flex-1 overflow-y-auto space-y-3 max-h-[360px] lg:max-h-none pr-1">
              {clips.map((clip) => {
                const isActive = clip.id === activeClip.id;
                return (
                  <button
                    key={clip.id}
                    onClick={() => {
                      setActiveClip(clip);
                      setIsPlaying(false);
                      setProgress(0);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer group ${
                      isActive 
                        ? 'bg-slate-card border-volt/30 shadow-lg' 
                        : 'bg-transparent border-slate-border/50 hover:bg-slate-card/45 hover:border-slate-border'
                    }`}
                  >
                    {/* Small thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-dark border border-slate-border/60">
                      <img 
                        src={clip.thumbnail} 
                        alt={clip.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80">
                        <Play className={`w-4 h-4 text-white ${isActive ? 'text-volt fill-current' : ''}`} />
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0">
                      <span className={`text-[9px] uppercase tracking-wider font-bold ${isActive ? 'text-volt' : 'text-text-muted'}`}>
                        {clip.category}
                      </span>
                      <p className={`font-display text-sm font-bold truncate mt-0.5 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {clip.title}
                      </p>
                      <span className="text-[10px] text-text-secondary font-mono mt-1 block">
                        Duration: {clip.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
