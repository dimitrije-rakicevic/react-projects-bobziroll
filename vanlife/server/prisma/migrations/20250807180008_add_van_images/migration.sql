-- CreateTable
CREATE TABLE "public"."Image" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "vanId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_vanId_fkey" FOREIGN KEY ("vanId") REFERENCES "public"."Van"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
