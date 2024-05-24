export const localStorageWrapper = {
  getItem: (key: string): Promise<string | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = localStorage.getItem(key);
        resolve(item);
      }, 500); 
    });
  },
  setItem: (key: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(key, value);
        resolve();
      }, 500); 
    });
  },
  removeItem: (key: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem(key);
        resolve();
      }, 500); 
    });
  },
};
