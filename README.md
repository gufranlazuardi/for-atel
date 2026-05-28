# 🌸 Atel Questionnaire

Questionare PDKT mobile-friendly, dibangun dengan Next.js 15, GSAP, dan Tailwind CSS.

## Stack

- **Next.js 15** (App Router)
- **GSAP 3** + `@gsap/react` — animasi door transition, flower float, slide cards
- **Zustand** — state management untuk jawaban & step
- **Tailwind CSS** — styling mobile-first
- **TypeScript** — type safety

## Cara Jalanin

```bash
# 1. Install dependencies
npm install

# 2. Dev server
npm run dev

# 3. Buka di browser
open http://localhost:3000
```

## Struktur Project

```
atel-question/
├── app/
│   ├── layout.tsx           # Root layout + Google Fonts
│   ├── globals.css          # Global styles + door CSS + petal animation
│   ├── page.tsx             # Landing page (Hai, Atel 🌸)
│   ├── questionnaire/
│   │   └── page.tsx         # Stepper questionnaire
│   └── result/
│       └── page.tsx         # Halaman hasil
├── components/
│   ├── LandingPage.tsx      # Hero dengan bunga-bunga GSAP
│   ├── QuestionCard.tsx     # Kartu pertanyaan + slide animation
│   ├── ProgressDots.tsx     # Indikator langkah
│   ├── PetalRain.tsx        # Hujan bunga di halaman hasil
│   └── ResultPage.tsx       # Halaman akhir dengan GSAP entrance
├── lib/
│   ├── questions.ts         # Data pertanyaan (ganti sesuai kebutuhan!)
│   ├── store.ts             # Zustand store
│   └── utils.ts             # cn() helper
├── tailwind.config.ts
└── tsconfig.json
```

## Cara Customize

### Ganti pertanyaan / nama
Edit `lib/questions.ts`:
```ts
// Ganti "Atel" di questions.ts atau langsung di LandingPage.tsx
// Tambah / kurangi pertanyaan di array `questions`
```

### Ganti warna
Edit `tailwind.config.ts` di bagian `colors.terracotta` dan `colors.brown`.

### Tambah pertanyaan baru
```ts
{
  id: 6,
  question: "Pertanyaan baru lo?",
  options: [
    { icon: "🎯", text: "Opsi A" },
    { icon: "🌙", text: "Opsi B" },
    // ...
  ],
}
```

## Flow Aplikasi

```
/ (Landing)
  └─ klik "Buka" → door closes → door opens
      └─ /questionnaire (Step 1..N)
          └─ klik "Selesai" → slide out
              └─ /result (Petal rain + thank you)
                  └─ klik "Mulai Lagi" → reset → kembali ke /
```
