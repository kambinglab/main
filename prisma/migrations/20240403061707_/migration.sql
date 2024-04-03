-- DropForeignKey
ALTER TABLE "Accusation" DROP CONSTRAINT "Accusation_accused_profile_id_fkey";

-- AddForeignKey
ALTER TABLE "Accusation" ADD CONSTRAINT "Accusation_accused_profile_id_fkey" FOREIGN KEY ("accused_profile_id") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
