import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { PostPage } from './components/PostPage';
import { EssayReaderModal } from './components/EssayReaderModal';
import { MonographPlatesViewer } from './components/MonographPlatesViewer';
import { InterviewTranscriptViewer } from './components/InterviewTranscriptViewer';
import { AboutScreen } from './components/AboutScreen';
import { BlogFolioScreen } from './components/BlogFolioScreen';
import { ContactScreen } from './components/ContactScreen';
import { IndexDrawer } from './components/IndexDrawer';
import { ReaderPassportModal } from './components/ReaderPassportModal';
import { FrontPageHome } from './components/FrontPageHome';
import { LegalNoticeModal } from './components/LegalNoticeModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';

import { MONOGRAPH_ENTRIES, AUDIO_TRACKS } from './data/monographs';
import { audioEngine } from './utils/audioEngine';
import { MonographEntry, TabView, AudioTrack } from './types';

export default function App() {
  // Navigation & View State (Default to 'HOME' which displays the Front Page)
  const [activeTab, setActiveTab] = useState<TabView>('HOME');

  // Dedicated Individual Post Page State
  const [selectedPost, setSelectedPost] = useState<MonographEntry | null>(null);

  // Active Modals & Readers
  const [selectedPlatesEntry, setSelectedPlatesEntry] = useState<MonographEntry | null>(null);
  const [selectedInterview, setSelectedInterview] = useState<MonographEntry | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isLegalNoticeOpen, setIsLegalNoticeOpen] = useState(false);

  // Audio Engine State
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(AUDIO_TRACKS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [volume, setVolume] = useState(0.7);

  // Sync with audio engine subscription
  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Handle URL hash changes for direct linking to posts and tabs
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.toLowerCase().trim();
      const cleanHash = rawHash.replace(/^(#\/|#)/, '').replace(/\.(md|mdx)$/, '');

      if (cleanHash.startsWith('post/')) {
        const slug = cleanHash.replace('post/', '').trim();
        const found = MONOGRAPH_ENTRIES.find(
          (p) => p.id.toLowerCase() === slug || (p.slug && p.slug.toLowerCase() === slug)
        );
        if (found) {
          setSelectedPost(found);
          return;
        }
      }

      if (cleanHash === 'blog') {
        setSelectedPost(null);
        setActiveTab('BLOG');
      } else if (cleanHash === 'about' || cleanHash === 'pages/about') {
        setSelectedPost(null);
        setActiveTab('ABOUT');
      } else if (cleanHash === 'contact' || cleanHash === 'pages/contact') {
        setSelectedPost(null);
        setActiveTab('CONTACT');
      } else if (cleanHash === 'legal' || cleanHash === 'pages/legal') {
        setIsLegalNoticeOpen(true);
      } else if (cleanHash === '' || cleanHash === 'home') {
        setSelectedPost(null);
        setActiveTab('HOME');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleToggleAudio = (e?: React.MouseEvent, trackId?: string) => {
    if (e) e.stopPropagation();

    let targetTrack = currentTrack;
    if (trackId && trackId !== currentTrack.id) {
      const found = AUDIO_TRACKS.find((t) => t.id === trackId);
      if (found) {
        targetTrack = found;
        setCurrentTrack(found);
      }
    }

    if (isPlayingAudio && targetTrack.id === currentTrack.id) {
      audioEngine.stop();
    } else {
      audioEngine.start(targetTrack.droneFreq);
    }
  };

  const handleSelectTrack = (track: AudioTrack) => {
    setCurrentTrack(track);
    if (isPlayingAudio) {
      audioEngine.start(track.droneFreq);
    }
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    audioEngine.setVolume(vol);
  };

  // Handler when clicking a post: opens individual post page and updates URL
  const handleSelectEntry = (entry: MonographEntry) => {
    if (entry.id === 'cold-motions-brutalist' || (entry.plates && entry.plates.length > 0)) {
      setSelectedPlatesEntry(entry);
    } else if (entry.id === 'material-things-helene-voigt' || entry.interview) {
      setSelectedInterview(entry);
    } else {
      setSelectedPost(entry);
      window.location.hash = `#/post/${entry.id}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler to navigate tabs and update URL
  const handleNavigateTab = (tab: TabView) => {
    setSelectedPost(null);
    setActiveTab(tab);
    if (tab === 'HOME') {
      window.location.hash = '#/';
    } else {
      window.location.hash = `#/${tab.toLowerCase()}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. If an individual post is active, render its dedicated Individual Post Page!
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-[#131314] text-[#E5E2E3] selection:bg-[#F4F2EC] selection:text-[#111112]">
        <PostPage
          post={selectedPost}
          allPosts={MONOGRAPH_ENTRIES}
          onBack={() => {
            setSelectedPost(null);
            window.location.hash = '#/blog';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectPost={(post) => {
            setSelectedPost(post);
            window.location.hash = `#/post/${post.id}`;
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={() => handleToggleAudio(undefined, selectedPost.audioTrackId)}
        />

        {/* Audio Synthesis Bar at the bottom of the individual post page */}
        <div className="max-w-3xl mx-auto px-4 md:px-8 pb-12">
          <AudioPlayerBar
            currentTrack={currentTrack}
            allTracks={AUDIO_TRACKS}
            isPlaying={isPlayingAudio}
            onTogglePlay={() => handleToggleAudio()}
            onSelectTrack={handleSelectTrack}
            volume={volume}
            onVolumeChange={handleVolumeChange}
          />
        </div>
      </div>
    );
  }

  // 2. When activeTab === 'HOME', render the Front Page layout
  if (activeTab === 'HOME') {
    return (
      <div className="min-h-screen bg-[#121213] text-[#f5f4f0] font-sans selection:bg-[#F4F2EC] selection:text-[#111112]">
        <FrontPageHome
          onNavigateTab={handleNavigateTab}
          onOpenLegal={() => setIsLegalNoticeOpen(true)}
          onOpenContact={() => handleNavigateTab('CONTACT')}
        />

        {/* Legal Notice Modal */}
        <LegalNoticeModal
          isOpen={isLegalNoticeOpen}
          onClose={() => setIsLegalNoticeOpen(false)}
        />
      </div>
    );
  }

  // 3. When viewing BLOG, ABOUT, or CONTACT
  return (
    <div className="min-h-screen bg-[#131314] text-[#E5E2E3] flex flex-col font-sans selection:bg-[#F4F2EC] selection:text-[#111112]">
      {/* 1. Header (ISXI™ • MONOGRAPH Nº04) */}
      <Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onNavigateHome={() => handleNavigateTab('HOME')}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1 max-w-4xl mx-auto w-full pb-8">
        {activeTab === 'BLOG' && (
          <div>
            <BlogFolioScreen
              entries={MONOGRAPH_ENTRIES}
              onSelectEntry={handleSelectEntry}
            />

            {/* Audio Synthesis Bar on Blog Screen */}
            <div className="px-4 md:px-8 mt-6">
              <AudioPlayerBar
                currentTrack={currentTrack}
                allTracks={AUDIO_TRACKS}
                isPlaying={isPlayingAudio}
                onTogglePlay={() => handleToggleAudio()}
                onSelectTrack={handleSelectTrack}
                volume={volume}
                onVolumeChange={handleVolumeChange}
              />
            </div>
          </div>
        )}

        {activeTab === 'ABOUT' && <AboutScreen />}

        {activeTab === 'CONTACT' && <ContactScreen />}
      </main>

      {/* Fixed Bottom Navigation (HOME, BLOG, ABOUT, CONTACT) */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={handleNavigateTab}
      />

      {/* Slideout Navigation Index Drawer */}
      <IndexDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigateTab={(tab) => {
          handleNavigateTab(tab);
          setIsDrawerOpen(false);
        }}
        onSelectCategory={() => {
          handleNavigateTab('BLOG');
        }}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={() => handleToggleAudio()}
      />

      {/* Reader Accreditation Passport Modal */}
      <ReaderPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        onSelectEntry={handleSelectEntry}
        entries={MONOGRAPH_ENTRIES}
      />

      {/* Legal Notice Modal */}
      <LegalNoticeModal
        isOpen={isLegalNoticeOpen}
        onClose={() => setIsLegalNoticeOpen(false)}
      />

      {/* Reading Modals for Plates or Interviews if triggered */}
      {selectedPlatesEntry && (
        <MonographPlatesViewer
          entry={selectedPlatesEntry}
          onClose={() => setSelectedPlatesEntry(null)}
        />
      )}

      {selectedInterview && (
        <InterviewTranscriptViewer
          entry={selectedInterview}
          onClose={() => setSelectedInterview(null)}
        />
      )}
    </div>
  );
}
