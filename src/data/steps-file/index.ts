import { clearData } from "./clear";
import { loadStringArtData } from "./load";
import { saveStringArtData } from "./save";

const loadedStringArtData = loadStringArtData();

export { clearData, saveStringArtData, loadedStringArtData }