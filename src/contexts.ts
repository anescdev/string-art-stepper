import { createContext } from "react";
import type { StringArtInfo } from "./@types/string-art-info";
import type { StringArtStep } from "./@types/string-art-step";

type StringArtInfoContextType = StringArtInfo | null;
export const StringArtInfoContext = createContext<StringArtInfoContextType>(null);
export const StringArtStepsContext = createContext<StringArtStep[]>([]);