import React, { useState, useEffect } from 'react';
import { 
  Book, 
  BookOpen, 
  Bookmark, 
  Search, 
  ChevronRight, 
  Play, 
  Pause, 
  Save, 
  Info, 
  Menu, 
  X, 
  GraduationCap, 
  Library as LibraryIcon,
  Home as HomeIcon,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BIBLE_DATA, BibleVerse } from './data/bibleData';

// --- Types ---
type Page = 'home' | 'study' | 'library' | 'syntax';

interface SavedItem {
  id: string;
  type: 'word' | 'chunk';
  text: string;
  translation: string;
  verseId: string;
  book: string;
  chapter: number;
  verse: number;
}

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'syntax', label: 'Syntax Hub', icon: GraduationCap },
    { id: 'library', label: 'My Library', icon: LibraryIcon },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-deep-navy/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
            <div className="w-10 h-10 bg-deep-navy rounded-lg flex items-center justify-center text-soft-gold">
              <Book size={24} />
            </div>
            <span className="text-xl font-serif font-bold text-deep-navy hidden sm:block">NIV Syntax Study</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id as Page)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  currentPage === item.id ? 'text-soft-gold' : 'text-deep-navy/70 hover:text-deep-navy'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-deep-navy">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-deep-navy/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id as Page);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium ${
                    currentPage === item.id ? 'bg-soft-gold/10 text-soft-gold' : 'text-deep-navy/70'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => (
  <footer className="bg-deep-navy text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Book className="text-soft-gold" size={24} />
            <span className="text-xl font-serif font-bold">NIV Syntax Study</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Deepen your understanding of the Word while mastering English syntax. 
            A premium study platform for the academic and spiritual seeker.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><button onClick={() => setPage('study')} className="hover:text-soft-gold transition-colors">Bible Reader</button></li>
            <li><button onClick={() => setPage('syntax')} className="hover:text-soft-gold transition-colors">Syntax Hub</button></li>
            <li><button onClick={() => setPage('library')} className="hover:text-soft-gold transition-colors">My Library</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Study Courses</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>John: The Word & Light</li>
            <li>Proverbs: The Path of Wisdom</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/40">
        © 2026 NIV Bible Syntax & Wisdom Study Platform. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => {
  // Get Verse of the Day based on current date
  const getVerseOfTheDay = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return BIBLE_DATA[dayOfYear % BIBLE_DATA.length];
  };

  const dailyVerse = getVerseOfTheDay();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-soft-gold/5 rounded-l-full blur-3xl transform translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-deep-navy/5 rounded-full blur-3xl transform -translate-x-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-soft-gold/10 text-soft-gold text-sm font-bold tracking-wider uppercase mb-6">
                Premium Bible Study
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-deep-navy mb-8 leading-tight">
                말씀으로 시작하는 <br />
                <span className="text-soft-gold">영어 공부</span>
              </h1>
              <p className="text-xl text-deep-navy/70 mb-10 leading-relaxed max-w-2xl">
                단순한 텍스트 나열을 넘어, 성경의 깊은 지혜와 정교한 문장 구조를 동시에 탐구하세요. 
                NIV 성경을 통해 영성과 지성을 함께 성장시키는 특별한 여정을 시작합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setPage('study')}
                  className="px-8 py-4 bg-deep-navy text-white rounded-xl font-bold text-lg hover:bg-deep-navy/90 transition-all shadow-lg hover:shadow-deep-navy/20 flex items-center justify-center gap-2"
                >
                  지금 시작하기 <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => setPage('syntax')}
                  className="px-8 py-4 bg-white text-deep-navy border-2 border-deep-navy/10 rounded-xl font-bold text-lg hover:border-deep-navy/30 transition-all flex items-center justify-center gap-2"
                >
                  구문 학습법 알아보기
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Daily Meditation Section */}
      <section className="py-12 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-soft-gold/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles size={120} className="text-soft-gold" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-soft-gold rounded-full flex items-center justify-center text-white">
                  <Bookmark size={20} />
                </div>
                <h2 className="text-xl font-bold text-deep-navy uppercase tracking-widest">오늘의 묵상 말씀</h2>
                <div className="h-px flex-1 bg-soft-gold/20 ml-4"></div>
              </div>

              <div className="max-w-4xl">
                <blockquote className="bible-text text-2xl md:text-3xl italic text-deep-navy mb-8 leading-relaxed">
                  "{dailyVerse.text}"
                </blockquote>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="text-soft-gold font-serif font-bold text-lg">
                      {dailyVerse.book} {dailyVerse.chapter}:{dailyVerse.verse}
                    </div>
                    <div className="h-4 w-px bg-deep-navy/10"></div>
                    <div className="text-deep-navy/40 text-sm font-medium">NIV Version</div>
                  </div>
                  
                  <button 
                    onClick={() => setPage('study')}
                    className="flex items-center gap-2 text-deep-navy font-bold hover:text-soft-gold transition-colors group"
                  >
                    이 말씀으로 공부하기 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">선택 가능한 코스</h2>
            <div className="w-20 h-1 bg-soft-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-8 rounded-2xl border border-deep-navy/5 bg-off-white hover:border-soft-gold/30 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setPage('study')}
            >
              <div className="w-14 h-14 bg-deep-navy rounded-xl flex items-center justify-center text-soft-gold mb-6 group-hover:scale-110 transition-transform">
                <Sparkles size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">요한복음: 영성의 깊이</h3>
              <p className="text-deep-navy/60 mb-6 leading-relaxed">
                "태초에 말씀이 계셨다" - 장엄한 선포로 시작하는 요한복음을 통해 
                고급 영문법과 심오한 신학적 통찰을 함께 얻으세요.
              </p>
              <div className="flex items-center text-soft-gold font-bold gap-2">
                학습 시작 <ChevronRight size={18} />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-8 rounded-2xl border border-deep-navy/5 bg-off-white hover:border-soft-gold/30 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setPage('study')}
            >
              <div className="w-14 h-14 bg-soft-gold rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Info size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">잠언: 지혜의 길</h3>
              <p className="text-deep-navy/60 mb-6 leading-relaxed">
                삶의 실제적인 지혜를 담은 잠언의 간결하고 강력한 문장들을 통해 
                실용적인 구문 활용 능력을 극대화하세요.
              </p>
              <div className="flex items-center text-soft-gold font-bold gap-2">
                학습 시작 <ChevronRight size={18} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-deep-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">당신의 지성과 영성을 깨우는 시간</h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            지금 바로 무료로 시작하고, 매일 아침 말씀과 함께하는 영어 공부 습관을 만들어보세요.
          </p>
          <button 
            onClick={() => setPage('study')}
            className="px-10 py-5 bg-soft-gold text-deep-navy rounded-xl font-bold text-xl hover:bg-soft-gold-light transition-all shadow-xl"
          >
            말씀으로 시작하는 영어 공부, 지금 시작하기
          </button>
        </div>
      </section>
    </div>
  );
};

