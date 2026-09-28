import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { prisma } from "../config/database";
import { UserRole } from "../types/auth.types";

export const requireOrganizationMember = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId =
      req.params.organizationId as string;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    if (!organizationId) {
      return res.status(400).json({
        success: false,
        message: "Organization ID is required"
      });
    }

    const membership =
      await prisma.membership.findUnique({
        where: {
          userId_organizationId: {
            userId,
            organizationId
          }
        }
      });

    if (!membership) {
      return res.status(403).json({
        success: false,
        message:
          "You are not a member of this organization"
      });
    }

    req.organizationId = organizationId;

    req.userRole =
      membership.role as UserRole;

    next();

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Organization authorization failed"
    });
  }
};