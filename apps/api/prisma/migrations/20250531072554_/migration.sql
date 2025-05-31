/*
  Warnings:

  - A unique constraint covering the columns `[dealId,reviewerId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "DealType" AS ENUM ('SKILL_SWAP', 'ITEM_SWAP');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('SKILL', 'ITEM');

-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "type" "DealType" NOT NULL DEFAULT 'SKILL_SWAP';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "type" "PostType" NOT NULL DEFAULT 'SKILL';

-- CreateIndex
CREATE INDEX "PostTag_name_idx" ON "PostTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Review_dealId_reviewerId_key" ON "Review"("dealId", "reviewerId");

-- CreateIndex
CREATE INDEX "SkillBadge_userId_skillName_idx" ON "SkillBadge"("userId", "skillName");
