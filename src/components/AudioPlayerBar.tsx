import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';
import { AudioTrack } from '../types';

interface AudioPlayerBarProps {
  currentTrack: AudioTrack;
  allTracks: AudioTrack[];
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectTrack: (track: AudioTrack) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentTrack,
  allTracks,
  isPlaying,
  onTogglePlay,
  onSelectTrack,
  volume,
  onVolumeChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

  const handleMuteToggle = () => {
    if (isMuted) {
      onVolumeChange(prevVolume || 0.7);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="relative z-30 mx-4 md:mx-8 mb-4 border border-[#262628] bg-[#1C1B1C] transition-all">
      {/* Expanded Track Drawer */}
      {isExpanded && (
        <div className="border-b border-[#262628] p-4 bg-[#141416] space-y-3">
          <div className="flex items-center justify-between text-[11px] font-grotesk tracking-widest text-[#91918A] uppercase">
            <span>FREQUENCY ARCHIVE // LOTURA PREVIEWS</span>
            <span className="text-[#C7C7BF]">ANALOG SYNTHESIS ENGINE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {allTracks.map((track) => (
              <button
                key={track.id}
                onClick={() => {
                  onSelectTrack(track);
                }}
                className={`p-2.5 text-left border transition-colors flex items-center justify-between ${
                  currentTrack.id === track.id
                    ? 'border-[#F4F2EC] bg-[#201F20] text-white'
                    : 'border-[#262628] bg-[#18181A] text-[#91918A] hover:border-[#3A3A3C] hover:text-[#E5E2E3]'
                }`}
              >
                <div>
                  <p className="font-grotesk text-xs tracking-wider font-medium uppercase">
                    {track.title}
                  </p>
                  <p className="text-[10px] text-[#7E7E7E]">
                    {track.droneFreq} Hz · {track.key || 'D Minor'} · {track.bitrate}
                  </p>
                </div>
                {currentTrack.id === track.id && isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-[#F4F2EC] animate-ping" />
                )}
              </button>
            ))}
          </div>

          {/* Volume Control */}
          <div className="pt-2 flex items-center justify-between border-t border-[#262628]">
            <div className="flex items-center gap-2">
              <button
                onClick={handleMuteToggle}
                className="text-[#91918A] hover:text-[#F4F2EC] transition-colors"
                aria-label="Toggle mute"
              >
                {volume === 0 || isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setIsMuted(false);
                  onVolumeChange(parseFloat(e.target.value));
                }}
                className="w-28 accent-[#F4F2EC] h-1 bg-[#262628] cursor-pointer"
              />
            </div>
            <span className="font-grotesk text-[10px] tracking-widest text-[#91918A]">
              OUTPUT: {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Main Bar exactly matching screenshot */}
      <div className="p-3 md:p-3.5 flex items-center justify-between">
        {/* Left Equalizer Icon */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-[#201F20] border border-[#262628] flex items-center justify-center gap-0.5 text-[#E5E2E3] group-hover:border-[#3A3A3C] transition-colors">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-0.5 bg-[#F4F2EC] animate-eq-1" />
                <span className="w-0.5 bg-[#F4F2EC] animate-eq-2" />
                <span className="w-0.5 bg-[#F4F2EC] animate-eq-3" />
                <span className="w-0.5 bg-[#F4F2EC] animate-eq-4" />
              </div>
            ) : (
              <div className="flex items-end gap-0.5 h-3 opacity-60">
                <span className="w-0.5 h-2 bg-[#91918A]" />
                <span className="w-0.5 h-3 bg-[#91918A]" />
                <span className="w-0.5 h-1.5 bg-[#91918A]" />
                <span className="w-0.5 h-2.5 bg-[#91918A]" />
              </div>
            )}
          </div>

          {/* Center Info Text */}
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-grotesk text-xs tracking-[0.14em] font-medium text-[#F4F2EC] uppercase">
                {currentTrack.title}
              </span>
              <span className="text-[#91918A] text-xs">
                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
              </span>
            </div>
            <p className="font-sans text-[11px] text-[#91918A] tracking-normal font-light">
              {currentTrack.subtitle}
            </p>
          </div>
        </div>

        {/* Right Play Button */}
        <button
          onClick={onTogglePlay}
          className="px-4 py-2 bg-white hover:bg-[#F4F2EC] text-[#131314] font-grotesk text-xs tracking-[0.14em] font-semibold uppercase flex items-center gap-1.5 transition-colors focus:outline-none"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 fill-[#131314]" />
              <span>PAUSE</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 stroke-[2.4] fill-none text-[#131314]" />
              <span>PLAY</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
