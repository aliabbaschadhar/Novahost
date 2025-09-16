/*
  Warnings:

  - You are about to drop the column `subdomain` on the `Project` table. All the data in the column will be lost.
  - Added the required column `subDomain` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "subdomain",
ADD COLUMN     "subDomain" TEXT NOT NULL;
