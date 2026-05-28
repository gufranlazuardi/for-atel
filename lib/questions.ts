export interface QuestionOption {
  icon: string;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Menurut lu nih telllllllll seberapa asik sih chatingan sama gua? wkaawkak",
    options: [
      { icon: "📖", text: "ASIK BANGETTTTTTTTTTTTTT" },
      { icon: "🎵", text: "So far so good" },
      { icon: "✍️", text: "b aja" },
      { icon: "🍜", text: "anti prabowo" },
    ],
  },
  {
    id: 2,
    question: "Kita kan udah yaaaaaa kurang lebih sebulanan nih chatingan, mungkin ga sih kitaaaaaaaaaaaa main barenggggggg telllllllllllll",
    options: [
      { icon: "💬", text: "Mungkin banget dong kenapa engga?" },
      { icon: "🌅", text: "Mungkin mungkin ajah" },
      { icon: "🐾", text: "MUNGKIEENNNNNN (Nada Rico)" },
      { icon: "🎶", text: "Engga lagi pron" },
    ],
  },
  {
    id: 3,
    question: "Kalo misalkan mungkin nih, enaknyaaaaaaaa kitaaaaaaaaaa ngapain yaaaaaaaaaaaaaaaa",
    options: [
      { icon: "☕", text: "YOGA BARENG DONG (walaupun gua MAU tuh)" },
      { icon: "🌿", text: "Nongkrong - nongkrong ajaaa" },
      { icon: "🎬", text: "Nonton (jujur ini janggal)" },
      { icon: "🍽️", text: "JELAJAHI YANG DEKET2 SUMMARECON KALI YAA?" },
    ],
  },
];

export const FLOWER_EMOJIS = ["🌸", "🌺", "🌼", "🌷", "🪷", "🌻", "💐", "🌹"];
