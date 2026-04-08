export interface BibleVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  chunks: {
    text: string;
    translation: string;
    grammar_note?: string;
  }[];
  syntax_pattern?: string[];
  vocabulary: {
    word: string;
    meaning: string;
    part_of_speech: string;
  }[];
}

export const BIBLE_DATA: BibleVerse[] = [
  {
    id: "john-1-1",
    book: "John",
    chapter: 1,
    verse: 1,
    text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
    chunks: [
      { text: "In the beginning", translation: "태초에", grammar_note: "Prepositional phrase indicating time." },
      { text: "was the Word", translation: "말씀이 계셨다", grammar_note: "Inversion: Verb (was) comes before Subject (the Word) for emphasis." },
      { text: "and the Word", translation: "그리고 그 말씀은", grammar_note: "Conjunction connecting clauses." },
      { text: "was with God", translation: "하나님과 함께 계셨다", grammar_note: "Prepositional phrase 'with God' as complement." },
      { text: "and the Word was God", translation: "그리고 그 말씀은 하나님이셨다", grammar_note: "Simple Subject-Verb-Complement structure." }
    ],
    syntax_pattern: ["Inversion"],
    vocabulary: [
      { word: "Beginning", meaning: "시작, 태초", part_of_speech: "noun" },
      { word: "Word", meaning: "말씀, 로고스", part_of_speech: "noun" }
    ]
  },
  {
    id: "john-1-14",
    book: "John",
    chapter: 1,
    verse: 14,
    text: "The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
    chunks: [
      { text: "The Word became flesh", translation: "말씀이 육신이 되어", grammar_note: "Subject-Verb-Complement (Linking verb 'become')." },
      { text: "and made his dwelling", translation: "그의 거처를 삼으셨다", grammar_note: "Idiomatic expression: 'make one's dwelling' (거주하다)." },
      { text: "among us", translation: "우리 가운데", grammar_note: "Prepositional phrase indicating location." },
      { text: "We have seen his glory", translation: "우리가 그의 영광을 보았다", grammar_note: "Present Perfect tense (have seen)." },
      { text: "the glory of the one and only Son", translation: "독생하신 아들의 영광", grammar_note: "Apposition: explaining 'his glory'." },
      { text: "who came from the Father", translation: "아버지로부터 오신", grammar_note: "Relative Clause: 'who' refers to 'the Son'." },
      { text: "full of grace and truth", translation: "은혜와 진리가 충만한", grammar_note: "Adjective phrase modifying 'the Son'." }
    ],
    syntax_pattern: ["Relative Clause", "Present Perfect"],
    vocabulary: [
      { word: "Flesh", meaning: "육신, 몸", part_of_speech: "noun" },
      { word: "Dwelling", meaning: "거처, 거주", part_of_speech: "noun" },
      { word: "Glory", meaning: "영광", part_of_speech: "noun" }
    ]
  },
  {
    id: "proverbs-1-7",
    book: "Proverbs",
    chapter: 1,
    verse: 7,
    text: "The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.",
    chunks: [
      { text: "The fear of the Lord", translation: "여호와를 경외함이", grammar_note: "Subject: 'fear' is the head noun." },
      { text: "is the beginning of knowledge", translation: "지식의 근본이다", grammar_note: "Subject-Verb-Complement." },
      { text: "but fools", translation: "그러나 미련한 자들은", grammar_note: "Contrastive conjunction 'but'." },
      { text: "despise wisdom and instruction", translation: "지혜와 훈계를 멸시한다", grammar_note: "Subject-Verb-Object." }
    ],
    syntax_pattern: ["Contrast"],
    vocabulary: [
      { word: "Fear", meaning: "경외, 두려움", part_of_speech: "noun" },
      { word: "Despise", meaning: "멸시하다, 경멸하다", part_of_speech: "verb" },
      { word: "Instruction", meaning: "훈계, 가르침", part_of_speech: "noun" }
    ]
  },
  {
    id: "proverbs-3-5",
    book: "Proverbs",
    chapter: 3,
    verse: 5,
    text: "Trust in the Lord with all your heart and lean not on your own understanding;",
    chunks: [
      { text: "Trust in the Lord", translation: "여호와를 신뢰하라", grammar_note: "Imperative mood (command/exhortation)." },
      { text: "with all your heart", translation: "너의 온 마음을 다하여", grammar_note: "Prepositional phrase indicating manner." },
      { text: "and lean not", translation: "그리고 의지하지 말라", grammar_note: "Negative imperative." },
      { text: "on your own understanding", translation: "너 자신의 명철에", grammar_note: "Prepositional phrase 'on ...'." }
    ],
    syntax_pattern: ["Imperative"],
    vocabulary: [
      { word: "Trust", meaning: "신뢰하다", part_of_speech: "verb" },
      { word: "Lean", meaning: "기대다, 의지하다", part_of_speech: "verb" },
      { word: "Understanding", meaning: "명철, 이해", part_of_speech: "noun" }
    ]
  },
  {
    id: "john-8-12",
    book: "John",
    chapter: 8,
    verse: 12,
    text: "When Jesus spoke again to the people, he said, 'I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.'",
    chunks: [
      { text: "When Jesus spoke again", translation: "예수께서 다시 말씀하셨을 때", grammar_note: "Temporal clause." },
      { text: "to the people", translation: "사람들에게", grammar_note: "Prepositional phrase." },
      { text: "he said", translation: "그가 말씀하셨다", grammar_note: "Main clause subject-verb." },
      { text: "I am the light of the world", translation: "나는 세상의 빛이다", grammar_note: "I am (Ego Eimi) statement." },
      { text: "Whoever follows me", translation: "나를 따르는 자는 누구든지", grammar_note: "Relative clause as subject." },
      { text: "will never walk in darkness", translation: "결코 어둠 속에 다니지 아니하고", grammar_note: "Future tense with negative 'never'." },
      { text: "but will have the light of life", translation: "생명의 빛을 얻으리라", grammar_note: "Contrastive conjunction 'but'." }
    ],
    syntax_pattern: ["Relative Clause", "Contrast"],
    vocabulary: [
      { word: "Light", meaning: "빛", part_of_speech: "noun" },
      { word: "Darkness", meaning: "어둠", part_of_speech: "noun" },
      { word: "Follow", meaning: "따르다", part_of_speech: "verb" }
    ]
  },
  {
    id: "john-12-24",
    book: "John",
    chapter: 12,
    verse: 24,
    text: "Very truly I tell you, unless a kernel of wheat falls to the ground and dies, it remains only a single seed. But if it dies, it produces many seeds.",
    chunks: [
      { text: "Very truly I tell you", translation: "진실로 진실로 너희에게 이르노니", grammar_note: "Emphasis phrase." },
      { text: "unless a kernel of wheat", translation: "만약 밀알 하나가", grammar_note: "Conditional conjunction 'unless'." },
      { text: "falls to the ground and dies", translation: "땅에 떨어져 죽지 아니하면", grammar_note: "Compound predicate." },
      { text: "it remains only a single seed", translation: "한 알 그대로 있고", grammar_note: "Result clause." },
      { text: "But if it dies", translation: "죽으면", grammar_note: "Conditional 'if'." },
      { text: "it produces many seeds", translation: "많은 열매를 맺느니라", grammar_note: "Result clause." }
    ],
    syntax_pattern: ["Conditional"],
    vocabulary: [
      { word: "Kernel", meaning: "알갱이, 낟알", part_of_speech: "noun" },
      { word: "Produce", meaning: "생산하다, 맺다", part_of_speech: "verb" }
    ]
  },
  {
    id: "proverbs-8-11",
    book: "Proverbs",
    chapter: 8,
    verse: 11,
    text: "for wisdom is more precious than rubies, and nothing you desire can compare with her.",
    chunks: [
      { text: "for wisdom is", translation: "지혜는 ~이기 때문이다", grammar_note: "Conjunction 'for' meaning 'because'." },
      { text: "more precious than rubies", translation: "진주보다 더 귀하다", grammar_note: "Comparative structure." },
      { text: "and nothing you desire", translation: "너가 바라는 어떤 것도", grammar_note: "Negative subject with relative clause." },
      { text: "can compare with her", translation: "그녀(지혜)와 비교할 수 없다", grammar_note: "Verb phrase 'compare with'." }
    ],
    syntax_pattern: ["Comparative"],
    vocabulary: [
      { word: "Precious", meaning: "귀중한", part_of_speech: "adjective" },
      { word: "Compare", meaning: "비교하다", part_of_speech: "verb" },
      { word: "Desire", meaning: "바라다, 욕망하다", part_of_speech: "verb" }
    ]
  },
  {
    id: "proverbs-20-15",
    book: "Proverbs",
    chapter: 20,
    verse: 15,
    text: "Gold there is, and rubies in abundance, but lips that speak knowledge are a rare jewel.",
    chunks: [
      { text: "Gold there is", translation: "금도 있고", grammar_note: "Inversion for poetic effect." },
      { text: "and rubies in abundance", translation: "진주도 많거니와", grammar_note: "Prepositional phrase 'in abundance'." },
      { text: "but lips that speak knowledge", translation: "지식을 말하는 입술은", grammar_note: "Relative clause 'that speak knowledge'." },
      { text: "are a rare jewel", translation: "귀한 보배니라", grammar_note: "Subject-Verb-Complement." }
    ],
    syntax_pattern: ["Inversion", "Relative Clause"],
    vocabulary: [
      { word: "Abundance", meaning: "풍부함", part_of_speech: "noun" },
      { word: "Rare", meaning: "희귀한", part_of_speech: "adjective" },
      { word: "Jewel", meaning: "보석", part_of_speech: "noun" }
    ]
  }
];
