import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createDocument,
  getProjectDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../services/document.service";

// ==========================================
// CREATE DOCUMENT
// ==========================================

export const createDocumentController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const projectId =
      req.params.projectId as string;

    const {
      name,
      originalName,
      fileUrl,
      fileType,
      fileSize,
      category,
    } = req.body;

    if (!name || !originalName || !fileUrl) {
      return res.status(400).json({
        success: false,
        message: "name, originalName and fileUrl are required",
      });
    }

    const document = await createDocument(
      organizationId,
      projectId,
      {
        name,
        originalName,
        fileUrl,
        fileType,
        fileSize,
        category,
      }
    );

    return res.status(201).json({
      success: true,
      message: "Document created successfully",
      document,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create document",
      error: error.message,
    });
  }
};

// ==========================================
// GET PROJECT DOCUMENTS
// ==========================================

export const getProjectDocumentsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const projectId =
      req.params.projectId as string;

    const documents = await getProjectDocuments(
      organizationId,
      projectId
    );

    return res.status(200).json({
      success: true,
      documents,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch documents",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE DOCUMENT
// ==========================================

export const getDocumentController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const documentId =
      req.params.documentId as string;

    const document = await getDocumentById(
      organizationId,
      documentId
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      document,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch document",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE DOCUMENT
// ==========================================

export const updateDocumentController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const documentId =
      req.params.documentId as string;

    const result = await updateDocument(
      organizationId,
      documentId,
      req.body
    );

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document updated successfully",
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update document",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE DOCUMENT
// ==========================================

export const deleteDocumentController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const documentId =
      req.params.documentId as string;

    const result = await deleteDocument(
      organizationId,
      documentId
    );

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete document",
      error: error.message,
    });
  }
};