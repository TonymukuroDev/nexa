

export const storageService = {
    save: <T>(key: string, data: T): void  => {
        if(typeof data === 'string') localStorage.setItem(key, data);
        const parsedData = JSON.stringify(data)
        localStorage.setItem(key, parsedData)
    },

    retrieve: <T>(key: string): T | null => {
        
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as T : null;
    },

    delete: (key: string): void => {
        localStorage.removeItem(key)
    }
}