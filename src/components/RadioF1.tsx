import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipForward, SkipBack, 
  Radio, Minimize2, Signal, Activity
} from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const getYTThumb = (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;

const PLAYLIST = [
  { id: "WWEs82u37Mw", title: "Lose My Mind", artist: "Don Toliver" },
  { id: "lYkVZpTjuOs", title: "Just Keep Watching", artist: "Tate McRae" },
  { id: "4TYv2PhG89A", title: "Smooth Operator", artist: "Sade" },
  { id: "8AYy-BcjRXg", title: "F1 Official Theme", artist: "Brian Tyler" },
  { id: "ChxX3tR4mD0", title: "The Chain", artist: "Fleetwood Mac" },
  { id: "h8P-d0RV2Mk", title: "One Kiss (Monaco Mix)", artist: "Dua Lipa" },
  { id: "p13Cn0mONP8", title: "Bad As I Used To Be", artist: "Chris Stapleton" },
  { id: "oP4sBeV7llE", title: "Like a Tattoo", artist: "Sade" },
  { id: "DeumyOzKqgI", title: "Skyfall", artist: "Adele" }
];

export default function RadioF1() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [telemetry, setTelemetry] = useState({ hz: 44100, kbps: 320 });
  const [isStaticPlaying, setIsStaticPlaying] = useState(false);

  const playerRef = useRef<any>(null);
  const staticAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    staticAudioRef.current = new Audio('https://www.soundjay.com/communication/radio-static-05.mp3');
    staticAudioRef.current.volume = 0.2;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => initPlayer();
    } else {
      initPlayer();
    }

    const interval = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        const current = playerRef.current.getCurrentTime();
        const total = playerRef.current.getDuration();
        if (total > 0) setProgress((current / total) * 100);
      }
      if (isPlaying) {
        setTelemetry({
          hz: 44100 + Math.floor(Math.random() * 50),
          kbps: 320 + Math.floor(Math.random() * 5)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [trackIndex]);

  const initPlayer = () => {
    if (playerRef.current) {
        try { playerRef.current.destroy(); } catch (e) {}
    }

    playerRef.current = new window.YT.Player('youtube-player-hidden', {
      height: '0', width: '0',
      videoId: PLAYLIST[trackIndex].id,
      playerVars: { 
        autoplay: isPlaying ? 1 : 0, 
        controls: 0,
        modestbranding: 1,
        rel: 0,
        origin: window.location.origin 
      },
      events: {
        onReady: (event: any) => {
          if (isPlaying) event.target.playVideo();
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.ENDED) handleNext();
        }
      }
    });
  };

  const playStaticEffect = () => {
    if (staticAudioRef.current) {
      setIsStaticPlaying(true);
      staticAudioRef.current.currentTime = 0;
      staticAudioRef.current.play().catch(() => {});
      setTimeout(() => setIsStaticPlaying(false), 800);
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    playStaticEffect();
    setTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handlePrev = () => {
    playStaticEffect();
    setTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!playerRef.current) return;
    const duration = playerRef.current.getDuration();
    if (duration) {
      const seekTo = (parseFloat(e.target.value) / 100) * duration;
      playerRef.current.seekTo(seekTo, true);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      <div id="youtube-player-hidden" className="hidden" />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }}
            className="w-80 bg-[#0a0a0a] border-2 border-white/10 shadow-[20px_20px_40px_rgba(0,0,0,0.5)] p-6 relative overflow-hidden"
          >
            {isStaticPlaying && (
              <div className="absolute inset-0 z-50 bg-white/5 backdrop-blur-[2px] pointer-events-none animate-pulse" />
            )}

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF001D] via-white/20 to-[#FF001D]" />
            
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Radio size={14} className="text-[#FF001D] animate-pulse" />
                    <span className="font-['Orbitron'] text-[9px] text-white tracking-[0.3em] uppercase">Team Radio</span>
                </div>
                <div className="flex items-center gap-2">
                    <Signal size={12} className={isStaticPlaying ? "text-red-500" : "text-green-500"} />
                    <span className="font-mono text-[8px] text-gray-500 uppercase font-bold tracking-widest">
                      {isStaticPlaying ? "Interference" : "Active"}
                    </span>
                </div>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="w-16 h-16 relative overflow-hidden flex-shrink-0">
                    <img 
                      src={getYTThumb(PLAYLIST[trackIndex].id)} 
                      className={`w-full h-full object-cover rounded-full transition-all duration-500 ${isPlaying && !isStaticPlaying ? 'animate-[spin_8s_linear_infinite]' : 'grayscale'}`} 
                      alt="Album" 
                    />
                    <div className="absolute inset-0 border-[4px] border-black/20 rounded-full pointer-events-none" />
                </div>
                <div className="overflow-hidden flex flex-col justify-center">
                    <h3 className={`font-['Orbitron'] text-xs font-black text-white uppercase truncate ${isStaticPlaying ? 'blur-[1px]' : ''}`}>
                      {PLAYLIST[trackIndex].title}
                    </h3>
                    <p className="font-mono text-[10px] text-gray-400 uppercase tracking-tighter truncate">
                      {PLAYLIST[trackIndex].artist}
                    </p>
                </div>
            </div>

            <div className="flex items-end justify-between h-6 gap-1 mb-4 opacity-50 px-1">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className={`w-full bg-[#FF001D] transition-all duration-150 ${isPlaying || isStaticPlaying ? 'animate-visualizer' : 'h-[2px]'}`} style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
            </div>

            <input type="range" value={progress || 0} onChange={handleSeek} className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-[#FF001D] mb-6" />

            <div className="flex justify-center items-center gap-8 mb-6">
                <button onClick={handlePrev} className="text-white hover:text-[#FF001D] transition-colors"><SkipBack size={20} fill="currentColor" /></button>
                <button onClick={togglePlay} className="w-14 h-14 bg-[#FF001D] text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={handleNext} className="text-white hover:text-[#FF001D] transition-colors"><SkipForward size={20} fill="currentColor" /></button>
            </div>

            <div className="flex justify-between items-center border-t border-white/5 pt-4 font-mono text-[8px] text-gray-500 uppercase">
                <div className="flex gap-3">
                  <span>{isStaticPlaying ? "---" : telemetry.kbps} kbps</span>
                  <span>{isStaticPlaying ? "00.0" : telemetry.hz} Hz</span>
                </div>
                <Activity size={10} className={`text-[#FF001D] ${isPlaying ? 'animate-pulse' : ''}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setIsOpen(!isOpen)} className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-300 shadow-xl relative cursor-pointer ${isOpen ? 'bg-white border-white text-black' : 'bg-[#0a0a0a] border-white/10 text-white hover:border-[#FF001D] hover:bg-white hover:text-black'}`}>
         {isOpen ? <Minimize2 size={24} /> : <Radio size={24} />}
         {!isOpen && isPlaying && <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF001D] rounded-full animate-ping" />}
      </button>

      <style>{`
        @keyframes visualizer { 0%, 100% { height: 2px; } 50% { height: 100%; } }
        .animate-visualizer { animation: visualizer 0.6s ease-in-out infinite alternate; }
      `}</style>
    </div>
  );
}