import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  createBidder,
  getBidders,
  getBidderById,
  updateBidder,
  deleteBidder
} from "../services/bidder.service";


export const createBidderController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const {
      companyName,
      contactName,
      email,
      phone,
      address,
      website,
      notes
    } = req.body;

    if (!companyName || !email) {
      return res.status(400).json({
        success: false,
        message: "Company name and email are required"
      });
    }

    const bidder = await createBidder(
      organizationId,
      {
        companyName,
        contactName,
        email,
        phone,
        address,
        website,
        notes
      }
    );

    return res.status(201).json({
      success: true,
      message: "Bidder created successfully",
      bidder
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create bidder",
      error: error.message
    });
  }
};


export const getBidderList = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const bidders = await getBidders(
      organizationId
    );

    return res.status(200).json({
      success: true,
      bidders
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bidders",
      error: error.message
    });
  }
};


export const getBidder = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const bidderId =
      req.params.bidderId as string;

    const bidder = await getBidderById(
      bidderId
    );

    if (!bidder) {
      return res.status(404).json({
        success: false,
        message: "Bidder not found"
      });
    }

    return res.status(200).json({
      success: true,
      bidder
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bidder",
      error: error.message
    });
  }
};


export const updateBidderController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const bidderId =
      req.params.bidderId as string;

    const bidder = await updateBidder(
      bidderId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Bidder updated successfully",
      bidder
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update bidder",
      error: error.message
    });
  }
};


export const deleteBidderController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const bidderId =
      req.params.bidderId as string;

    await deleteBidder(bidderId);

    return res.status(200).json({
      success: true,
      message: "Bidder deleted successfully"
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete bidder"
    });
  }
};