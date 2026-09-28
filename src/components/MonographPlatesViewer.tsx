import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Minimize2, Grid, Layers } from 'lucide-react';
import { MonographEntry, MonographPlate } from '../types';

interface MonographPlatesViewerProps {
  entry: MonographEntry;
  onClose: () => void;
}

export const MonographPlatesViewer: React.FC<MonographPlatesViewerProps> = ({
  entry,
  onClose,
}) => {
  const plates = entry.plates || [];
  const [selectedPlateIndex, setSelectedPlateIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentPlate: MonographPlate = plates[selectedPlateIndex] || {
    id: 1,
    plateNumber: 'PLATE 01 / 14',
    title: 'Western City Gate (Genex Tower)',
    location: 'Belgrade, Serbia',
    year: '1977',
    architect: 'Mihajlo Mitrović',
    materials: 'Exposed aggregate concrete',
    description: 'Two towers connected by a bridge at the 26th floor.',
    image: entry.imageUrl || ''
  };

  const handleNext = () => {
    setSelectedPlateIndex((prev) => (prev + 1) % plates.length);
  };

  const handlePrev = () => {
    setSelectedPlateIndex((prev) => (prev - 1 + plates.length) % plates.length);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-[#111112] overflow-y-auto no-scrollbar flex flex-col ${isFullscreen ? 'p-0' : ''}`}>
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-[#131314]/95 backdrop-blur-md border-b border-[#262628] px-4 md:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 font-grotesk text-xs tracking-[0.14em] uppercase text-[#C7C7BF] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ARCHIVE</span>
        </button>

        <div className="flex items-center gap-2 font-grotesk text-xs tracking-wider text-[#91918A]">
          <span className="hidden sm:inline text-[#E5E2E3]">MONOGRAPH Nº39</span>
          <span className="hidden sm:inline">·</span>
          <span>14 ARCHITECTURAL PLATES</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')}
            className={`p-2 border transition-colors ${
              viewMode === 'grid'
                ? 'border-[#F4F2EC] bg-[#201F20] text-white'
                : 'border-[#262628] text-[#91918A] hover:text-white'
            }`}
            title="Toggle between single plate and grid catalog"
          >
            {viewMode === 'single' ? <Grid className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 border border-[#262628] text-[#91918A] hover:text-white transition-colors"
            title="Toggle full screen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Monograph Title Block */}
        <div className="mb-8 border-b border-[#262628] pb-6">
          <p className="font-grotesk text-xs tracking-[0.2em] text-[#91918A] uppercase mb-1">
            FOLIO 04 · ARCHITECTURAL PLATES COLLECTION
          </p>
          <h1 className="font-serif text-2xl md:text-4xl text-[#F4F2EC] font-normal uppercase tracking-tight">
            {entry.title}
          </h1>
          <p className="font-sans text-xs md:text-sm text-[#91918A] mt-2 max-w-2xl font-light">
            {entry.description}
          </p>
        </div>

        {viewMode === 'grid' ? (
          /* Grid View of all 14 plates */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plates.map((plate, index) => (
              <div
                key={plate.id}
                onClick={() => {
                  setSelectedPlateIndex(index);
                  setViewMode('single');
                }}
                className={`border cursor-pointer transition-all p-3 bg-[#18181A] hover:border-[#F4F2EC] group ${
                  index === selectedPlateIndex ? 'border-[#F4F2EC]' : 'border-[#262628]'
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden border border-[#262628] bg-black mb-2.5">
                  <img
                    src={plate.image}
                    alt={plate.title}
                    className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-grotesk tracking-widest text-[#91918A] uppercase mb-1">
                  <span>{plate.plateNumber}</span>
                  <span className="text-[#C7C7BF]">{plate.year}</span>
                </div>
                <h3 className="font-serif text-sm text-[#F4F2EC] group-hover:text-white line-clamp-1">
                  {plate.title}
                </h3>
                <p className="text-[11px] text-[#7E7E7E] font-grotesk tracking-wider mt-0.5">
                  {plate.location}
                </p>
              </div>
            ))}
          </div>
        ) : (
          /* Single Plate Inspector */
          <div className="space-y-6">
            {/* High-Resolution Frame */}
            <div className="relative border border-[#3A3A3C] bg-black overflow-hidden group">
              <img
                src={currentPlate.image}
                alt={currentPlate.title}
                className="w-full aspect-[16/10] md:aspect-[16/9] object-cover filter grayscale contrast-115"
              />

              {/* Plate Header Overlay */}
              <div className="absolute top-4 left-4 bg-[#131314]/90 border border-[#3A3A3C] px-3 py-1 font-grotesk text-xs tracking-widest text-white uppercase">
                {currentPlate.plateNumber}
              </div>

              {/* Prev / Next controls on image */}
              <button
                onClick={handlePrev}
                aria-label="Previous plate"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-black border border-[#3A3A3C] flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next plate"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-black border border-[#3A3A3C] flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Architectural Dossier & Specs */}
            <div className="border border-[#262628] bg-[#18181A] p-5 md:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#262628] pb-4">
                <div>
                  <span className="font-grotesk text-xs tracking-[0.18em] text-[#91918A] uppercase">
                    STRUCTURE IDENTIFIER
                  </span>
                  <h2 className="font-serif text-2xl text-[#F4F2EC] uppercase mt-0.5">
                    {currentPlate.title}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-grotesk text-xs tracking-widest text-[#91918A] uppercase">
                    COORDINATES / YEAR
                  </span>
                  <p className="font-grotesk text-sm text-[#F4F2EC]">
                    {currentPlate.location} · {currentPlate.year}
                  </p>
                </div>
              </div>

              {/* Specs Definition List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-grotesk pt-1">
                <div>
                  <span className="text-[#7E7E7E] uppercase tracking-wider block mb-1">
                    PRIMARY ARCHITECT / DESIGNER
                  </span>
                  <span className="text-[#E5E2E3] font-medium">
                    {currentPlate.architect || 'Unknown Collective'}
                  </span>
                </div>
                <div>
                  <span className="text-[#7E7E7E] uppercase tracking-wider block mb-1">
                    TECTONIC MATERIALS & FINISH
                  </span>
                  <span className="text-[#E5E2E3]">
                    {currentPlate.materials}
                  </span>
                </div>
              </div>

              {/* Plate Description */}
              <div className="pt-2 border-t border-[#262628]/60">
                <p className="font-sans text-xs md:text-sm text-[#C7C7BF] leading-relaxed font-light">
                  {currentPlate.description}
                </p>
              </div>

              {/* Plate Index Thumbnails strip */}
              <div className="pt-4 border-t border-[#262628] flex items-center gap-2 overflow-x-auto no-scrollbar">
                {plates.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlateIndex(idx)}
                    className={`px-3 py-1 text-[11px] font-grotesk tracking-widest border transition-colors whitespace-nowrap ${
                      idx === selectedPlateIndex
                        ? 'border-white bg-white text-black font-semibold'
                        : 'border-[#262628] bg-[#141416] text-[#91918A] hover:text-white'
                    }`}
                  >
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
