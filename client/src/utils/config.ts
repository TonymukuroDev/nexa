

export const storageService = {
    save: <T>(key: string, data: T): void  => {
        if(typeof data === 'string') localStorage.setItem(key, data);
        const parsedData = JSON.stringify(data)
        localStorage.setItem(key, parsedData)
    },

    retrieve: <T>(key: string, mustParse: boolean): T | null => {
        if(!mustParse) return localStorage.getItem(key) as T;

        return localStorage.getItem(key) as T;
    },

    delete: (key: string): void => {
        localStorage.removeItem(key)
    }
}