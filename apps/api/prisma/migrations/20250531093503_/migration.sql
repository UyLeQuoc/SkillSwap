/*
  Warnings:

  - You are about to drop the column `normalizedDesc` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `normalizedHave` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `normalizedWant` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `suiNftId` on the `SkillBadge` table. All the data in the column will be lost.
  - Added the required column `suiObjectId` to the `SkillBadge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "normalizedDesc",
DROP COLUMN "normalizedHave",
DROP COLUMN "normalizedWant",
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SkillBadge" DROP COLUMN "suiNftId",
ADD COLUMN     "suiObjectId" TEXT NOT NULL;
