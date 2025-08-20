
export interface SavedContent {
  id: string;
  type: 'seo' | 'thumbnail';
  title: string;
  content: any;
  createdAt: string;
}

export const saveContent = (content: Omit<SavedContent, 'id' | 'createdAt'>) => {
  const id = Date.now().toString();
  const savedContent: SavedContent = {
    ...content,
    id,
    createdAt: new Date().toISOString(),
  };

  const existing = getSavedContent();
  const updated = [savedContent, ...existing].slice(0, 50); // Keep only last 50 items
  
  localStorage.setItem('vidranker_content', JSON.stringify(updated));
  return savedContent;
};

export const getSavedContent = (): SavedContent[] => {
  try {
    const saved = localStorage.getItem('vidranker_content');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading saved content:', error);
    return [];
  }
};

export const deleteContent = (id: string) => {
  const existing = getSavedContent();
  const updated = existing.filter(item => item.id !== id);
  localStorage.setItem('vidranker_content', JSON.stringify(updated));
};

export const clearAllContent = () => {
  localStorage.removeItem('vidranker_content');
};
