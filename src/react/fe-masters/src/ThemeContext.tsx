import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

interface ThemeState extends Array<string | Dispatch<SetStateAction<string>>> { 0: string; 1: Dispatch<SetStateAction<string>>; }

const ThemeContext = createContext(['green', () => {}] as ThemeState)

export default ThemeContext;
