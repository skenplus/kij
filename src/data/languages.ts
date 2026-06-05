// Système de gestion des langues multilingues extensible

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  family: string;
  speakers: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'very_hard';
  writingSystems: string[];
  levels: string[];
  contentCompleteness: {
    vocabulary: number;
    grammar: number;
    culture: number;
    exercises: number;
  };
  officialSources: Array<{
    name: string;
    url: string;
    type: 'official' | 'educational' | 'media';
  }>;
}

export interface VocabularyCard {
  id: string;
  word: {
    original: string;
    romanization: string;
    ipa?: string;
  };
  meaning: string;
  level: string;
  category: string;
  etymology: {
    origin: string;
    evolution: string;
    cognates?: string[];
  };
  examples: Array<{
    original: string;
    romanization: string;
    english: string;
    level: 'beginner' | 'intermediate' | 'advanced';
  }>;
  mnemonics: {
    visual: string;
    auditory: string;
    kinesthetic: string;
    logical: string;
    narrative: string;
  };
  culturalNotes: string;
  translations: Array<{
    language: string;
    family: string;
    translation: string;
  }>;
}

export interface GrammarLesson {
  id: string;
  title: string;
  level: string;
  pattern: string;
  meaning: string;
  explanation: string;
  examples: Array<{
    original: string;
    romanization: string;
    english: string;
  }>;
  usage: string;
  notes: string;
}

export interface Exercise {
  id: string;
  type: 'listening' | 'speaking' | 'reading' | 'writing' | 'translation';
  level: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  audioUrl?: string;
}

export interface CultureTopic {
  id: string;
  title: string;
  content: string;
  relatedVocabulary: string[];
  images?: string[];
  traditions?: string[];
}

export const languages: Language[] = [
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    family: 'Japono-ryukyuan',
    speakers: 125000000,
    difficulty: 'very_hard',
    writingSystems: ['hiragana', 'katakana', 'kanji'],
    levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
    contentCompleteness: {
      vocabulary: 100,
      grammar: 100,
      culture: 100,
      exercises: 100,
    },
    officialSources: [
      {
        name: 'NHK World-Japan',
        url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/',
        type: 'official',
      },
      {
        name: 'Japan Foundation - Marugoto',
        url: 'https://marugoto.jpf.go.jp/en/',
        type: 'official',
      },
      {
        name: 'JLPT',
        url: 'https://www.jlpt.jp/',
        type: 'official',
      },
    ],
  },
  {
    code: 'zh',
    name: 'Mandarin Chinese',
    nativeName: '中文',
    family: 'Sino-Tibetan',
    speakers: 1400000000,
    difficulty: 'very_hard',
    writingSystems: ['simplified_characters', 'traditional_characters'],
    levels: ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6'],
    contentCompleteness: {
      vocabulary: 0,
      grammar: 0,
      culture: 0,
      exercises: 0,
    },
    officialSources: [
      {
        name: 'HSK Official',
        url: 'https://www.chinesetest.cn/',
        type: 'official',
      },
      {
        name: 'CCTV Learn Chinese',
        url: 'https://www.cctv.com/',
        type: 'educational',
      },
    ],
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    family: 'Indo-European (Romance)',
    speakers: 500000000,
    difficulty: 'easy',
    writingSystems: ['latin_alphabet'],
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    contentCompleteness: {
      vocabulary: 0,
      grammar: 0,
      culture: 0,
      exercises: 0,
    },
    officialSources: [
      {
        name: 'Instituto Cervantes',
        url: 'https://www.cervantes.es/',
        type: 'official',
      },
      {
        name: 'Real Academia Española (RAE)',
        url: 'https://www.rae.es/',
        type: 'official',
      },
    ],
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    family: 'Indo-European (Indo-Aryan)',
    speakers: 340000000,
    difficulty: 'hard',
    writingSystems: ['devanagari'],
    levels: ['Novice', 'Intermediate', 'Advanced', 'Superior'],
    contentCompleteness: {
      vocabulary: 0,
      grammar: 0,
      culture: 0,
      exercises: 0,
    },
    officialSources: [
      {
        name: 'Central Institute of Hindi (CIIL)',
        url: 'https://www.ciil.org/',
        type: 'official',
      },
    ],
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    family: 'Afro-Asiatic',
    speakers: 300000000,
    difficulty: 'very_hard',
    writingSystems: ['arabic_script'],
    levels: ['Novice', 'Intermediate', 'Advanced', 'Superior'],
    contentCompleteness: {
      vocabulary: 0,
      grammar: 0,
      culture: 0,
      exercises: 0,
    },
    officialSources: [
      {
        name: 'Arabic Language Academy (Cairo)',
        url: 'https://www.arabicacademy.org.eg/',
        type: 'official',
      },
    ],
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    family: 'Indo-European (Romance)',
    speakers: 250000000,
    difficulty: 'easy',
    writingSystems: ['latin_alphabet'],
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    contentCompleteness: {
      vocabulary: 0,
      grammar: 0,
      culture: 0,
      exercises: 0,
    },
    officialSources: [
      {
        name: 'Instituto Camões',
        url: 'https://www.camoes.pt/',
        type: 'official',
      },
    ],
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    family: 'Indo-European (Slavic)',
    speakers: 250000000,
    difficulty: 'hard',
    writingSystems: ['cyrillic_alphabet'],
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    contentCompleteness: {
      vocabulary: 0,
      grammar: 0,
      culture: 0,
      exercises: 0,
    },
    officialSources: [
      {
        name: 'Pushkin State Russian Language Institute',
        url: 'https://www.pushkin.institute/',
        type: 'official',
      },
    ],
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    family: 'Indo-European (Romance)',
    speakers: 280000000,
    difficulty: 'medium',
    writingSystems: ['latin_alphabet'],
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    contentCompleteness: {
      vocabulary: 0,
      grammar: 0,
      culture: 0,
      exercises: 0,
    },
    officialSources: [
      {
        name: 'Institut français',
        url: 'https://www.institutfrancais.com/',
        type: 'official',
      },
    ],
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    family: 'Indo-European (Germanic)',
    speakers: 130000000,
    difficulty: 'medium',
    writingSystems: ['latin_alphabet'],
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    contentCompleteness: {
      vocabulary: 0,
      grammar: 0,
      culture: 0,
      exercises: 0,
    },
    officialSources: [
      {
        name: 'Goethe-Institut',
        url: 'https://www.goethe.de/',
        type: 'official',
      },
      {
        name: 'Deutsche Welle (DW)',
        url: 'https://www.dw.com/',
        type: 'educational',
      },
    ],
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    family: 'Korean (isolate)',
    speakers: 80000000,
    difficulty: 'hard',
    writingSystems: ['hangul'],
    levels: ['TOPIK1', 'TOPIK2', 'TOPIK3', 'TOPIK4', 'TOPIK5', 'TOPIK6'],
    contentCompleteness: {
      vocabulary: 0,
      grammar: 0,
      culture: 0,
      exercises: 0,
    },
    officialSources: [
      {
        name: 'National Institute of Korean Language',
        url: 'https://www.korean.go.kr/',
        type: 'official',
      },
      {
        name: 'KBS World',
        url: 'https://world.kbs.co.kr/',
        type: 'educational',
      },
    ],
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    family: 'Indo-European (Germanic)',
    speakers: 1500000000,
    difficulty: 'easy',
    writingSystems: ['latin_alphabet'],
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    contentCompleteness: {
      vocabulary: 100,
      grammar: 100,
      culture: 100,
      exercises: 100,
    },
    officialSources: [
      {
        name: 'BBC Learning English',
        url: 'https://www.bbc.co.uk/learning/english/',
        type: 'educational',
      },
      {
        name: 'Cambridge English',
        url: 'https://www.cambridgeenglish.org/',
        type: 'official',
      },
      {
        name: 'British Council',
        url: 'https://www.britishcouncil.org/',
        type: 'official',
      },
    ],
  },
];

