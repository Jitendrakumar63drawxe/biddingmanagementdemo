import { prisma } from "../config/database";


// =====================================================
// CREATE BID PACKAGE
// =====================================================

export const createBidPackage = async (
  projectId: string,
  data: {
    name: string;
    description?: string;
    bidDeadline?: Date;
  }
) => {

  return prisma.bidPackage.create({
    data: {
      projectId,
      name: data.name,
      description: data.description,
      bidDeadline: data.bidDeadline
    }
  });
};


// =====================================================
// GET ALL BID PACKAGES OF PROJECT
// =====================================================

export const getProjectBidPackages = async (
  projectId: string
) => {

  return prisma.bidPackage.findMany({
    where: {
      projectId
    },

    orderBy: {
      createdAt: "desc"
    }
  });
};


// =====================================================
// GET SINGLE BID PACKAGE
// =====================================================

export const getBidPackageById = async (
  bidPackageId: string
) => {

  return prisma.bidPackage.findUnique({
    where: {
      id: bidPackageId
    }
  });
};


// =====================================================
// UPDATE BID PACKAGE
// =====================================================

export const updateBidPackage = async (
  bidPackageId: string,
  data: {
    name?: string;
    description?: string;
    status?: string;
    bidDeadline?: Date;
  }
) => {

  return prisma.bidPackage.update({
    where: {
      id: bidPackageId
    },

    data: {
      ...(data.name !== undefined && {
        name: data.name
      }),

      ...(data.description !== undefined && {
        description: data.description
      }),

      ...(data.status !== undefined && {
        status: data.status as any
      }),

      ...(data.bidDeadline !== undefined && {
        bidDeadline: data.bidDeadline
      })
    }
  });
};


// =====================================================
// DELETE BID PACKAGE
// =====================================================

export const deleteBidPackage = async (
  bidPackageId: string
) => {

  return prisma.bidPackage.delete({
    where: {
      id: bidPackageId
    }
  });
};