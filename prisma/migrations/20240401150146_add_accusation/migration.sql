-- CreateTable
CREATE TABLE "Accusation" (
    "id" TEXT NOT NULL,
    "accused_profile_id" TEXT NOT NULL,
    "accuser_user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content_html" TEXT NOT NULL,
    "content_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Accusation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccusationResponse" (
    "id" TEXT NOT NULL,
    "accusation_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content_html" TEXT NOT NULL,
    "content_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccusationResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Accusation" ADD CONSTRAINT "Accusation_accused_profile_id_fkey" FOREIGN KEY ("accused_profile_id") REFERENCES "UserProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accusation" ADD CONSTRAINT "Accusation_accuser_user_id_fkey" FOREIGN KEY ("accuser_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccusationResponse" ADD CONSTRAINT "AccusationResponse_accusation_id_fkey" FOREIGN KEY ("accusation_id") REFERENCES "Accusation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccusationResponse" ADD CONSTRAINT "AccusationResponse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
