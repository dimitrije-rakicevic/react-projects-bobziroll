-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_vanId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Van" DROP CONSTRAINT "Van_hostId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Van" ADD CONSTRAINT "Van_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_vanId_fkey" FOREIGN KEY ("vanId") REFERENCES "public"."Van"("id") ON DELETE CASCADE ON UPDATE CASCADE;
