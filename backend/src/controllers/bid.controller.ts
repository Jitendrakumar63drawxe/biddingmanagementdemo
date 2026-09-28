import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createBid,
  getBidPackageBids,
  getBidById,
  submitBid,
  updateBid,
  deleteBid,
  getBidComparison,
  awardBid,
} from "../services/bid.service";

// ==========================================
// CREATE BID
// ==========================================

export const createBidController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId = req.params.organizationId as string;
    const bidPackageId = req.params.bidPackageId as string;

    const {
      bidderId,
      amount,
      notes,
    } = req.body;

    if (!bidderId) {
      return res.status(400).json({
        success: false,
        message: "bidderId is required",
      });
    }

    const bid = await createBid(
      organizationId,
      bidPackageId,
      bidderId,
      {
        amount,
        notes,
      }
    );

    return res.status(201).json({
      success: true,
      message: "Bid created successfully",
      bid,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET BIDS OF BID PACKAGE
// ==========================================

export const getBidPackageBidsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId = req.params.organizationId as string;
    const bidPackageId = req.params.bidPackageId as string;

    const bids = await getBidPackageBids(
      organizationId,
      bidPackageId
    );

    return res.status(200).json({
      success: true,
      bids,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bids",
      error: error.message,
    });
  }
};

// ==========================================
// BID COMPARISON
// ==========================================

export const getBidComparisonController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const bidPackageId =
      req.params.bidPackageId as string;

    const bids = await getBidComparison(
      organizationId,
      bidPackageId
    );

    return res.status(200).json({
      success: true,
      message: "Bid comparison fetched successfully",
      bidPackageId,
      bids,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bid comparison",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE BID
// ==========================================

export const getBidController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const bidId =
      req.params.bidId as string;

    const bid = await getBidById(
      organizationId,
      bidId
    );

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: "Bid not found",
      });
    }

    return res.status(200).json({
      success: true,
      bid,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bid",
      error: error.message,
    });
  }
};

// ==========================================
// SUBMIT BID
// ==========================================

export const submitBidController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const bidId =
      req.params.bidId as string;

    const bid = await submitBid(
      organizationId,
      bidId
    );

    return res.status(200).json({
      success: true,
      message: "Bid submitted successfully",
      bid,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE BID
// ==========================================

export const updateBidController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const bidId =
      req.params.bidId as string;

    const {
      amount,
      notes,
    } = req.body;

    const bid = await updateBid(
      organizationId,
      bidId,
      {
        amount,
        notes,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Bid updated successfully",
      bid,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE BID
// ==========================================

export const deleteBidController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const bidId =
      req.params.bidId as string;

    await deleteBid(
      organizationId,
      bidId
    );

    return res.status(200).json({
      success: true,
      message: "Bid deleted successfully",
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================================
// AWARD BID
// ==========================================

export const awardBidController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const bidId =
      req.params.bidId as string;

    const result = await awardBid(
      organizationId,
      bidId
    );

    return res.status(200).json({
      success: true,
      message: "Bid awarded successfully",
      awardedBid: result.awardedBid,
      bidPackage: result.bidPackage,
    });

  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};