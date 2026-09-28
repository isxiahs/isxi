import React, { useState } from 'react';
import { Send, CheckCircle2, MapPin, Mail, Radio } from 'lucide-react';
import { loadAllPages } from '../utils/contentLoader';

export const ContactScreen: React.FC = () => {
  const pages = loadAllPages();
  const contact = pages['contact'];
  const fm = contact?.frontmatter || {};

  const categories: string[] = Array.isArray(fm.categories) && fm.categories.length > 0
    ? fm.categories
    : ['ESSAY SUBMISSION', 'ARCHITECTURAL PLATES', 'AUDIO FIELD RECORDING', 'PRINT STOCKIST INQUIRY'];

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: categories[0] || 'ESSAY SUBMISSION',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="px-4 md:px-8 py-8 md:py-16 max-w-3xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-[#262628] pb-6">
        <p className="font-grotesk text-xs tracking-[0.2em] text-[#91918A] uppercase mb-1">
          {fm.subtitle || 'FREQUENCY TRANSMISSION & SUBMISSIONS'}
        </p>
        <h1 className="font-serif text-3xl md:text-5xl text-[#F4F2EC] uppercase font-normal tracking-tight mb-2">
          {fm.title || 'CONTACT & DISPATCHES'}
        </h1>
        <p className="font-sans text-sm text-[#91918A] leading-relaxed font-light">
          {fm.description || 'We invite inquiries regarding archival acquisitions, critical essays on brutalism, and field acoustic research.'}
        </p>
      </div>

      {/* Form Container */}
      <div className="border border-[#262628] bg-[#18181A] p-6 md:p-8">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <CheckCircle2 className="w-10 h-10 text-white mx-auto stroke-[1.5]" />
            <h2 className="font-serif text-2xl text-[#F4F2EC] uppercase">
              TRANSMISSION RECEIVED
            </h2>
            <p className="font-sans text-xs md:text-sm text-[#91918A] max-w-md mx-auto leading-relaxed">
              Your inquiry has been logged in the archival dispatch queue with reference code <span className="font-mono text-[#F4F2EC]">TX-2025.04-{Math.floor(1000 + Math.random() * 9000)}</span>. Our editorial board reviews submissions on a fortnightly cadence.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', category: 'ESSAY SUBMISSION', message: '' });
              }}
              className="mt-4 px-4 py-2 border border-[#3A3A3C] hover:border-white text-xs font-grotesk tracking-widest uppercase text-[#F4F2EC] transition-colors"
            >
              SEND ANOTHER TRANSMISSION
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-grotesk tracking-[0.16em] uppercase text-[#91918A] mb-2 font-medium">
                  NAME / INSTITUTION
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-[#131314] border border-[#262628] focus:border-[#F4F2EC] px-3.5 py-2.5 text-xs text-[#F4F2EC] placeholder-[#555] font-grotesk tracking-wide outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-grotesk tracking-[0.16em] uppercase text-[#91918A] mb-2 font-medium">
                  COORDINATES (EMAIL)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.org"
                  className="w-full bg-[#131314] border border-[#262628] focus:border-[#F4F2EC] px-3.5 py-2.5 text-xs text-[#F4F2EC] placeholder-[#555] font-grotesk tracking-wide outline-none transition-colors"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-grotesk tracking-[0.16em] uppercase text-[#91918A] mb-2 font-medium">
                TRANSMISSION CLASSIFICATION
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'ESSAY SUBMISSION',
                  'ARCHITECTURAL PLATES',
                  'AUDIO FIELD RECORDING',
                  'PRINT STOCKIST INQUIRY',
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`p-2.5 text-left border text-xs font-grotesk tracking-wider uppercase transition-colors ${
                      formData.category === cat
                        ? 'border-white bg-[#201F20] text-white font-semibold'
                        : 'border-[#262628] bg-[#131314] text-[#91918A] hover:border-[#3A3A3C]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[11px] font-grotesk tracking-[0.16em] uppercase text-[#91918A] mb-2 font-medium">
                DISPATCH PROPOSAL / INQUIRY
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Include abstract, structural coordinates, plate count, or acoustic documentation..."
                className="w-full bg-[#131314] border border-[#262628] focus:border-[#F4F2EC] p-3 text-xs text-[#F4F2EC] placeholder-[#555] font-grotesk tracking-wide outline-none transition-colors"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-between">
              <span className="font-grotesk text-[10px] tracking-widest text-[#7E7E7E] uppercase">
                ENCRYPTED DISPATCH // IMPRINT 04
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 bg-white hover:bg-[#F4F2EC] text-[#131314] text-xs font-grotesk tracking-[0.16em] font-semibold uppercase flex items-center gap-2 transition-colors focus:outline-none"
              >
                <span>SEND TRANSMISSION</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Postal Points & Direct Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-grotesk">
        <div className="border border-[#262628] p-5 bg-[#141416] space-y-2">
          <div className="flex items-center gap-2 text-[#F4F2EC] uppercase font-semibold">
            <Mail className="w-4 h-4 text-[#C7C7BF]" />
            <span>ARCHIVAL FREQUENCY</span>
          </div>
          <p className="text-[#91918A]">{fm.email || 'dispatches@nocturnemonograph.org'}</p>
          <p className="text-[10px] text-[#7E7E7E]">PGP Key ID: {fm.pgpKey || '0x7E4A81B099'}</p>
        </div>

        <div className="border border-[#262628] p-5 bg-[#141416] space-y-2">
          <div className="flex items-center gap-2 text-[#F4F2EC] uppercase font-semibold">
            <Radio className="w-4 h-4 text-[#C7C7BF]" />
            <span>SHORTWAVE PREVIEWS</span>
          </div>
          <p className="text-[#91918A]">Stream: {fm.shortwaveStream || '128 kbps Continuous Loop'}</p>
          <p className="text-[10px] text-[#7E7E7E]">Frequency: {fm.shortwaveFrequency || 'Lotura 04 Sub-band'}</p>
        </div>
      </div>
    </div>
  );
};
