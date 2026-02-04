import type { StringArtStep } from "@/types/string-art-step";
import { createContext } from "react";

export const StringArtStepsContext = createContext<StringArtStep[]>([]);