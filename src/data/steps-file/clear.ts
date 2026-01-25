import { ClearingDataError } from "../../errors/clearing-data-error";
import { getDatabaseInstance, INDEXED_DB_STRING_ART_INFO, INDEXED_DB_STRING_ART_STEPS, promisifyRequest } from "./helper";

export async function clearData(): Promise<void> {
    const db = await getDatabaseInstance();
    const deleteDataTransaction = db.transaction([INDEXED_DB_STRING_ART_INFO, INDEXED_DB_STRING_ART_STEPS], "readwrite");
    try {
        await Promise.all([
            promisifyRequest(deleteDataTransaction.objectStore(INDEXED_DB_STRING_ART_INFO).clear()),
            promisifyRequest(deleteDataTransaction.objectStore(INDEXED_DB_STRING_ART_STEPS).clear())
        ])
    } catch {
        throw new ClearingDataError();
    }

}