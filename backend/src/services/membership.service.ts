import { prisma } from "../config/database";


// ==========================================
// GET ORGANIZATION MEMBERS
// ==========================================
export const getOrganizationMembers = async (
  organizationId: string
) => {

  const members = await prisma.membership.findMany({
    where: {
      organizationId
    },

    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });

  return members;
};


// ==========================================
// ADD EXISTING USER TO ORGANIZATION
// ==========================================
export const addMember = async (
  organizationId: string,
  userId: string,
  role: string
) => {

  const existingMembership =
    await prisma.membership.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId
        }
      }
    });

  if (existingMembership) {
    throw new Error(
      "User is already a member of this organization"
    );
  }

  const membership =
    await prisma.membership.create({
      data: {
        userId,
        organizationId,
        role
      },

      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

  return membership;
};


// ==========================================
// CHANGE MEMBER ROLE
// ==========================================
export const updateMemberRole = async (
  membershipId: string,
  role: string
) => {

  const membership =
    await prisma.membership.update({
      where: {
        id: membershipId
      },

      data: {
        role
      }
    });

  return membership;
};


// ==========================================
// REMOVE MEMBER
// ==========================================
export const removeMember = async (
  membershipId: string
) => {

  await prisma.membership.delete({
    where: {
      id: membershipId
    }
  });

  return true;
};