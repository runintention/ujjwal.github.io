import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Film, 
  Camera, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  FileVideo, 
  Layers, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { PortfolioProject } from '../types';
import { 
  extractVideoMetadata, 
  captureFrameFromVideo, 
  formatFileSize, 
  saveCustomVideoProject 
} from '../utils/videoStorage';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoAdded: (newProject: PortfolioProject) => void;
}

const SAMPLE_VIDEOS = [
  {
    name: 'Short-Form Athletic Hook (Sample)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    category: 'paid-ads' as const,
    client: 'Kinetic Studio',
    title: 'High-Velocity Athletic Reel',
    tagline: 'Engineered for sub-second thumb stopping and 80%+ hook retention.',
    description: '120fps speed ramps, punchy sub-bass impacts, and localized captions designed for Instagram Reels & TikTok.'
  },
  {
    name: 'Cinematic Brand Teaser (Sample)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'brand-films' as const,
    client: 'Luminary House',
    title: 'Precision Brand Manifesto',
    tagline: 'Award-winning luxury commercial with bespoke orchestral sound design.',
    description: 'Macro cinematography, delicate sound foley, and rich Kodak film grain emulation.'
  }
];

export const AddVideoModal: React.FC<AddVideoModalProps> = ({
  isOpen,
  onClose,
  onVideoAdded
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'sample'>('upload');
  
  // File state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields - Only Title and Description
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Technical specs
  const [durationStr, setDurationStr] = useState('00:30');
  const [resolution, setResolution] = useState('1080p FHD · 16:9 Landscape');
  const [posterDataUrl, setPosterDataUrl] = useState('');
  const [previewVideoUrl, setPreviewVideoUrl] = useState('');
  const [fileSizeBytes, setFileSizeBytes] = useState(0);

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  // Clean filename to human title
  const cleanFileNameToTitle = (filename: string): string => {
    const withoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
    return withoutExt
      .replace(/[_-]+/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim();
  };

  // Process incoming original video file
  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      setErrorMessage('Please select a valid video file (.mp4, .mov, .webm, etc.)');
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    setFileSizeBytes(file.size);
    setIsProcessing(true);

    try {
      const metadata = await extractVideoMetadata(file);
      setPreviewVideoUrl(metadata.objectUrl);
      setPosterDataUrl(metadata.posterDataUrl);
      setDurationStr(metadata.durationStr);
      setResolution(metadata.resolution);

      // Auto-set title from file name if empty
      const generatedTitle = cleanFileNameToTitle(file.name);
      setTitle((prev) => (prev ? prev : generatedTitle));
    } catch (err) {
      console.error('Failed to process video file:', err);
      setErrorMessage('Could not process video file. You can still proceed with manual details.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Re-capture poster thumbnail from current preview video frame
  const handleCaptureCurrentFrame = () => {
    if (previewVideoRef.current) {
      const newFrame = captureFrameFromVideo(previewVideoRef.current);
      if (newFrame) {
        setPosterDataUrl(newFrame);
      }
    }
  };

  // Load a demo sample video
  const handleLoadSample = (sample: typeof SAMPLE_VIDEOS[0]) => {
    setSelectedFile(null);
    setPreviewVideoUrl(sample.url);
    setTitle(sample.title);
    setDescription(sample.description);
    setDurationStr('00:32');
    setResolution('1080p FHD · 16:9 Landscape');
    setPosterDataUrl('/src/assets/images/portfolio_hero_showreel_1792097289174.jpg');
    setFileSizeBytes(8 * 1024 * 1024);
  };

  // Reset form
  const handleResetForm = () => {
    setSelectedFile(null);
    setPreviewVideoUrl('');
    setPosterDataUrl('');
    setTitle('');
    setDescription('');
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle Save to Portfolio
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Please enter a project title.');
      return;
    }
    if (!previewVideoUrl) {
      setErrorMessage('Please provide a video file or select a sample.');
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const isVertical = resolution.toLowerCase().includes('vertical') || resolution.includes('9:16');
      const newId = `custom-${Date.now()}`;
      const newProject: PortfolioProject = {
        id: newId,
        title: title.trim(),
        client: 'Original Production',
        category: isVertical ? 'paid-ads' : 'brand-films',
        duration: durationStr || '00:30',
        resolution: resolution || '1080p FHD',
        viewsMetric: '',
        retentionMetric: '',
        tagline: '',
        description: description.trim(),
        image: posterDataUrl || '/src/assets/images/portfolio_hero_showreel_1792097289174.jpg',
        videoUrl: previewVideoUrl,
        editorNotes: {
          hookStrategy: '',
          pacingBPM: '',
          soundLayers: '',
          colorProfile: ''
        },
        keyTimestamps: [],
        isCustom: true,
        fileName: selectedFile ? selectedFile.name : 'Original File',
        fileSize: fileSizeBytes > 0 ? formatFileSize(fileSizeBytes) : undefined,
        createdAt: Date.now()
      };

      // Save to IndexedDB
      await saveCustomVideoProject(newProject, selectedFile || undefined, posterDataUrl);

      // Notify parent component
      onVideoAdded(newProject);
      handleResetForm();
      onClose();
    } catch (err) {
      console.error('Failed to save project:', err);
      setErrorMessage('Failed to save video to portfolio. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div 
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-700/80 rounded-[2rem] shadow-2xl overflow-hidden z-10 my-auto text-neutral-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between shrink-0 bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight uppercase heading-serif">
                Add Video To Portfolio
              </h3>
              <p className="text-xs text-neutral-400 font-medium">
                Upload your original video file (.mp4, .mov, .webm)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Mode Tabs */}
          <div className="flex items-center gap-2 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Original File</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sample')}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'sample'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Use Sample Clip</span>
            </button>
          </div>

          {/* Upload Dropzone Tab */}
          {activeTab === 'upload' && (
            <div>
              {!previewVideoUrl ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                    isDragOver
                      ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
                      : 'border-neutral-700 hover:border-emerald-500/50 hover:bg-neutral-800/40 bg-neutral-950/40'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*,.mp4,.mov,.webm,.m4v,.mkv"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center text-emerald-400 shadow-inner">
                    <Upload className="w-7 h-7" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white mb-1">
                      Drop your original video file here, or{' '}
                      <span className="text-emerald-400 underline">browse files</span>
                    </p>
                    <p className="text-xs text-neutral-400">
                      Supports MP4, MOV, WebM, M4V (High-definition, 4K, 1080p, 9:16 vertical or 16:9)
                    </p>
                  </div>

                  {isProcessing && (
                    <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-emerald-400 animate-pulse">
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Reading file, extracting dimensions & generating thumbnail...</span>
                    </div>
                  )}
                </div>
              ) : (
                /* Video Preview Card */
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
                    <div className="flex items-center gap-2">
                      <FileVideo className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-neutral-200 truncate max-w-[200px] sm:max-w-xs">
                        {selectedFile ? selectedFile.name : 'Loaded Video'}
                      </span>
                      {fileSizeBytes > 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono">
                          {formatFileSize(fileSizeBytes)}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleResetForm();
                      }}
                      className="text-xs text-neutral-400 hover:text-red-400 font-bold transition-colors cursor-pointer"
                    >
                      Change File
                    </button>
                  </div>

                  {/* Video Player */}
                  <div className={`relative rounded-xl overflow-hidden bg-black flex items-center justify-center border border-neutral-800 ${
                    resolution.toLowerCase().includes('vertical') || resolution.includes('9:16')
                      ? 'aspect-[9/16] max-h-[380px] max-w-[240px] mx-auto'
                      : 'aspect-video w-full'
                  }`}>
                    <video
                      ref={previewVideoRef}
                      src={previewVideoUrl}
                      controls
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Technical Meta & Capture Frame */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800 text-[11px] font-mono text-emerald-300">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        {durationStr}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800 text-[11px] font-mono text-neutral-300">
                        <Layers className="w-3 h-3 text-emerald-400" />
                        {resolution}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCaptureCurrentFrame}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-200 transition-colors cursor-pointer border border-neutral-700"
                      title="Seek the video to any second, then click this to set it as the cover poster thumbnail"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Set Current Frame as Poster</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sample Video Tab */}
          {activeTab === 'sample' && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-400">
                Want to test adding to the portfolio immediately? Choose one of our high-velocity sample edits:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {SAMPLE_VIDEOS.map((sample, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleLoadSample(sample)}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-900 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {sample.title}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {sample.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {sample.tagline}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Details Fields - Only Title and Description */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Apex V2 Velocity Hook"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter video description..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving || !previewVideoUrl || !title.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white btn-emerald-gradient hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              {isSaving ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving Video...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Add To Portfolio</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
