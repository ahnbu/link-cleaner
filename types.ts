
export interface CleansingConfig {
  removeCitationLinks: boolean; // e.g., [blog.naver](...)
  removeFootnoteMarkers: boolean; // e.g., [1, 2]
  simplifyFormatting: boolean; // e.g., remove ⭐, excessive bolding
  preserveHeaders: boolean;
  language: 'ko' | 'en' | 'auto';
  useAI: boolean;
}

export interface ProcessingState {
  isCleansing: boolean;
  error: string | null;
  cleansedContent: string | null;
  originalContent: string | null;
  fileName: string | null;
}
