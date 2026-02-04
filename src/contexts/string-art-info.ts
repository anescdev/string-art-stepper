import type { StringArtInfo } from "@/types/string-art-info";
import { createContext } from "react";

type StringArtInfoContextType = StringArtInfo | null;
export const StringArtInfoContext = createContext<StringArtInfoContextType>(null);