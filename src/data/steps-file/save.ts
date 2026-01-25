import type { StringArtInfo } from "../../@types/string-art-info";
import type { StringArtStep } from "../../@types/string-art-step";
import { SavingDataError } from "../../errors/saving-data-error";
import { getDatabaseInstance, INDEXED_DB_STRING_ART_INFO, INDEXED_DB_STRING_ART_STEPS, promisifyRequest } from "./helper";

export async function saveStringArtData(info: StringArtInfo, steps: StringArtStep[]) {
    const db = await getDatabaseInstance();
    const transaction = db.transaction([INDEXED_DB_STRING_ART_INFO, INDEXED_DB_STRING_ART_STEPS], "readwrite");
    const infoStore = transaction.objectStore(INDEXED_DB_STRING_ART_INFO);
    const stepsStore = transaction.objectStore(INDEXED_DB_STRING_ART_STEPS);
    if ((await promisifyRequest(infoStore.count())) === 1) {
        await Promise.all([
            infoStore.clear(),
            stepsStore.clear()
        ])
        throw new SavingDataError();
    }
    const requests = await Promise.all([promisifyRequest(infoStore.add(info)), steps.map((step) => promisifyRequest(stepsStore.add(step)))].flat())
        .then(() => true)
        .catch(() => false)
    if (!requests) {
        transaction.abort();
        throw new SavingDataError()
    }
}