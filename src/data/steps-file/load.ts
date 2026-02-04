import type { StringArtInfo } from "@/types/string-art-info";
import type { StringArtStep } from "@/types/string-art-step";

import { getDatabaseInstance, INDEXED_DB_STRING_ART_INFO, INDEXED_DB_STRING_ART_STEPS, promisifyRequest } from "./helper";

export async function loadStringArtData(): Promise<{ info: StringArtInfo, steps: StringArtStep[] } | null> {
    const db = await getDatabaseInstance();
    const transaction = db.transaction([INDEXED_DB_STRING_ART_INFO, INDEXED_DB_STRING_ART_STEPS], "readonly");
    const infoStore = transaction.objectStore(INDEXED_DB_STRING_ART_INFO);
    const stepsStore = transaction.objectStore(INDEXED_DB_STRING_ART_STEPS);
    const infoRequest = promisifyRequest<StringArtInfo[]>(infoStore.getAll());
    const stepsRequest = promisifyRequest<StringArtStep[]>(stepsStore.getAll());
    const fileResult = await Promise.all([infoRequest, stepsRequest]);
    const [infoResults, stepsResults] = fileResult;
    transaction.abort();
    if (infoResults.length === 0 || stepsResults.length === 0) {
        if (fileResult.map(r => r.length).some(count => count === 1)) {
            const cleanupTransaction = db.transaction([INDEXED_DB_STRING_ART_INFO, INDEXED_DB_STRING_ART_STEPS], "readwrite");
            cleanupTransaction.objectStore(INDEXED_DB_STRING_ART_INFO).clear();
            cleanupTransaction.objectStore(INDEXED_DB_STRING_ART_STEPS).clear();
        }
        return null
    }
    return {
        info: infoResults[0],
        steps: stepsResults
    }
    
}