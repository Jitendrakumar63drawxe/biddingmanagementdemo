import { prisma } from "../config/database";

export const createBidder = async (
  organizationId: string,
  data: {
    companyName: string;
    contactName?: string;
    email: string;
    phone?: string;
    address?: string;
    website?: string;
    notes?: string;
  }
) => {
  return prisma.bidder.create({
    data: {
      organizationId,
      companyName: data.companyName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      website: data.website,
      notes: data.notes
    }
  });
};


export const getBidders = async (
  organizationId: string
) => {
  return prisma.bidder.findMany({
    where: {
      organizationId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};


export const getBidderById = async (
  bidderId: string
) => {
  return prisma.bidder.findUnique({
    where: {
      id: bidderId
    }
  });
};


export const updateBidder = async (
  bidderId: string,
  data: {
    companyName?: string;
    contactName?: string;
    email?: string;
    phone?: string;
    address?: string;
    website?: string;
    notes?: string;
    status?: "ACTIVE" | "INACTIVE";
  }
) => {
  return prisma.bidder.update({
    where: {
      id: bidderId
    },
    data
  });
};


export const deleteBidder = async (
  bidderId: string
) => {
  return prisma.bidder.delete({
    where: {
      id: bidderId
    }
  });
};