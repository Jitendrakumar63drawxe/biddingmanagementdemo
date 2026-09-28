// import { Response, NextFunction } from "express";
// import { AuthRequest } from "./auth.middleware";
// import { UserRole } from "../types/auth.types";

// export const authorize = (
//   ...allowedRoles: UserRole[]
// ) => {

//   return (
//     req: AuthRequest,
//     res: Response,
//     next: NextFunction
//   ) => {

//     const role = req.userRole as UserRole | undefined;

//     if (!role) {
//       return res.status(403).json({
//         success: false,
//         message: "Role not found"
//       });
//     }

//     if (!allowedRoles.includes(role)) {
//       return res.status(403).json({
//         success: false,
//         message: "You do not have permission"
//       });
//     }

//     next();
//   };
// };

import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { prisma } from "../config/database";
import { UserRole } from "../types/auth.types";

export const authorize = (...allowedRoles: UserRole[]) => {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required"
        });
      }

      const organizationId =
        req.params.organizationId ||
        req.body.organizationId;

      if (!organizationId) {
        return res.status(400).json({
          success: false,
          message: "Organization ID is required"
        });
      }

      const membership = await prisma.membership.findUnique({
        where: {
          userId_organizationId: {
            userId: req.user.id,
            organizationId: organizationId as string
          }
        }
      });

      if (!membership) {
        return res.status(403).json({
          success: false,
          message: "User is not a member of this organization"
        });
      }

      const role = membership.role as UserRole;

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: "Insufficient permissions"
        });
      }

      next();

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "RBAC check failed"
      });
    }
  };
};