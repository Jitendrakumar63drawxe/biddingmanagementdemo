-- CreateEnum
CREATE TYPE "BidStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'AWARDED', 'REJECTED', 'WITHDRAWN');

-- CreateTable
CREATE TABLE "Bid" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "bidPackageId" TEXT NOT NULL,
    "bidderId" TEXT NOT NULL,
    "amount" DECIMAL(65,30),
    "notes" TEXT,
    "status" "BidStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Bid_organizationId_idx" ON "Bid"("organizationId");

-- CreateIndex
CREATE INDEX "Bid_bidPackageId_idx" ON "Bid"("bidPackageId");

-- CreateIndex
CREATE INDEX "Bid_bidderId_idx" ON "Bid"("bidderId");

-- CreateIndex
CREATE INDEX "Bid_status_idx" ON "Bid"("status");

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_bidPackageId_fkey" FOREIGN KEY ("bidPackageId") REFERENCES "BidPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Bidder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
