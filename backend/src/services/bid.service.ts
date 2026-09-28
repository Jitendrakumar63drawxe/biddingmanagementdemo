import { prisma } from "../config/database";

// ==========================================
// CREATE BID
// ==========================================

export const createBid = async (
  organizationId: string,
  bidPackageId: string,
  bidderId: string,
  data: {
    amount?: number;
    notes?: string;
  }
) => {
  // Check bid package
  const bidPackage = await prisma.bidPackage.findFirst({
    where: {
      id: bidPackageId,
      project: {
        organizationId,
      },
    },
  });

  if (!bidPackage) {
    throw new Error("Bid package not found");
  }

  // Check bidder
  const bidder = await prisma.bidder.findFirst({
    where: {
      id: bidderId,
      organizationId,
    },
  });

  if (!bidder) {
    throw new Error("Bidder not found");
  }

  // Prevent duplicate bid
  const existingBid = await prisma.bid.findFirst({
    where: {
      organizationId,
      bidPackageId,
      bidderId,
    },
  });

  if (existingBid) {
    throw new Error(
      "Bid already exists for this bidder"
    );
  }

  return prisma.bid.create({
    data: {
      organizationId,
      bidPackageId,
      bidderId,
      amount: data.amount,
      notes: data.notes,
    },
    include: {
      bidder: true,
      bidPackage: true,
    },
  });
};

// ==========================================
// GET BIDS OF BID PACKAGE
// ==========================================

export const getBidPackageBids = async (
  organizationId: string,
  bidPackageId: string
) => {
  return prisma.bid.findMany({
    where: {
      organizationId,
      bidPackageId,
    },
    include: {
      bidder: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ==========================================
// BID COMPARISON
// ==========================================

export const getBidComparison = async (
  organizationId: string,
  bidPackageId: string
) => {
  // Verify bid package belongs to organization
  const bidPackage =
    await prisma.bidPackage.findFirst({
      where: {
        id: bidPackageId,
        project: {
          organizationId,
        },
      },
    });

  if (!bidPackage) {
    throw new Error("Bid package not found");
  }

  // Only submitted bids are included
  const bids = await prisma.bid.findMany({
    where: {
      organizationId,
      bidPackageId,
      status: "SUBMITTED",
    },
    include: {
      bidder: true,
    },
    orderBy: {
      amount: "asc",
    },
  });

  return bids;
};

// ==========================================
// GET SINGLE BID
// ==========================================

export const getBidById = async (
  organizationId: string,
  bidId: string
) => {
  return prisma.bid.findFirst({
    where: {
      id: bidId,
      organizationId,
    },
    include: {
      bidder: true,
      bidPackage: true,
    },
  });
};

// ==========================================
// SUBMIT BID
// ==========================================

export const submitBid = async (
  organizationId: string,
  bidId: string
) => {
  const bid = await prisma.bid.findFirst({
    where: {
      id: bidId,
      organizationId,
    },
  });

  if (!bid) {
    throw new Error("Bid not found");
  }

  if (bid.status !== "DRAFT") {
    throw new Error(
      "Only draft bids can be submitted"
    );
  }

  return prisma.bid.update({
    where: {
      id: bidId,
    },
    data: {
      status: "SUBMITTED",
      submittedAt: new Date(),
    },
    include: {
      bidder: true,
      bidPackage: true,
    },
  });
};

// ==========================================
// UPDATE BID
// ==========================================

export const updateBid = async (
  organizationId: string,
  bidId: string,
  data: {
    amount?: number;
    notes?: string;
  }
) => {
  const bid = await prisma.bid.findFirst({
    where: {
      id: bidId,
      organizationId,
    },
  });

  if (!bid) {
    throw new Error("Bid not found");
  }

  if (bid.status !== "DRAFT") {
    throw new Error(
      "Only draft bids can be updated"
    );
  }

  return prisma.bid.update({
    where: {
      id: bidId,
    },
    data: {
      amount: data.amount,
      notes: data.notes,
    },
  });
};

// ==========================================
// DELETE BID
// ==========================================

export const deleteBid = async (
  organizationId: string,
  bidId: string
) => {
  const bid = await prisma.bid.findFirst({
    where: {
      id: bidId,
      organizationId,
    },
  });

  if (!bid) {
    throw new Error("Bid not found");
  }

  if (bid.status !== "DRAFT") {
    throw new Error(
      "Only draft bids can be deleted"
    );
  }

  return prisma.bid.delete({
    where: {
      id: bidId,
    },
  });
};
// ==========================================
// AWARD BID
// ==========================================

export const awardBid = async (
  organizationId: string,
  bidId: string
) => {
  // Check selected bid
  const bid = await prisma.bid.findFirst({
    where: {
      id: bidId,
      organizationId,
    },
    include: {
      bidPackage: true,
      bidder: true,
    },
  });

  if (!bid) {
    throw new Error("Bid not found");
  }

  // Only submitted bids can be awarded
  if (bid.status !== "SUBMITTED") {
    throw new Error("Only submitted bids can be awarded");
  }

  // Check bid package
  const bidPackage = await prisma.bidPackage.findFirst({
    where: {
      id: bid.bidPackageId,
      project: {
        organizationId,
      },
    },
  });

  if (!bidPackage) {
    throw new Error("Bid package not found");
  }

  // Prevent awarding an already awarded package
  if (bidPackage.status === "AWARDED") {
    throw new Error("Bid package has already been awarded");
  }

  const result = await prisma.$transaction(async (tx) => {

    // Award selected bid
    const awardedBid = await tx.bid.update({
      where: {
        id: bidId,
      },
      data: {
        status: "AWARDED",
      },
      include: {
        bidder: true,
        bidPackage: true,
      },
    });

    // Reject all other submitted bids
    await tx.bid.updateMany({
      where: {
        organizationId,
        bidPackageId: bid.bidPackageId,
        status: "SUBMITTED",
        id: {
          not: bidId,
        },
      },
      data: {
        status: "REJECTED",
      },
    });

    // Mark bid package as awarded
    const updatedBidPackage = await tx.bidPackage.update({
      where: {
        id: bid.bidPackageId,
      },
      data: {
        status: "AWARDED",
      },
    });

    return {
      awardedBid,
      bidPackage: updatedBidPackage,
    };
  });

  return result;
};