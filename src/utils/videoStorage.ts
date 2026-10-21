import { PortfolioProject } from '../types';

const DB_NAME = 'PortfolioVideoDB';
const DB_VERSION = 1;
const STORE_NAME = 'custom_videos';

interface StoredVideoRecord {
  id: string;
  project: PortfolioProject;
  blob?: Blob;
  posterDataUrl: string;
  createdAt: number;
}

// Track active Object URLs to revoke when replaced
const activeObjectUrls: string[] = [];

/**
 * Open or upgrade the IndexedDB instance for local video persistence
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB.'));
    };
  });
}

/**
 * Format seconds to MM:SS or HH:MM:SS
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format bytes to readable string (e.g. "14.2 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

/**
 * Determine resolution label from width and height
 */
export function getResolutionLabel(width: number, height: number): string {
  const isVertical = height > width;
  const ratioTag = isVertical ? '9:16 Vertical' : '16:9 Landscape';

  if (width >= 3840 || height >= 3840) {
    return `4K UHD · ${ratioTag}`;
  }
  if (width >= 2560 || height >= 2560) {
    return `2.5K QHD · ${ratioTag}`;
  }
  if (width >= 1920 || height >= 1920) {
    return `1080p FHD · ${ratioTag}`;
  }
  if (width >= 1280 || height >= 1280) {
    return `720p HD · ${ratioTag}`;
  }
  return `${width}x${height} · ${ratioTag}`;
}

/**
 * Extract duration, resolution, dimensions and a snapshot poster frame from an original video file
 */
export function extractVideoMetadata(file: File): Promise<{
  durationStr: string;
  durationSec: number;
  resolution: string;
  posterDataUrl: string;
  width: number;
  height: number;
  objectUrl: string;
}> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    activeObjectUrls.push(objectUrl);

    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.src = objectUrl;

    const timeoutId = setTimeout(() => {
      // Fallback in case metadata extraction stalls
      resolve({
        durationStr: '00:30',
        durationSec: 30,
        resolution: '1080p FHD · 16:9',
        posterDataUrl: '',
        width: 1920,
        height: 1080,
        objectUrl
      });
    }, 6000);

    video.onloadedmetadata = () => {
      const durationSec = video.duration || 0;
      const durationStr = formatDuration(durationSec);
      const width = video.videoWidth || 1920;
      const height = video.videoHeight || 1080;
      const resolution = getResolutionLabel(width, height);

      // Seek to capture a nice thumbnail (at 0.8s or 15% mark)
      const seekTarget = Math.min(1.0, Math.max(0.2, durationSec * 0.15));
      video.currentTime = seekTarget;
    };

    video.onseeked = () => {
      clearTimeout(timeoutId);
      try {
        const canvas = document.createElement('canvas');
        const width = video.videoWidth || 1280;
        const height = video.videoHeight || 720;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, width, height);
          const posterDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve({
            durationStr: formatDuration(video.duration),
            durationSec: video.duration || 0,
            resolution: getResolutionLabel(width, height),
            posterDataUrl,
            width,
            height,
            objectUrl
          });
        } else {
          resolve({
            durationStr: formatDuration(video.duration),
            durationSec: video.duration || 0,
            resolution: getResolutionLabel(width, height),
            posterDataUrl: '',
            width,
            height,
            objectUrl
          });
        }
      } catch (err) {
        console.warn('Could not extract video canvas frame:', err);
        resolve({
          durationStr: formatDuration(video.duration),
          durationSec: video.duration || 0,
          resolution: getResolutionLabel(video.videoWidth || 1920, video.videoHeight || 1080),
          posterDataUrl: '',
          width: video.videoWidth || 1920,
          height: video.videoHeight || 1080,
          objectUrl
        });
      }
    };

    video.onerror = (e) => {
      clearTimeout(timeoutId);
      console.warn('Video failed to load for metadata extraction:', e);
      resolve({
        durationStr: '00:30',
        durationSec: 30,
        resolution: '1080p FHD',
        posterDataUrl: '',
        width: 1920,
        height: 1080,
        objectUrl
      });
    };
  });
}

/**
 * Capture frame from an active video element
 */
export function captureFrameFromVideo(video: HTMLVideoElement): string {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.88);
  } catch (err) {
    console.warn('Failed to capture frame from video:', err);
    return '';
  }
}

/**
 * Save a custom video project and its original video file blob to IndexedDB
 */
export async function saveCustomVideoProject(
  project: PortfolioProject,
  videoBlob?: Blob,
  posterDataUrl?: string
): Promise<PortfolioProject> {
  try {
    const db = await openDB();
    const record: StoredVideoRecord = {
      id: project.id,
      project: {
        ...project,
        isCustom: true,
        createdAt: project.createdAt || Date.now()
      },
      blob: videoBlob,
      posterDataUrl: posterDataUrl || project.image,
      createdAt: Date.now()
    };

    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.put(record);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    return record.project;
  } catch (err) {
    console.error('Failed to save video to IndexedDB:', err);
    // Return project as-is even if IndexedDB fails
    return project;
  }
}

/**
 * Retrieve all custom projects from IndexedDB, reconstructing live ObjectURLs for playback
 */
export async function getCustomProjects(): Promise<PortfolioProject[]> {
  try {
    const db = await openDB();
    const records = await new Promise<StoredVideoRecord[]>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => resolve(req.result as StoredVideoRecord[]);
      req.onerror = () => reject(req.error);
    });

    return records.map((record) => {
      let liveVideoUrl = record.project.videoUrl;

      // If we have the original blob stored, create a fresh live object URL
      if (record.blob) {
        liveVideoUrl = URL.createObjectURL(record.blob);
        activeObjectUrls.push(liveVideoUrl);
      }

      return {
        ...record.project,
        videoUrl: liveVideoUrl,
        image: record.posterDataUrl || record.project.image,
        isCustom: true
      };
    });
  } catch (err) {
    console.warn('Failed to read custom projects from IndexedDB:', err);
    return [];
  }
}

/**
 * Delete a custom video project by ID
 */
export async function deleteCustomProject(id: string): Promise<boolean> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.delete(id);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    return true;
  } catch (err) {
    console.error('Failed to delete custom project:', err);
    return false;
  }
}

/**
 * Clean up active object URLs
 */
export function cleanupActiveObjectUrls(): void {
  while (activeObjectUrls.length > 0) {
    const url = activeObjectUrls.pop();
    if (url) {
      try {
        URL.revokeObjectURL(url);
      } catch {
        // ignore
      }
    }
  }
}
