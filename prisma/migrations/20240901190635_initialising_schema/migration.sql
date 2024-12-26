/*
  Warnings:

  - Added the required column `collegeId` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collegeId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collegeId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collegeId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collegeId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interests` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collegeId` to the `Webinar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "collegeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "collegeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "collegeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "collegeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "collegeId" INTEGER NOT NULL,
ADD COLUMN     "interests" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Webinar" ADD COLUMN     "collegeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "College" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "College_id_key" ON "College"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webinar" ADD CONSTRAINT "Webinar_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
