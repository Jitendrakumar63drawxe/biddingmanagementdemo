import { prisma } from "../config/database";

export const createOrganization = async (
  userId: string,
  name: string
) => {

  const organization = await prisma.organization.create({
    data: {
      name,

      memberships: {
        create: {
          userId,
          role: "OWNER"
        }
      }
    },

    include: {
      memberships: true
    }
  });

  return organization;
};


export const getMyOrganizations = async (
  userId: string
) => {

  const memberships =
    await prisma.membership.findMany({

      where: {
        userId
      },

      include: {
        organization: true
      }
    });

  return memberships.map(
    (membership) => ({
      id: membership.organization.id,
      name: membership.organization.name,
      role: membership.role
    })
  );
};