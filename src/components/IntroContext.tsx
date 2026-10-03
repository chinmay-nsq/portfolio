"use client";

import { createContext, useContext } from "react";

/** `true` once the loader has parted and the page is revealed. */
export const IntroContext = createContext(false);

export const useIntro = () => useContext(IntroContext);
