-- DropForeignKey
ALTER TABLE "SkillBadge" DROP CONSTRAINT "SkillBadge_verifierId_fkey";

-- DropIndex
DROP INDEX "SkillBadge_userId_skillName_idx";