const StudyPage = ({ onSave }: { onSave: (item: SavedItem) => void }) => {
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse>(BIBLE_DATA[0]);
  const [activeChunkIndex, setActiveChunkIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Audio simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          const next = prev + 1;
          // Change active chunk based on progress
          const chunkCount = selectedVerse.chunks.length;
          const chunkDuration = 100 / chunkCount;
          const currentChunk = Math.floor(next / chunkDuration);
          
          if (currentChunk < chunkCount) {
            setActiveChunkIndex(currentChunk);
          } else {
            setIsPlaying(false);
            setActiveChunkIndex(null);
            return 0;
          }
          return next;
        });
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedVerse]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setAudioProgress(0);
      setActiveChunkIndex(0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Bible Reader */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl shadow-sm border border-deep-navy/5 p-8 md:p-12">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-deep-navy">
                  {selectedVerse.book} {selectedVerse.chapter}:{selectedVerse.verse}
                </h2>
                <p className="text-deep-navy/40 text-sm mt-1">New International Version (NIV)</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePlay}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isPlaying ? 'bg-soft-gold text-white' : 'bg-deep-navy text-white hover:bg-deep-navy/90'
                  }`}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                </button>
                <div className="hidden sm:block w-32 h-2 bg-deep-navy/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-soft-gold" 
                    animate={{ width: `${audioProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bible-text mb-12">
              {selectedVerse.chunks.map((chunk, idx) => (
                <React.Fragment key={idx}>
                  <motion.span
                    onClick={() => setActiveChunkIndex(idx)}
                    className={`inline-block cursor-pointer px-1 rounded transition-all ${
                      activeChunkIndex === idx ? 'chunk-active' : 'hover:bg-soft-gold/10'
                    }`}
                  >
                    {chunk.text}
                  </motion.span>
                  {idx < selectedVerse.chunks.length - 1 && (
                    <span className="text-soft-gold/40 mx-2 font-light">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {selectedVerse.vocabulary.map((vocab, idx) => (
                <button
                  key={idx}
                  onClick={() => onSave({
                    id: `${selectedVerse.id}-v-${idx}`,
                    type: 'word',
                    text: vocab.word,
                    translation: vocab.meaning,
                    verseId: selectedVerse.id,
                    book: selectedVerse.book,
                    chapter: selectedVerse.chapter,
                    verse: selectedVerse.verse
                  })}
                  className="px-4 py-2 bg-off-white border border-deep-navy/5 rounded-full text-sm font-medium hover:border-soft-gold/30 hover:bg-white transition-all flex items-center gap-2 group"
                >
                  <span className="text-deep-navy">{vocab.word}</span>
                  <span className="text-deep-navy/40 font-normal">{vocab.meaning}</span>
                  <Save size={14} className="text-soft-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BIBLE_DATA.map((verse) => (
              <button
                key={verse.id}
                onClick={() => {
                  setSelectedVerse(verse);
                  setActiveChunkIndex(null);
                  setIsPlaying(false);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedVerse.id === verse.id 
                    ? 'bg-deep-navy text-white border-deep-navy shadow-md' 
                    : 'bg-white text-deep-navy border-deep-navy/10 hover:border-soft-gold/50'
                }`}
              >
                <div className="text-xs opacity-60 mb-1">{verse.book}</div>
                <div className="font-bold">{verse.chapter}:{verse.verse}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Analysis Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <AnimatePresence mode="wait">
            {activeChunkIndex !== null ? (
              <motion.div
                key={activeChunkIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-3xl shadow-sm border border-deep-navy/5 p-6 sticky top-24"
              >
                <div className="flex items-center gap-2 text-soft-gold mb-4">
                  <Info size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Chunk Analysis</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-2 text-deep-navy">
                  {selectedVerse.chunks[activeChunkIndex].text}
                </h3>
                <p className="text-soft-gold font-bold mb-6 text-lg">
                  {selectedVerse.chunks[activeChunkIndex].translation}
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-deep-navy/40 uppercase mb-2">Grammar Note</h4>
                    <p className="text-sm text-deep-navy/70 leading-relaxed">
                      {selectedVerse.chunks[activeChunkIndex].grammar_note || "No specific grammar note for this chunk."}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => onSave({
                      id: `${selectedVerse.id}-c-${activeChunkIndex}`,
                      type: 'chunk',
                      text: selectedVerse.chunks[activeChunkIndex].text,
                      translation: selectedVerse.chunks[activeChunkIndex].translation,
                      verseId: selectedVerse.id,
                      book: selectedVerse.book,
                      chapter: selectedVerse.chapter,
                      verse: selectedVerse.verse
                    })}
                    className="w-full py-3 bg-off-white border border-deep-navy/10 rounded-xl text-sm font-bold text-deep-navy hover:bg-soft-gold/10 hover:border-soft-gold/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={16} /> 구문 저장하기
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-deep-navy/5 rounded-3xl border border-dashed border-deep-navy/10 p-8 text-center sticky top-24">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-deep-navy/20">
                  <BookOpen size={24} />
                </div>
                <p className="text-deep-navy/40 text-sm">
                  본문의 구문을 클릭하여 <br /> 상세 분석을 확인하세요.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const SyntaxHubPage = () => {
  const patterns = [
    { name: "Inversion (도치)", description: "강조를 위해 주어와 동사의 위치를 바꾸는 구조", count: 1 },
    { name: "Relative Clause (관계대명사)", description: "명사를 수식하여 문장을 확장하는 구조", count: 1 },
    { name: "Imperative (명령문)", description: "강한 권고나 명령을 나타내는 구조", count: 1 },
    { name: "Present Perfect (현재완료)", description: "과거의 일이 현재까지 영향을 미치는 시제", count: 1 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h2 className="text-4xl font-serif font-bold text-deep-navy mb-4">Syntax Study Hub</h2>
        <p className="text-deep-navy/60 max-w-2xl">
          성경에 자주 등장하는 핵심 문법 패턴을 중심으로 문장을 분류하여 학습합니다. 
          각 패턴의 구조적 특징을 이해하고 말씀의 의미를 더 깊이 파악해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {patterns.map((p, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-deep-navy/5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-soft-gold/10 rounded-lg flex items-center justify-center text-soft-gold group-hover:bg-soft-gold group-hover:text-white transition-colors">
                <GraduationCap size={20} />
              </div>
              <span className="text-xs font-bold text-deep-navy/20">{p.count} Verses</span>
            </div>
            <h3 className="font-bold text-deep-navy mb-2">{p.name}</h3>
            <p className="text-xs text-deep-navy/50 leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-serif font-bold text-deep-navy">Pattern Examples</h3>
        {BIBLE_DATA.map((verse) => (
          <div key={verse.id} className="bg-white p-8 rounded-3xl border border-deep-navy/5 shadow-sm">
            <div className="flex flex-wrap gap-2 mb-4">
              {verse.syntax_pattern?.map((p, i) => (
                <span key={i} className="px-3 py-1 bg-deep-navy text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {p}
                </span>
              ))}
            </div>
            <p className="bible-text mb-4 italic text-deep-navy/80">"{verse.text}"</p>
            <div className="flex items-center gap-2 text-sm text-deep-navy/40 font-medium">
              <Book size={14} /> {verse.book} {verse.chapter}:{verse.verse}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LibraryPage = ({ savedItems, onRemove }: { savedItems: SavedItem[], onRemove: (id: string) => void }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-serif font-bold text-deep-navy mb-4">My Library</h2>
          <p className="text-deep-navy/60">학습 중 저장한 단어와 구문들을 복습하세요.</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-serif font-bold text-soft-gold">{savedItems.length}</div>
          <div className="text-xs font-bold text-deep-navy/30 uppercase tracking-wider">Saved Items</div>
        </div>
      </div>

      {savedItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-deep-navy/10 py-20 text-center">
          <div className="w-16 h-16 bg-off-white rounded-full flex items-center justify-center mx-auto mb-6 text-deep-navy/10">
            <Bookmark size={32} />
          </div>
          <h3 className="text-xl font-serif font-bold text-deep-navy mb-2">저장된 항목이 없습니다</h3>
          <p className="text-deep-navy/40 mb-8">학습 페이지에서 단어나 구문을 저장해보세요.</p>
          <button className="px-6 py-3 bg-deep-navy text-white rounded-xl font-bold text-sm">학습하러 가기</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 rounded-2xl border border-deep-navy/5 shadow-sm hover:shadow-md transition-all relative group"
            >
              <button 
                onClick={() => onRemove(item.id)}
                className="absolute top-4 right-4 text-deep-navy/10 hover:text-red-500 transition-colors"
              >
                <X size={18} />
              </button>
              
              <div className="mb-4">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  item.type === 'word' ? 'bg-soft-gold/10 text-soft-gold' : 'bg-deep-navy/10 text-deep-navy'
                }`}>
                  {item.type}
                </span>
              </div>
              
              <h3 className="text-xl font-serif font-bold text-deep-navy mb-1">{item.text}</h3>
              <p className="text-soft-gold font-bold mb-4">{item.translation}</p>
              
              <div className="pt-4 border-t border-deep-navy/5 flex items-center justify-between text-[10px] font-bold text-deep-navy/30 uppercase tracking-widest">
                <span>{item.book} {item.chapter}:{item.verse}</span>
                <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [showToast, setShowToast] = useState(false);

  // Load saved items
  useEffect(() => {
    const saved = localStorage.getItem('bible-study-saved');
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }
  }, []);

  const saveItem = (item: SavedItem) => {
    if (savedItems.find(i => i.id === item.id)) return;
    
    const newItems = [item, ...savedItems];
    setSavedItems(newItems);
    localStorage.setItem('bible-study-saved', JSON.stringify(newItems));
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const removeItem = (id: string) => {
    const newItems = savedItems.filter(i => i.id !== id);
    setSavedItems(newItems);
    localStorage.setItem('bible-study-saved', JSON.stringify(newItems));
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-soft-gold/30">
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {page === 'home' && <HomePage setPage={setPage} />}
            {page === 'study' && <StudyPage onSave={saveItem} />}
            {page === 'syntax' && <SyntaxHubPage />}
            {page === 'library' && <LibraryPage savedItems={savedItems} onRemove={removeItem} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-deep-navy text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-soft-gold/30"
          >
            <div className="w-6 h-6 bg-soft-gold rounded-full flex items-center justify-center text-deep-navy">
              <Save size={14} />
            </div>
            <span className="text-sm font-bold">라이브러리에 저장되었습니다</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
