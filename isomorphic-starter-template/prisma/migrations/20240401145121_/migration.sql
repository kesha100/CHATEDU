-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "question_id" SERIAL NOT NULL,
    "question_text_en" TEXT NOT NULL,
    "question_text_ch" TEXT NOT NULL,
    "answer_type" TEXT NOT NULL,
    "related_topic_id" INTEGER NOT NULL,
    "survay_id" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "RelatedTopic" (
    "topic_id" SERIAL NOT NULL,
    "topic_name_en" TEXT NOT NULL,
    "topic_name_ch" TEXT NOT NULL,
    "survay_id" INTEGER NOT NULL,

    CONSTRAINT "RelatedTopic_pkey" PRIMARY KEY ("topic_id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "answer_text" JSONB NOT NULL,
    "answer_id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "file_id" INTEGER,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("answer_id")
);

-- CreateTable
CREATE TABLE "Survay" (
    "survay_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Survay_pkey" PRIMARY KEY ("survay_id")
);

-- CreateTable
CREATE TABLE "Option" (
    "option_id" SERIAL NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "option_text_en" TEXT NOT NULL,
    "option_text_ch" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("option_id")
);

-- CreateTable
CREATE TABLE "File" (
    "file_id" SERIAL NOT NULL,
    "file" TEXT NOT NULL,
    "survay_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("file_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "RelatedTopic_topic_name_en_key" ON "RelatedTopic"("topic_name_en");

-- CreateIndex
CREATE UNIQUE INDEX "Survay_name_key" ON "Survay"("name");

-- CreateIndex
CREATE UNIQUE INDEX "File_file_key" ON "File"("file");

-- CreateIndex
CREATE UNIQUE INDEX "File_survay_id_key" ON "File"("survay_id");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_related_topic_id_fkey" FOREIGN KEY ("related_topic_id") REFERENCES "RelatedTopic"("topic_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_survay_id_fkey" FOREIGN KEY ("survay_id") REFERENCES "Survay"("survay_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedTopic" ADD CONSTRAINT "RelatedTopic_survay_id_fkey" FOREIGN KEY ("survay_id") REFERENCES "Survay"("survay_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "File"("file_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_survay_id_fkey" FOREIGN KEY ("survay_id") REFERENCES "Survay"("survay_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
