import crypto from "crypto";
import { prisma } from "../config/database";


// ==========================================
// CREATE INVITATION
// ==========================================

export const createInvitation = async (
  organizationId: string,
  bidPackageId: string,
  bidderId: string,
  email: string
) => {

  const bidPackage = await prisma.bidPackage.findUnique({
    where: {
      id: bidPackageId
    }
  });

  if (!bidPackage) {
    throw new Error("Bid package not found");
  }

  const bidder = await prisma.bidder.findUnique({
    where: {
      id: bidderId
    }
  });

  if (!bidder) {
    throw new Error("Bidder not found");
  }

  const token = crypto.randomUUID();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  return prisma.invitation.create({
    data: {
      organizationId,
      bidPackageId,
      bidderId,
      email,
      token,
      expiresAt
    }
  });
};


// ==========================================
// GET ORGANIZATION INVITATIONS
// ==========================================

export const getOrganizationInvitations = async (
  organizationId: string
) => {

  return prisma.invitation.findMany({
    where: {
      organizationId
    },

    include: {
      bidder: true,
      bidPackage: true
    },

    orderBy: {
      createdAt: "desc"
    }
  });
};


// ==========================================
// GET SINGLE INVITATION
// ==========================================

export const getInvitationById = async (
  organizationId: string,
  invitationId: string
) => {

  return prisma.invitation.findFirst({
    where: {
      id: invitationId,
      organizationId
    },

    include: {
      bidder: true,
      bidPackage: true
    }
  });
};


// ==========================================
// ACCEPT INVITATION
// ==========================================

export const acceptInvitation = async (
  organizationId: string,
  invitationId: string
) => {

  const invitation = await prisma.invitation.findFirst({
    where: {
      id: invitationId,
      organizationId
    }
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  if (invitation.status !== "PENDING") {
    throw new Error("Invitation is no longer pending");
  }

  if (invitation.expiresAt < new Date()) {

    await prisma.invitation.update({
      where: {
        id: invitation.id
      },

      data: {
        status: "EXPIRED"
      }
    });

    throw new Error("Invitation has expired");
  }

  return prisma.invitation.update({
    where: {
      id: invitation.id
    },

    data: {
      status: "ACCEPTED",
      acceptedAt: new Date()
    }
  });
};


// ==========================================
// DECLINE INVITATION
// ==========================================

export const declineInvitation = async (
  organizationId: string,
  invitationId: string
) => {

  const invitation = await prisma.invitation.findFirst({
    where: {
      id: invitationId,
      organizationId
    }
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  if (invitation.status !== "PENDING") {
    throw new Error("Invitation is no longer pending");
  }

  if (invitation.expiresAt < new Date()) {

    await prisma.invitation.update({
      where: {
        id: invitation.id
      },

      data: {
        status: "EXPIRED"
      }
    });

    throw new Error("Invitation has expired");
  }

  return prisma.invitation.update({
    where: {
      id: invitation.id
    },

    data: {
      status: "DECLINED",
      declinedAt: new Date()
    }
  });
};


// ==========================================
// CANCEL INVITATION
// ==========================================

export const cancelInvitation = async (
  organizationId: string,
  invitationId: string
) => {

  const invitation = await prisma.invitation.findFirst({
    where: {
      id: invitationId,
      organizationId
    }
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  if (invitation.status !== "PENDING") {
    throw new Error("Only pending invitations can be cancelled");
  }

  return prisma.invitation.update({
    where: {
      id: invitation.id
    },

    data: {
      status: "CANCELLED"
    }
  });
};