import { prisma } from "../config/database";

export const createProject = async (
  organizationId: string,
  data: {
    name: string;
    description?: string;
    location?: string;
    startDate?: Date;
    bidDeadline?: Date;
  }
) => {
  return prisma.project.create({
    data: {
      organizationId,
      name: data.name,
      description: data.description,
      location: data.location,
      startDate: data.startDate,
      bidDeadline: data.bidDeadline
    }
  });
};

export const getOrganizationProjects = async (
  organizationId: string
) => {
  return prisma.project.findMany({
    where: {
      organizationId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getProjectById = async (
  projectId: string
) => {
  return prisma.project.findUnique({
    where: {
      id: projectId
    }
  });
};

export const updateProject = async (
  projectId: string,
  data: {
    name?: string;
    description?: string;
    location?: string;
    status?: string;
    startDate?: Date;
    bidDeadline?: Date;
  }
) => {
  return prisma.project.update({
    where: {
      id: projectId
    },
    data: {
      name: data.name,
      description: data.description,
      location: data.location,
      status: data.status as any,
      startDate: data.startDate,
      bidDeadline: data.bidDeadline
    }
  });
};

export const deleteProject = async (
  projectId: string
) => {
  return prisma.project.delete({
    where: {
      id: projectId
    }
  });
};