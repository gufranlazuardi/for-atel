-- CreateTable
CREATE TABLE "QuestionnaireResult" (
    "id" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionnaireResult_pkey" PRIMARY KEY ("id")
);
