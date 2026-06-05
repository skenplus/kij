import type { GrammarLesson, Exercise, CultureTopic } from '@/data/languages';

export interface JapaneseVocabularyCard {
  id: string;
  japanese: string;
  hiragana: string;
  romaji: string;
  meaning: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  category: string;
  etymology: string;
  examples: Array<{
    japanese: string;
    romaji: string;
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

export const vocabularyN5: JapaneseVocabularyCard[] = [
  {
    id: 'vocab-001',
    japanese: '食べる',
    hiragana: 'たべる',
    romaji: 'taberu',
    meaning: 'To eat',
    level: 'N5',
    category: 'Verbs - Daily Actions',
    etymology: 'Proto-Japanese root *tab- (to eat)',
    examples: [
      {
        japanese: '私は毎日ご飯を食べます',
        romaji: 'Watashi wa mainichi gohan wo tabemasu',
        english: 'I eat rice every day',
        level: 'beginner',
      },
      {
        japanese: '昨日、友達と一緒に寿司を食べました',
        romaji: 'Kinou, tomodachi to issho ni sushi wo tabemashita',
        english: 'Yesterday, I ate sushi with a friend',
        level: 'intermediate',
      },
      {
        japanese: '日本文化を理解するには、日本料理を食べてみることが重要だ',
        romaji: 'Nihon bunka wo rikai suru ni wa, Nihon ryouri wo tabete miru koto ga juuyou da',
        english: 'To understand Japanese culture, it is important to try Japanese cuisine',
        level: 'advanced',
      },
    ],
    mnemonics: {
      visual: 'Imagine someone eating a bowl of rice. The character 食 resembles a mouth with food.',
      auditory: 'Ta-be-ru - "ta" sounds like tapping (chewing), "be" like "bite" in English, "ru" is a common verb ending.',
      kinesthetic: 'Make the gesture of eating by bringing your hand to your mouth while saying "taberu".',
      logical: '食べる = 食 (food) + べる (verb suffix). Breaking it down reveals: "to do food" = to eat.',
      narrative: 'I went to a restaurant. I ordered ramen. It was delicious. I ate (tabeta) the whole bowl. I went home happy.',
    },
    culturalNotes: 'The verb taberu is central to Japanese culture. Meals are important social moments. Before eating, one says 「いただきます」(itadakimasu - "I humbly receive"), expressing gratitude. After the meal, one says 「ごちそうさま」(gochisousama - "it was a feast"), showing appreciation.',
    translations: [
      { language: 'French', family: 'Indo-European', translation: 'Manger' },
      { language: 'English', family: 'Indo-European', translation: 'Eat' },
      { language: 'Mandarin', family: 'Sino-Tibetan', translation: '吃 (chī)' },
      { language: 'Arabic', family: 'Afro-Asiatic', translation: 'أكل (akala)' },
      { language: 'Korean', family: 'Korean (isolate)', translation: '먹다 (meokda)' },
    ],
  },
  {
    id: 'vocab-002',
    japanese: 'ありがとう',
    hiragana: 'ありがとう',
    romaji: 'arigatou',
    meaning: 'Thank you',
    level: 'N5',
    category: 'Expressions - Politeness',
    etymology: 'From 有 (ari - exist) + 難 (gatai - difficult) = "it is difficult to exist" (expressing rarity and gratitude)',
    examples: [
      {
        japanese: 'ありがとう',
        romaji: 'Arigatou',
        english: 'Thank you',
        level: 'beginner',
      },
      {
        japanese: '昨日は本当にありがとうございました',
        romaji: 'Kinou wa hontou ni arigatou gozaimashita',
        english: 'Thank you very much for yesterday',
        level: 'intermediate',
      },
      {
        japanese: 'あなたの心からの支援に、言葉では表現できないほどの感謝の気持ちでいっぱいです',
        romaji: 'Anata no kokorokara no shien ni, kotoba de wa hyougen dekinai hodo no kansha no kimochi de ippai desu',
        english: 'I am filled with gratitude that words cannot express for your sincere support',
        level: 'advanced',
      },
    ],
    mnemonics: {
      visual: 'Imagine someone bowing slightly while saying "arigatou". The physical gesture accompanies the verbal expression.',
      auditory: 'A-ri-ga-tou - The smooth, melodious sound reminds one of a song. "A" like opening the heart, "ri" like rhythm, "ga" like gratitude, "tou" like respectful conclusion.',
      kinesthetic: 'Place your hand on your heart and bow slightly while saying "arigatou". This gesture creates an emotional association with gratitude.',
      logical: 'ありがとう = 有 (exist) + 難 (difficult) = "it is difficult to exist" = "I am grateful that you exist to help me". The breakdown reveals philosophical depth.',
      narrative: 'My friend helps me move. I am tired. My friend gives me cold water. I say 「ありがとう」. My friend smiles. I feel the warmth of friendship.',
    },
    culturalNotes: 'Arigatou is more than a simple expression of thanks. It reflects the Japanese philosophy of recognition and appreciation. The complete form "arigatou gozaimasu" (ありがとうございます) is used in formal contexts or to show particular respect. In Japanese culture, expressing gratitude is an important act that strengthens social relationships.',
    translations: [
      { language: 'French', family: 'Indo-European', translation: 'Merci' },
      { language: 'English', family: 'Indo-European', translation: 'Thank you' },
      { language: 'Mandarin', family: 'Sino-Tibetan', translation: '谢谢 (xièxie)' },
      { language: 'Korean', family: 'Korean (isolate)', translation: '감사합니다 (gamsahamnida)' },
      { language: 'German', family: 'Indo-European', translation: 'Danke' },
    ],
  },
  {
    id: 'vocab-003',
    japanese: '桜',
    hiragana: 'さくら',
    romaji: 'sakura',
    meaning: 'Cherry blossom',
    level: 'N5',
    category: 'Nature - Symbols',
    etymology: 'Proto-Japanese root *saku (to bloom, to flourish)',
    examples: [
      {
        japanese: '桜がきれいです',
        romaji: 'Sakura ga kirei desu',
        english: 'The cherry blossoms are beautiful',
        level: 'beginner',
      },
      {
        japanese: '毎年、春になると、家族で桜を見に公園に行きます',
        romaji: 'Mainen, haru ni naru to, kazoku de sakura wo mi ni kouen ni ikimasu',
        english: 'Every year, when spring comes, my family goes to the park to see the cherry blossoms',
        level: 'intermediate',
      },
      {
        japanese: '桜は日本文化の象徴であり、その儚い美しさは、人生の無常性を表している',
        romaji: 'Sakura wa Nihon bunka no shouchou de ari, sono hakanai utsukushisa wa, jinsei no mujousei wo arawashite iru',
        english: 'The cherry blossom is a symbol of Japanese culture, and its ephemeral beauty represents the impermanence of life',
        level: 'advanced',
      },
    ],
    mnemonics: {
      visual: 'Imagine a tree covered with pink and white flowers in spring. The character 桜 contains the radical 木 (tree), visually reminding one of the cherry tree.',
      auditory: 'Sa-ku-ra - The smooth, flowing sound reminds one of wind blowing petals. "Sa" like the breath of wind, "ku" like a murmur, "ra" like falling petals.',
      kinesthetic: 'Make the gesture of falling petals by saying "sakura" and letting your hands descend gracefully, like cherry blossoms falling.',
      logical: '桜 = 木 (tree) + 女 (woman, representing beauty and grace). The combination evokes a graceful and beautiful tree.',
      narrative: 'It is spring. I go to the park. The trees are covered with pink flowers. It is magnificent. I think about the transient beauty of life. I understand why Japanese people love sakura.',
    },
    culturalNotes: 'The cherry blossom (sakura) is deeply rooted in Japanese culture. It symbolizes transient beauty and impermanence (wabi-sabi), key concepts in Japanese aesthetics. The season of sakura (late March to early April) is celebrated with festivals called "hanami" (花見 - literally "flower viewing"). Families and friends gather under blooming trees for picnics and festivities.',
    translations: [
      { language: 'French', family: 'Indo-European', translation: 'Fleur de cerisier' },
      { language: 'English', family: 'Indo-European', translation: 'Cherry blossom' },
      { language: 'Mandarin', family: 'Sino-Tibetan', translation: '樱花 (yīnghuā)' },
      { language: 'Korean', family: 'Korean (isolate)', translation: '벚꽃 (beot-kkot)' },
      { language: 'German', family: 'Indo-European', translation: 'Kirschblüte' },
    ],
  },
];

export const grammarN5: GrammarLesson[] = [
  {
    id: 'grammar-001',
    title: 'です (desu) - Copula',
    level: 'N5',
    pattern: 'Noun + です',
    meaning: 'To be (polite form)',
    explanation: 'The copula です is used to connect a noun to its description or state. It is the polite form of the verb "to be".',
    examples: [
      { original: '私は学生です', romanization: 'Watashi wa gakusei desu', english: 'I am a student' },
      { original: 'これは本です', romanization: 'Kore wa hon desu', english: 'This is a book' },
      { original: '今日はいい天気です', romanization: 'Kyou wa ii tenki desu', english: 'Today is nice weather' },
    ],
    usage: 'Used in polite, formal speech. Common in everyday conversations, presentations, and written Japanese.',
    notes: 'The negative form is ではありません (de wa arimasen) or じゃありません (ja arimasen). The past tense is でした (deshita).',
  },
  {
    id: 'grammar-002',
    title: 'は (wa) - Topic Particle',
    level: 'N5',
    pattern: 'Topic + は + Comment',
    meaning: 'Marks the topic of the sentence',
    explanation: 'The particle は (wa) marks the topic or theme of a sentence. It indicates what the sentence is about.',
    examples: [
      { original: '私は日本人です', romanization: 'Watashi wa Nihonjin desu', english: 'As for me, I am Japanese' },
      { original: '日本は島国です', romanization: 'Nihon wa shimaguni desu', english: 'As for Japan, it is an island nation' },
      { original: '天気は良いです', romanization: 'Tenki wa yoi desu', english: 'As for the weather, it is good' },
    ],
    usage: 'Used to introduce the main topic of a sentence. Essential for basic Japanese sentence structure.',
    notes: 'Do not confuse は (wa) with が (ga). While は marks the topic, が marks the grammatical subject and is used in more specific contexts.',
  },
  {
    id: 'grammar-003',
    title: 'を (wo/o) - Object Particle',
    level: 'N5',
    pattern: 'Object + を + Verb',
    meaning: 'Marks the direct object of a verb',
    explanation: 'The particle を (wo/o) marks the direct object of an action verb. It indicates what or who is affected by the action.',
    examples: [
      { original: '水を飲みます', romanization: 'Mizu wo nomimasu', english: 'I drink water' },
      { original: '本を読みます', romanization: 'Hon wo yomimasu', english: 'I read a book' },
      { original: '映画を見ます', romanization: 'Eiga wo mimasu', english: 'I watch a movie' },
    ],
    usage: 'Used with transitive verbs (verbs that take a direct object). Essential for expressing actions and their targets.',
    notes: 'を is pronounced "o" in modern Japanese, though historically it was pronounced "wo". It is written as を in hiragana.',
  },
];

export const exercisesN5: Exercise[] = [
  {
    id: 'exercise-001',
    type: 'reading',
    level: 'N5',
    question: 'What does 「食べます」mean?',
    options: ['To drink', 'To eat', 'To sleep', 'To walk'],
    correctAnswer: 'To eat',
    explanation: '「食べます」is the polite form of the verb 「食べる」which means "to eat". It is one of the most common verbs in Japanese.',
  },
  {
    id: 'exercise-002',
    type: 'translation',
    level: 'N5',
    question: 'Translate: 「私は学生です」',
    options: ['I am a teacher', 'I am a student', 'I am a doctor', 'I am an engineer'],
    correctAnswer: 'I am a student',
    explanation: '「学生」(gakusei) means "student". The sentence structure is: 私 (I) + は (topic particle) + 学生 (student) + です (copula).',
  },
  {
    id: 'exercise-003',
    type: 'listening',
    level: 'N5',
    question: 'Listen and identify the correct response to: 「お名前は？」',
    options: ['Watashi wa gakusei desu', 'Watashi wa Tanaka desu', 'Watashi wa Nihon desu', 'Watashi wa hon desu'],
    correctAnswer: 'Watashi wa Tanaka desu',
    explanation: 'The question 「お名前は？」asks "What is your name?". The appropriate response is to give your name: 「私は[name]です」.',
  },
];

export const culturalTopics: CultureTopic[] = [
  {
    id: 'culture-001',
    title: 'Hanami - Cherry Blossom Festival',
    content: 'Hanami (花見) is the Japanese tradition of enjoying the blooming of cherry blossoms. It is one of the most celebrated events in Japan, marking the arrival of spring. Families, friends, and colleagues gather under blooming cherry trees for picnics, celebrations, and socializing. The festival dates back over a thousand years and has deep cultural significance.',
    relatedVocabulary: ['sakura', 'haru', 'matsuri'],
    traditions: ['Picnicking under cherry trees', 'Nighttime viewing (yozakura)', 'Eating traditional foods', 'Socializing with friends and family'],
  },
  {
    id: 'culture-002',
    title: 'Keigo - Honorific Language',
    content: 'Keigo (敬語) is the system of honorific language in Japanese used to show respect and politeness. It is essential to Japanese social interactions and reflects the hierarchical nature of Japanese society. Understanding and using keigo appropriately is crucial for success in professional and formal contexts.',
    relatedVocabulary: ['keigo', 'teineigo', 'kenjougo'],
    traditions: ['Using appropriate forms in different social contexts', 'Showing respect to superiors and elders', 'Maintaining social harmony'],
  },
  {
    id: 'culture-003',
    title: 'Wabi-sabi - The Aesthetics of Imperfection',
    content: 'Wabi-sabi (侘寂) is a Japanese aesthetic that finds beauty in imperfection, impermanence, and incompleteness. It is deeply rooted in Zen Buddhism and influences many aspects of Japanese culture, from tea ceremony to garden design to literature. Understanding wabi-sabi is key to understanding Japanese aesthetics and philosophy.',
    relatedVocabulary: ['wabi', 'sabi', 'zen', 'chado'],
    traditions: ['Tea ceremony (chado)', 'Flower arrangement (ikebana)', 'Garden design', 'Pottery and ceramics'],
  },
];
