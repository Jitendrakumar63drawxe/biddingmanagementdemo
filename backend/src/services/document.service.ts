import { prisma } from "../config/database";

// ==========================================
// CREATE DOCUMENT
// ==========================================

export const createDocument = async (
  organizationId: string,
  projectId: string,
  data: {
    name: string;
    originalName: string;
    fileUrl: string;
    fileType?: string;
    fileSize?: number;
    category?: string;
  }
) => {
  return prisma.document.create({
    data: {
      organizationId,
      projectId,
      name: data.name,
      originalName: data.originalName,
      fileUrl: data.fileUrl,
      fileType: data.fileType,
      fileSize: data.fileSize,
      category: data.category as any,
    },
  });
};

// ==========================================
// GET PROJECT DOCUMENTS
// ==========================================

export const getProjectDocuments = async (
  organizationId: string,
  projectId: string
) => {
  return prisma.document.findMany({
    where: {
      organizationId,
      projectId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ==========================================
// GET SINGLE DOCUMENT
// ==========================================

export const getDocumentById = async (
  organizationId: string,
  documentId: string
) => {
  return prisma.document.findFirst({
    where: {
      id: documentId,
      organizationId,
    },
  });
};

// ==========================================
// UPDATE DOCUMENT
// ==========================================

export const updateDocument = async (
  organizationId: string,
  documentId: string,
  data: {
    name?: string;
    category?: string;
  }
) => {
  return prisma.document.updateMany({
    where: {
      id: documentId,
      organizationId,
    },
    data: {
      name: data.name,
      category: data.category as any,
    },
  });
};

// ==========================================
// DELETE DOCUMENT
// ==========================================

export const deleteDocument = async (
  organizationId: string,
  documentId: string
) => {
  return prisma.document.deleteMany({
    where: {
      id: documentId,
      organizationId,
    },
  });
};