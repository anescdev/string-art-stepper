export const INDEXED_DB_NAME = "string-art-stepper-db";
export const INDEXED_DB_VERSION = 1;
export const INDEXED_DB_STRING_ART_INFO = "string-art-info";
export const INDEXED_DB_STRING_ART_STEPS = "string-art-steps";
export const LOCAL_STORAGE_KEY_STEP = "string-art-step";

export function getDatabaseInstance(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const indexedDb = window.indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        indexedDb.addEventListener('upgradeneeded', () => {
            const db = indexedDb.result;
            db.createObjectStore(INDEXED_DB_STRING_ART_INFO, { keyPath: 'fileName' });
            db.createObjectStore(INDEXED_DB_STRING_ART_STEPS, { autoIncrement: true });
        });
        indexedDb.addEventListener('success', () => {
            resolve(indexedDb.result)
        });
        indexedDb.addEventListener('error', () => {
            reject(indexedDb.error)
        });
    });
}

export function promisifyRequest<T>(request: IDBRequest<T>): Promise<T> { 
    return new Promise((resolve, reject) => {
        request.addEventListener('success', () => {
            resolve(request.result as T)
        });
        request.addEventListener('error', () => {
            reject(request.error)
        });
    })
}