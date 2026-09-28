import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createBidPackage,
  getProjectBidPackages,
  getBidPackageById,
  updateBidPackage,
  deleteBidPackage
} from "../services/bidPackage.service";


// ================================
// CREATE BID PACKAGE
// ================================

export const createBidPackageController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const projectId = req.params.projectId as string;

    const {
      name,
      description,
      bidDeadline
    } = req.body;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required"
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Bid package name is required"
      });
    }

    const bidPackage = await createBidPackage(
      projectId,
      {
        name,
        description,
        bidDeadline: bidDeadline
          ? new Date(bidDeadline)
          : undefined
      }
    );

    return res.status(201).json({
      success: true,
      message: "Bid package created successfully",
      bidPackage
    });

  } catch (error: any) {
    console.error("CREATE BID PACKAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create bid package",
      error: error.message
    });
  }
};


// ================================
// GET ALL BID PACKAGES OF PROJECT
// ================================

export const getBidPackages = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const projectId = req.params.projectId as string;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required"
      });
    }

    const bidPackages =
      await getProjectBidPackages(projectId);

    return res.status(200).json({
      success: true,
      bidPackages
    });

  } catch (error: any) {
    console.error("GET BID PACKAGES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bid packages",
      error: error.message
    });
  }
};


// ================================
// GET SINGLE BID PACKAGE
// ================================

export const getBidPackage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const bidPackageId =
      req.params.bidPackageId as string;

    if (!bidPackageId) {
      return res.status(400).json({
        success: false,
        message: "Bid package ID is required"
      });
    }

    const bidPackage =
      await getBidPackageById(bidPackageId);

    if (!bidPackage) {
      return res.status(404).json({
        success: false,
        message: "Bid package not found"
      });
    }

    return res.status(200).json({
      success: true,
      bidPackage
    });

  } catch (error: any) {
    console.error("GET BID PACKAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bid package",
      error: error.message
    });
  }
};


// ================================
// UPDATE BID PACKAGE
// ================================

export const updateBidPackageController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const bidPackageId =
      req.params.bidPackageId as string;

    if (!bidPackageId) {
      return res.status(400).json({
        success: false,
        message: "Bid package ID is required"
      });
    }

    const bidPackage =
      await updateBidPackage(
        bidPackageId,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Bid package updated successfully",
      bidPackage
    });

  } catch (error: any) {
    console.error("UPDATE BID PACKAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update bid package",
      error: error.message
    });
  }
};


// ================================
// DELETE BID PACKAGE
// ================================

export const deleteBidPackageController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const bidPackageId =
      req.params.bidPackageId as string;

    if (!bidPackageId) {
      return res.status(400).json({
        success: false,
        message: "Bid package ID is required"
      });
    }

    await deleteBidPackage(bidPackageId);

    return res.status(200).json({
      success: true,
      message: "Bid package deleted successfully"
    });

  } catch (error: any) {
    console.error("DELETE BID PACKAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete bid package",
      error: error.message
    });
  }
};