export function getLanguage(code: string): Language | undefined {
  return languages.find((lang) => lang.code === code);
}

export function getLanguagesWithContent(): Language[] {
  return languages.filter((lang) => {
    const total =
      lang.contentCompleteness.vocabulary +
      lang.contentCompleteness.grammar +
      lang.contentCompleteness.culture +
      lang.contentCompleteness.exercises;
    return total > 0;
  });
}

export function getLanguagesByDifficulty(
  difficulty: 'easy' | 'medium' | 'hard' | 'very_hard'
): Language[] {
  return languages.filter((lang) => lang.difficulty === difficulty);
}

export function getLanguagesByPopularity(): Language[] {
  return [...languages].sort((a, b) => b.speakers - a.speakers);
}

export function getContentCompleteness(language: Language): number {
  const total =
    language.contentCompleteness.vocabulary +
    language.contentCompleteness.grammar +
    language.contentCompleteness.culture +
    language.contentCompleteness.exercises;
  return Math.round(total / 4);
}

export interface LevelMapping {
  [language: string]: {
    system: string;
    levels: string[];
    order: number[];
  };
}

export const levelMappings: LevelMapping = {
  ja: { system: 'JLPT', levels: ['N5', 'N4', 'N3', 'N2', 'N1'], order: [0, 1, 2, 3, 4] },
  zh: { system: 'HSK', levels: ['1', '2', '3', '4', '5', '6'], order: [0, 1, 2, 3, 4, 5] },
  es: { system: 'CEFR', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], order: [0, 1, 2, 3, 4, 5] },
  hi: { system: 'ACTFL', levels: ['Novice', 'Intermediate', 'Advanced', 'Superior'], order: [0, 1, 2, 3] },
  ar: { system: 'ACTFL', levels: ['Novice', 'Intermediate', 'Advanced', 'Superior'], order: [0, 1, 2, 3] },
  pt: { system: 'CEFR', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], order: [0, 1, 2, 3, 4, 5] },
  ru: { system: 'CEFR', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], order: [0, 1, 2, 3, 4, 5] },
  fr: { system: 'CEFR', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], order: [0, 1, 2, 3, 4, 5] },
  de: { system: 'CEFR', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], order: [0, 1, 2, 3, 4, 5] },
  ko: { system: 'TOPIK', levels: ['1', '2', '3', '4', '5', '6'], order: [0, 1, 2, 3, 4, 5] },
  en: { system: 'CEFR', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], order: [0, 1, 2, 3, 4, 5] },
};

export function getLanguageLevels(languageCode: string): string[] {
  const language = getLanguage(languageCode);
  return language?.levels || [];
}

export function getLevelSystem(languageCode: string): string {
  return levelMappings[languageCode]?.system || 'Unknown';
}
